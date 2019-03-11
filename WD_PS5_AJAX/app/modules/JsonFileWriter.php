<?php
namespace app\modules;

class JsonFileWriter
{
   public static function writeJson($pathToFile, $data)
   {
       file_put_contents(
           $pathToFile,
           json_encode($data, JSON_PRETTY_PRINT)
       );

       if (json_last_error() !== JSON_ERROR_NONE) {
           throw new \Exception(
               'An error occurred "Cannot write json database file!"'
           );
       }
   }
}
