<?php
namespace app\modules;

class DatabaseHandler
{
    private $pathToFile;

    public function __construct($pathToFile)
    {
        $this->pathToFile = $pathToFile;
        (new JsonFileChecker)->validateDatabase($this->pathToFile);
    }

    public function getDatabase()
    {
        return (new JsonFileReader)->getJsonDatabase($this->pathToFile);
    }

    public function writeToDatabase($data)
    {
        (new JsonFileWriter)->writeJson($this->pathToFile, $data);
    }
}
