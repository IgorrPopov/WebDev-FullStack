<?php

class JsonFileWriter
{
    private $pathToFile;
    private $fileName;

    public function __construct($pathToFile, $fileName)
    {
        $this->pathToFile = $pathToFile;
        $this->fileName = $fileName;
    }

    public function writeJson($data)
    {
        set_error_handler(function () {
            echo '<h1>An error occurred while writing the file "' .
                $this->fileName . '"!<h1/>.';
            die();
        });

        file_put_contents(
            $this->pathToFile,
            json_encode($data, JSON_PRETTY_PRINT)
        );

        if (json_last_error() !== JSON_ERROR_NONE) {
            trigger_error('');
        }

        restore_error_handler();
    }
}
