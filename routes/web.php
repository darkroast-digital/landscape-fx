<?php

/*
|--------------------------------------------------------------------------
| #WEB ROUTES
|--------------------------------------------------------------------------
*/



use App\Controllers\SearchController;
use App\Controllers\SiteController;



// #SITE
// =========================================================================

$app->get('/', SiteController::class . ':home')->setName('home');
$app->get('/about-us/', SiteController::class . ':about')->setName('about');
$app->get('/portfolio/', SiteController::class . ':portfolio')->setName('portfolio');
$app->get('/careers/', SiteController::class . ':careers')->setName('careers');
$app->post('/careers/', SiteController::class . ':careersPost');
$app->get('/contact/', SiteController::class . ':contact')->setName('contact');
$app->post('/contact/', SiteController::class . ':contactPost');
$app->get('/search/', SearchController::class . ':index')->setName('search');
