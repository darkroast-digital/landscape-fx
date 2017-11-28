<?php

session_start();

use Respect\Validation\Validator as v;

require_once __DIR__ . '/../vendor/autoload.php';

use Zeuxisoo\Whoops\Provider\Slim\WhoopsMiddleware;
use Illuminate\Pagination\Paginator;
use Carbon\Carbon;




// #GET ENV
// =========================================================================

try {
    (new Dotenv\Dotenv(__DIR__ . '/../'))->load();
} catch (Dotenv\Exception\InvalidPathException $e) {
    //
}



// #BOOT APP
// =========================================================================

$app = new Slim\App([
    'settings' => [
        'debug' => getenv('WHOOPS_DEBUG') === 'true',
        'whoops.editor' => 'sublime',
        'displayErrorDetails' => getenv('APP_DEBUG') === 'true',

        'app' => [
            'name' => getenv('APP_NAME')
        ],

        'url' => getenv('ROOT_URL'),

        'views' => [
            'cache' => getenv('VIEW_CACHE_DISABLED') === 'true' ? false : __DIR__ . '/../storage/views'
        ],

        'database' => [
            'driver' => getenv('DB_DRIVER'),
            'host' => getenv('DB_HOST'),
            'port' => getenv('DB_PORT'),
            'database' => getenv('DB_DATABASE'),
            'username' => getenv('DB_USERNAME'),
            'password' => getenv('DB_PASSWORD'),
        ],
        
        'mail' => [
            'from' => [
                'name' => getenv('MAIL_FROM_NAME'),
                'address' => getenv('MAIL_FROM_ADDRESS'),
            ]
        ],
    ],
]);



// #REMOVE TRAILING SLASHES
// =========================================================================


$app->add(function (Request $request, Response $response, callable $next) {
    $uri = $request->getUri();
    $path = $uri->getPath();
    if ($path != '/' && substr($path, -1) == '/') {
        // permanently redirect paths with a trailing slash
        // to their non-trailing counterpart
        $uri = $uri->withPath(substr($path, 0, -1));
        
        if($request->getMethod() == 'GET') {
            return $response->withRedirect((string)$uri, 301);
        }
        else {
            return $next($request->withUri($uri), $response);
        }
    }

    return $next($request, $response);
});



// #ERROR REPORTING
// =========================================================================

$app->add(new WhoopsMiddleware($app));




// #CONTAINER
// =========================================================================

require_once __DIR__ . '/container.php';



// #WEB ROUTES
// =========================================================================

require_once __DIR__ . '/../routes/web.php';
