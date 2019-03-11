<?php
namespace app\modules;

class DatabaseHandler
{
    private $pathToFile;

    public function __construct($pathToFile)
    {
        $this->pathToFile = $pathToFile;
        JsonFileChecker::validateDatabase($this->pathToFile);
    }

    public function getDatabase()
    {
        return JsonFileReader::getJsonDatabase($this->pathToFile);
    }

    public function writeToDatabase($data)
    {
        JsonFileWriter::writeJson($this->pathToFile, $data);
    }
}
