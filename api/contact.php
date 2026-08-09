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
$zip = field($data, 'zip');
$service = field($data, 'service');
$message = field($data, 'message');
$source = field($data, 'source') ?: 'website';
$consentRaw = $data['consent'] ?? false;
$consent = $consentRaw === true || $consentRaw === 'true' || $consentRaw === 'on' || $consentRaw === '1' || $consentRaw === 1;

if ($name === '' || $email === '' || $phone === '' || $zip === '' || !$consent) {
    json_error('Please complete all required fields and accept the consent checkbox.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_error('Please enter a valid email address.');
}

if ($service === '') {
    $service = 'General inquiry';
}

$submittedAt = (new DateTime('now', new DateTimeZone('America/Chicago')))->format('M j, Y g:i A T');
$subjectService = $service !== '' ? $service : 'Inquiry';
$subject = "New lead from {$config['brand']}: {$subjectService} — {$name}";

$textLines = [
    "New contact form submission from {$config['domain']}",
    '',
    "Source: {$source}",
    "Name: {$name}",
    "Email: {$email}",
    "Phone: {$phone}",
    "ZIP: {$zip}",
    "Service interest: {$service}",
    'Consent: Yes',
    "Submitted: {$submittedAt}",
    '',
    'Message:',
    $message !== '' ? $message : '(none)',
];
$text = implode("\n", $textLines);

$html = '<h2>New contact form submission</h2>'
    . '<p><strong>Site:</strong> ' . escape_html($config['domain']) . '</p>'
    . '<table cellpadding="6" style="border-collapse:collapse">'
    . '<tr><td><strong>Source</strong></td><td>' . escape_html($source) . '</td></tr>'
    . '<tr><td><strong>Name</strong></td><td>' . escape_html($name) . '</td></tr>'
    . '<tr><td><strong>Email</strong></td><td>' . escape_html($email) . '</td></tr>'
    . '<tr><td><strong>Phone</strong></td><td>' . escape_html($phone) . '</td></tr>'
    . '<tr><td><strong>ZIP</strong></td><td>' . escape_html($zip) . '</td></tr>'
    . '<tr><td><strong>Service interest</strong></td><td>' . escape_html($service) . '</td></tr>'
    . '<tr><td><strong>Consent</strong></td><td>Yes</td></tr>'
    . '<tr><td><strong>Submitted</strong></td><td>' . escape_html($submittedAt) . '</td></tr>'
    . '</table>'
    . '<p><strong>Message</strong></p>'
    . '<p>' . nl2br(escape_html($message !== '' ? $message : '(none)')) . '</p>'
    . '<!-- text fallback: ' . escape_html($text) . ' -->';

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
    json_error('Unable to send your message right now. Please call us instead.', 500);
}
