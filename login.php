<?php

declare(strict_types=1);

require_once __DIR__ . '/auth.php';

if (isset($_SESSION['user_id'])) {
    header('Location: cabinet.php');
    exit;
}

$error = '';
$loginValue = '';

if (($_GET['error'] ?? '') === 'auth_required') {
    $error = 'Сначала выполните вход.';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $loginValue = trim((string)($_POST['login'] ?? ''));
    $password = trim((string)($_POST['password'] ?? ''));

    if ($loginValue === '' || $password === '') {
        $error = 'Заполните логин и пароль.';
    } else {
        $user = find_user_by_login($loginValue);

        if ($user === null) {
            $error = 'Пользователь не найден.';
            write_auth_log($loginValue, 'FAIL_LOGIN', 'user_not_found');
        } elseif (!password_verify($password, (string)$user['password_hash'])) {
            $error = 'Неверный пароль.';
            write_auth_log($loginValue, 'FAIL_LOGIN', 'wrong_password');
        } else {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_login'] = $user['login'];

            write_auth_log($loginValue, 'SUCCESS_LOGIN');
            header('Location: cabinet.php');
            exit;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Авторизация</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <header class="header">
        <div class="header__container">
            <nav class="header__menu menu">
                <ul class="menu__list">
                    <li class="menu__item"><a href="index.html" class="menu__link">Главная</a></li>
                    <li class="menu__item"><a href="catalog.html" class="menu__link">Каталог</a></li>
                    <li class="menu__item"><a href="cart.html" class="menu__link">Корзина</a></li>
                    <li class="menu__item"><a href="cabinet.php" class="menu__link">Кабинет</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <hr />
    <main class="main page">
        <div class="main__container">
            <h1 class="main__title title">Авторизация</h1>

            <form method="post" class="auth-form">
                <label class="auth-form__label" for="login">Логин</label>
                <input class="auth-form__input" type="text" id="login" name="login"
                    value="<?= htmlspecialchars($loginValue, ENT_QUOTES, 'UTF-8') ?>" required>

                <label class="auth-form__label" for="password">Пароль</label>
                <input class="auth-form__input" type="password" id="password" name="password" required>

                <button class="auth-form__button" type="submit">Войти</button>
            </form>

            <?php if ($error !== ''): ?>
                <p class="auth-message auth-message--error"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></p>
            <?php endif; ?>

            <p class="auth-hint">Тестовые данные: admin / admin123 или user / user123</p>
        </div>
    </main>
    <hr />
    <footer class="footer">
        <div class="footer__container">
            <div class="footer__copy copy-footer">
                <img src="img/copyright.png" alt="копирайт" class="copy-footer__img" width="20px">
                <p class="copy-footer__text">Все права защищены</p>
            </div>
        </div>
    </footer>
</body>

</html>
