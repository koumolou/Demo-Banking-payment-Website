<?php
// Test Laravel bootstrap without full request handling
define('LARAVEL_START', microtime(true));
require __DIR__.'/../vendor/autoload.php';

try {
    $app = require_once __DIR__.'/../bootstrap/app.php';
    echo "Bootstrap OK";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}