<?php
namespace app\modules;

class JsonFileReader
{
    public function getJsonDatabase($pathToFile)
    {
        $jsonString = file_get_contents($pathToFile);
        // we can get zero as a string if json is valid but empty
        if (!$jsonString && is_bool($jsonString)) {
            throw new \Exception(
                'An error occurred "Cannot read database file!"'
            );
        }

        $database = json_decode($jsonString, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception(
                'An error occurred "Cannot correctly read json database file!"'
            );
        }

        return $database;
    }
}
