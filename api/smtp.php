<?php
/**
 * Minimal SSL SMTP client for contact form delivery.
 */
function smtp_send(array $config, array $mail): void
{
    $host = $config['host'];
    $port = (int) $config['port'];
    $user = $config['auth']['user'];
    $pass = $config['auth']['pass'];
    $timeout = 30;

    $socket = @stream_socket_client(
        "ssl://{$host}:{$port}",
        $errno,
        $errstr,
        $timeout,
        STREAM_CLIENT_CONNECT
    );

    if (!$socket) {
        throw new RuntimeException("SMTP connect failed: {$errstr} ({$errno})");
    }

    stream_set_timeout($socket, $timeout);

    $read = function () use ($socket): string {
        $data = '';
        while (($line = fgets($socket, 515)) !== false) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        return $data;
    };

    $expect = function (string $response, string $code, string $step) {
        if (strpos($response, $code) !== 0) {
            throw new RuntimeException("SMTP {$step} failed: " . trim($response));
        }
    };

    $write = function (string $command) use ($socket) {
        fwrite($socket, $command . "\r\n");
    };

    $expect($read(), '220', 'banner');

    $write('EHLO internetcablentv.com');
    $expect($read(), '250', 'EHLO');

    $write('AUTH LOGIN');
    $expect($read(), '334', 'AUTH');
    $write(base64_encode($user));
    $expect($read(), '334', 'AUTH USER');
    $write(base64_encode($pass));
    $expect($read(), '235', 'AUTH PASS');

    $fromEmail = $mail['from_email'];
    $toEmail = $mail['to'];

    $write('MAIL FROM:<' . $fromEmail . '>');
    $expect($read(), '250', 'MAIL FROM');

    $write('RCPT TO:<' . $toEmail . '>');
    $expect($read(), '250', 'RCPT TO');

    $write('DATA');
    $expect($read(), '354', 'DATA');

    $headers = [
        'Date: ' . date('r'),
        'From: ' . $mail['from'],
        'To: ' . $toEmail,
        'Reply-To: ' . $mail['reply_to'],
        'Subject: ' . $mail['subject'],
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];

    $body = implode("\r\n", $headers) . "\r\n\r\n" . $mail['html'];
    // Dot-stuff lines that begin with "."
    $body = preg_replace('/^\./m', '..', $body);
    $write($body);
    $write('.');
    $expect($read(), '250', 'message body');

    $write('QUIT');
    fclose($socket);
}
