<?php
namespace app\modules;

class JsonFileWriter
{
   public function writeJson($pathToFile, $data)
   {
       if (!$jsonString = json_encode($data, JSON_PRETTY_PRINT)) {
           throw new \Exception(
               'An error occurred "Cannot correctly write json database file!"'
           );
       }

       if (!file_put_contents($pathToFile, $jsonString)) {
           throw new \Exception(
               'An error occurred "Cannot write database file!"'
           );
       }
   }
}
