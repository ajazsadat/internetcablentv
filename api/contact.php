<?php
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed.']);
    exit;
}

require_once __DIR__ . '/smtp.php';
$config = require __DIR__ . '/config.php';

function json_error(string $message, int $status = 400): void
{
    http_response_code($status);
    echo json_encode(['ok' => false, 'error' => $message]);
    exit;
}

function field(array $data, string $key): string
{
    $value = $data[$key] ?? '';
    return is_string($value) ? trim($value) : '';
}

function as_packages($value): array
{
    if (is_array($value)) {
        return array_values(array_filter(array_map(static function ($item) {
            return is_string($item) ? trim($item) : '';
        }, $value)));
    }
    if (is_string($value) && trim($value) !== '') {
        return [trim($value)];
    }
    return [];
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$raw = file_get_contents('php://input');
$data = [];

$contentType = $_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') !== false) {
    $decoded = json_decode($raw ?: '', true);
    if (!is_array($decoded)) {
        json_error('Invalid JSON payload.');
    }
    $data = $decoded;
} else {
    $data = $_POST;
}

$name = field($data, 'name');
$email = field($data, 'email');
$phone = field($data, 'phone');
$address = field($data, 'address');
if ($address === '') {
    $address = field($data, 'zip');
}
$provider = field($data, 'provider') ?: 'Not provided';
$usage = field($data, 'usage') ?: 'Not provided';
$packages = as_packages($data['packages'] ?? []);
if (!$packages) {
    $service = field($data, 'service');
    if ($service !== '') {
        $packages = [$service];
    }
}
$message = field($data, 'message');
$source = field($data, 'source') ?: 'website';
$consentRaw = $data['consent'] ?? false;
$consent = $consentRaw === true || $consentRaw === 'true' || $consentRaw === 'on' || $consentRaw === '1' || $consentRaw === 1;

if ($name === '' || $email === '' || $phone === '' || $address === '' || !$consent) {
    json_error('Please complete all required fields and accept the consent checkbox.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_error('Please enter a valid email address.');
}

$packageList = $packages ? implode(', ', $packages) : 'Not specified';
$submittedAt = (new DateTime('now', new DateTimeZone('America/Chicago')))->format('M j, Y g:i A T');
$subject = "New quote request — {$name}";

$text = implode("\n", [
    "New quote request from {$config['brand']}",
    '',
    "Name: {$name}",
    "Phone: {$phone}",
    "Email: {$email}",
    "Address / ZIP: {$address}",
    "Current Provider: {$provider}",
    "Devices in Home: {$usage}",
    "Packages: {$packageList}",
    'Consent: Yes',
    "Submitted: {$submittedAt} (CT)",
    '',
    "Source: {$source}",
    $message !== '' ? ("Message:\n" . $message) : '',
]);

$html = '<h2>New quote request from ' . escape_html($config['brand']) . '</h2>'
    . '<table cellpadding="8" cellspacing="0" border="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">'
    . '<tr><td><strong>Name</strong></td><td>' . escape_html($name) . '</td></tr>'
    . '<tr><td><strong>Phone</strong></td><td>' . escape_html($phone) . '</td></tr>'
    . '<tr><td><strong>Email</strong></td><td>' . escape_html($email) . '</td></tr>'
    . '<tr><td><strong>Address / ZIP</strong></td><td>' . escape_html($address) . '</td></tr>'
    . '<tr><td><strong>Current Provider</strong></td><td>' . escape_html($provider) . '</td></tr>'
    . '<tr><td><strong>Devices in Home</strong></td><td>' . escape_html($usage) . '</td></tr>'
    . '<tr><td><strong>Packages</strong></td><td>' . escape_html($packageList) . '</td></tr>'
    . '<tr><td><strong>Consent</strong></td><td>Yes</td></tr>'
    . '<tr><td><strong>Submitted</strong></td><td>' . escape_html($submittedAt) . ' (CT)</td></tr>'
    . '<tr><td><strong>Source</strong></td><td>' . escape_html($source) . '</td></tr>'
    . '</table>';

if ($message !== '') {
    $html .= '<p><strong>Message</strong></p><p>' . nl2br(escape_html($message)) . '</p>';
}

try {
    smtp_send($config, [
        'from' => $config['from'],
        'from_email' => $config['from_email'],
        'to' => $config['to'],
        'reply_to' => $email,
        'subject' => '=?UTF-8?B?' . base64_encode($subject) . '?=',
        'html' => $html,
    ]);

    echo json_encode(['ok' => true]);
} catch (Throwable $e) {
    error_log('Contact form email failed: ' . $e->getMessage());
    json_error('Unable to send your request right now. Please call us or try again.', 500);
}
