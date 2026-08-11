<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$message = trim($input['message'] ?? '');
$subject = trim($input['subject'] ?? 'General Inquiry');
$formType = trim($input['form_type'] ?? 'contact');
$pageUrl = trim($input['page_url'] ?? '');

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

if (mb_strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Message is too long. Maximum 5000 characters.']);
    exit;
}

$recipientMap = [
    'contact'   => 'info@toolly.site',
    'general'   => 'info@toolly.site',
    'feedback'  => 'info@toolly.site',
    'recommend' => 'tool@toolly.site',
    'tool'      => 'tool@toolly.site',
];

$recipient = $recipientMap[$formType] ?? 'info@toolly.site';

$brandName = 'Textly';
$websiteUrl = 'https://text.toolly.site';

$formTypeLabels = [
    'contact'   => 'Contact Form',
    'general'   => 'General Contact Form',
    'feedback'  => 'Feedback Form',
    'recommend' => 'Tool Recommendation Form',
    'tool'      => 'Tool Suggestion Form',
];

$formTypeLabel = $formTypeLabels[$formType] ?? 'Contact Form';

if (empty($pageUrl)) {
    $pageUrl = $_SERVER['HTTP_REFERER'] ?? '';
}

$emailSubject = '[' . $brandName . '] ' . $subject . ' (' . $formTypeLabel . ')';

$emailBody = "=== New message from " . $brandName . " website ===\n\n";
$emailBody .= "Website: " . $brandName . " (" . $websiteUrl . ")\n";
$emailBody .= "Form Type: " . $formTypeLabel . "\n";
$emailBody .= "Page URL: " . ($pageUrl ?: 'N/A') . "\n";
$emailBody .= "Date: " . date('Y-m-d H:i:s') . "\n\n";
$emailBody .= "--- Sender Details ---\n";
$emailBody .= "Name: " . $name . "\n";
$emailBody .= "Email: " . $email . "\n";
if (!empty($subject) && $subject !== 'General Inquiry') {
    $emailBody .= "Subject: " . $subject . "\n";
}

$toolName = trim($input['tool_name'] ?? $input['tool-name'] ?? '');
if (!empty($toolName)) {
    $emailBody .= "Tool Name: " . $toolName . "\n";
}

$emailBody .= "\n--- Message ---\n" . $message . "\n\n";
$emailBody .= "--- End of message ---\n";

$headers = [
    'From: Textly Website <no-reply@toolly.site>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail($recipient, $emailSubject, $emailBody, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully. We\'ll get back to you soon!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Sorry, something went wrong. Please try again or email us directly.']);
}
