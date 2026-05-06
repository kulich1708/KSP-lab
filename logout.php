<?php

declare(strict_types=1);

require_once __DIR__ . '/auth.php';

$login = (string)($_SESSION['user_login'] ?? 'unknown');
write_auth_log($login, 'LOGOUT');

$_SESSION = [];

session_destroy();
header('Location: login.php');
exit;
