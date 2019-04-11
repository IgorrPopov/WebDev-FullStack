<?php

spl_autoload_register(
    function ($className) {
        $classFile =
            dirname(__DIR__, 2) .
            DIRECTORY_SEPARATOR .
            str_replace('\\', DIRECTORY_SEPARATOR, $className) .
            '.php';

        if (isset($classFile) && file_exists($classFile)) {
            require_once $classFile;
        }
    }
);
