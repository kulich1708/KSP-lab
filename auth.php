<?php

declare(strict_types=1);

session_start();

const DATA_DIR = __DIR__ . '/data';
const USERS_FILE = DATA_DIR . '/users.json';
const LOGS_DIR = __DIR__ . '/logs';
const AUTH_LOG_FILE = LOGS_DIR . '/auth.log';

function ensure_storage(): void
{
    if (!is_dir(DATA_DIR)) {
        mkdir(DATA_DIR, 0777, true);
    }

    if (!is_dir(LOGS_DIR)) {
        mkdir(LOGS_DIR, 0777, true);
    }

    if (!file_exists(USERS_FILE)) {
        $defaultUsers = [
            [
                'id' => 1,
                'login' => 'admin',
                'password_hash' => password_hash('admin123', PASSWORD_DEFAULT),
            ],
            [
                'id' => 2,
                'login' => 'user',
                'password_hash' => password_hash('user123', PASSWORD_DEFAULT),
            ],
        ];

        file_put_contents(
            USERS_FILE,
            json_encode($defaultUsers, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );
    }
}

function get_users(): array
{
    ensure_storage();

    $raw = file_get_contents(USERS_FILE);
    if ($raw === false || $raw === '') {
        return [];
    }

    $users = json_decode($raw, true);
    return is_array($users) ? $users : [];
}

function find_user_by_login(string $login): ?array
{
    foreach (get_users() as $user) {
        if (($user['login'] ?? '') === $login) {
            return $user;
        }
    }

    return null;
}

function write_auth_log(string $login, string $action, string $extra = ''): void
{
    ensure_storage();

    $time = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $line = $time
        . ' | ip=' . $ip
        . ' | login=' . $login
        . ' | action=' . $action;

    if ($extra !== '') {
        $line .= ' | info=' . $extra;
    }

    $line .= PHP_EOL;
    file_put_contents(AUTH_LOG_FILE, $line, FILE_APPEND);
}

