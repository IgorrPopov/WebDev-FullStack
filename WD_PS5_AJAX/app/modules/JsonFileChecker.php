<?php
namespace app\modules;

class JsonFileChecker
{
    public static function validateDatabase($pathToFile)
    {
        $validator = new self();

        if (!$validator->validateJsonFileFolder($pathToFile)) {
            throw new \Exception(
                'An error occurred "Cannot create database folder!"'
            );
        }

        if (!$validator->validateJsonFile($pathToFile)) {
            throw new \Exception(
                'An error occurred "Database is corrupted!"'
            );
        }
    }

    private function validateJsonFileFolder($pathToFile)
    {
        if (!file_exists(dirname($pathToFile))) {
            return mkdir(dirname($pathToFile), 0700);
        }

        return true;
    }

    private function validateJsonFile($pathToFile)
    {
        if (!is_file($pathToFile) || !is_readable($pathToFile)
            || !is_writable($pathToFile)) {
            return $this->createJsonFile($pathToFile);
        }

        return true;
    }

    private function createJsonFile($pathToFile)
    {
        if (!$file = fopen($pathToFile, 'w')) {
            return false;
        }
        // empty json to prevent reading syntax error
        return (fwrite($file, '{}')) ? true : false;
    }
}
