<?php

spl_autoload_register(
    function ($className) {
        $classFile =
            dirname(__DIR__, 2) .
            DIRECTORY_SEPARATOR .
            str_replace('\\', DIRECTORY_SEPARATOR, $className) .
            '.php';

        require_once $classFile;
    }
);
