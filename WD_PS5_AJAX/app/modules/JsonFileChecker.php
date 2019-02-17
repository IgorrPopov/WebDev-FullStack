<?php

class JsonFileChecker
{
    private $pathToFile;
    private $fileName;

    public function __construct($pathToFile, $fileName)
    {
        $this->pathToFile = $pathToFile;
        $this->fileName = $fileName;
    }

    public function validateJsonFile()
    {
        if (!file_exists($this->pathToFile)) {
            $this->createJsonFile();
        }
    }

    private function createJsonFile()
    {
        if (!file_exists(dirname($this->pathToFile))) {
            mkdir(dirname($this->pathToFile), 0700);
        }

        $file = fopen($this->pathToFile, 'w')
        or die('Could not create the file "' . $this->fileName . '"');

        fwrite($file, '{}'); // empty json to prevent reading syntax error
    }
}
