<?php
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/app.php';
$app['bucket_name'] = 'faces-97af0.appspot.com';
$app['debug'] = true;
$app->run();
