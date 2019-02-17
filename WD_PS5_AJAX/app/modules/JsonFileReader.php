<?php

class JsonFileReader
{
    private $pathToFile;
    private $fileName;
    private $authDatabase;

    public function __construct($pathToFile, $fileName)
    {
        $this->pathToFile = $pathToFile;
        $this->fileName = $fileName;
    }

    public function getJsonFileContent()
    {
        set_error_handler(function () {
            echo '<h1>An error occurred while reading the file "' .
                $this->fileName . '"!</h1>';
            die();
        });

        $this->authDatabase
            = json_decode(file_get_contents($this->pathToFile), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            trigger_error('');
        } else {
            restore_error_handler();

            return $this->authDatabase;
        }

        restore_error_handler();

        return false;
    }
}
