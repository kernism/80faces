<?php

use google\appengine\api\cloud_storage\CloudStorageTools;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

$app = new Application();
$app->register(new JDesrosiers\Silex\Provider\CorsServiceProvider(), array(
    "cors.allowOrigin" => "*",
));
$app->after($app["cors"]);

$app->get('/', function () use ($app) {
    $my_bucket = $app['bucket_name'];
    $id = $_GET['id'];

    if (!$id) {
        $app->abort(404, "Id is missing");
    }
    $path = "gs://${my_bucket}/${id}";
    if (!file_exists($path)) {
        $app->abort(404, "$path does not exist.");
    }
    $image_file = "gs://${my_bucket}/${id}";
    if ($_GET['delete']) {
        CloudStorageTools::deleteImageServingUrl($image_file);
    }
    $image_url = CloudStorageTools::getImageServingUrl($image_file, ['secure_url' => true]);
    return $app->redirect($image_url);
});

return $app;
