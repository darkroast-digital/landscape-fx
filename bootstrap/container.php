<?php

/*
|--------------------------------------------------------------------------
| #CONTAINER
|--------------------------------------------------------------------------
*/



use Firebase\JWT\JWT;




// #BOOT CONTAINER
// =========================================================================

$container = $app->getContainer();



// #URL
// =========================================================================

$container['url'] = function ($container) {
    return $container->settings['url'];
};



// #VIEWS
// =========================================================================

$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig(__DIR__ . '/../resources/views', [
        'cache' => $container->settings['views']['cache']
    ]);

    $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');

    $view->addExtension(new Slim\Views\TwigExtension($container['router'], $basePath));

    // $view->getEnvironment()->addGlobal('flash', $container['flash']);

    return $view;
};

$twig = $container->view->getEnvironment();



// #MAIL
// =========================================================================

$container['mail'] = function ($container) {
    $config = $container->settings['mail'];

    $mail = new PHPMailer;

    return (new App\Mail\Mailer\Mailer($mail, $container->view))->alwaysFrom($config['from']['address'], $config['from']['name']);
};



// #VALIDATION
// =========================================================================

$container['validator'] = function ($container) {
    return new App\Validation\Validator;
};

$app->add(new \App\Middleware\ValidationErrorsMiddleware($container));



// #FLASH
// =========================================================================

$container['flash'] = function ($container) {
    return new \Slim\Flash\Messages;
};
