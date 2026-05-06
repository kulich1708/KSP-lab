<?php

declare(strict_types=1);

require_once __DIR__ . '/auth.php';

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php?error=auth_required');
    exit;
}

$login = (string)($_SESSION['user_login'] ?? 'user');
?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Личный кабинет</title>
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
            <h1 class="main__title title">Личный кабинет</h1>
            <div class="auth-box">
                <p class="auth-box__text">Вы вошли как: <strong><?= htmlspecialchars($login, ENT_QUOTES, 'UTF-8') ?></strong></p>
                <p class="auth-box__text">Доступ к этой странице есть только у авторизованных пользователей.</p>
                <a class="auth-form__button auth-form__button--inline" href="logout.php">Выйти</a>
            </div>
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
