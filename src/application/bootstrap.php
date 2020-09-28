<?php
namespace Application;

use Application\Core\Route;

session_start();

require_once $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';

Route::start();
