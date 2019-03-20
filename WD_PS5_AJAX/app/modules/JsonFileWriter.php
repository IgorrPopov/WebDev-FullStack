<?php
namespace app\modules;

class JsonFileWriter
{
   public function writeJson($pathToFile, $data)
   {
       if (!file_put_contents($pathToFile, json_encode($data, JSON_PRETTY_PRINT))) {
           throw new \Exception(
               'An error occurred "Cannot write database file!"'
           );
       }

       if (json_last_error() !== JSON_ERROR_NONE) {
           throw new \Exception(
               'An error occurred "Cannot correctly write json database file!"'
           );
       }
   }
}
