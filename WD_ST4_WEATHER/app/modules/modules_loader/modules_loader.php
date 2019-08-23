<?php

spl_autoload_register(
    function ($className) {
        $classFile =
            dirname(__DIR__) .
            DIRECTORY_SEPARATOR .
            (strpos($className, 'DataGetters') ? 'data_getters' : 'data_adapters') .
            str_replace('\\', DIRECTORY_SEPARATOR, strrchr($className, '\\')) .
            '.php';

        require_once $classFile;
    }
);
