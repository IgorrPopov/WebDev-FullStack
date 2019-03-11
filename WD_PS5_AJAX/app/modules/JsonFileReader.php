<?php
namespace app\modules;

class JsonFileReader
{
    public static function getJsonDatabase($pathToFile)
    {
        $database = json_decode(file_get_contents($pathToFile), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception(
                'An error occurred "Cannot read json database file!"'
            );
        }

        return $database;
    }
}
