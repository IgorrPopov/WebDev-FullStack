<?php

namespace app\module;

class Validator
{
    private const INPUTS_REGEX = [
      'ip' => '/^((0|25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?)\.){3}(0|25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?)$/',
      'url' => '/^https?:\/\/(www\.)?[\w\-\.]{2,256}\.[a-z]{2,6}\b(\/[\w\-@:%+.~#?&\/\=]*)?$/',
      'email' => '/^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$/',
      'date' => '/^(02\/(0[1-9]|[1-2][0-9])|(11|0[469])\/(0[1-9]|[1-2]\d|30)|(1[02]|0[13578])\/(0[1-9]|[1-2]\d|3[01]))\/\d{4}$/',
      'time' => '/^([0-1]\d|2[0-3])(:[0-5]\d){2}$/'
    ];

    public function validateForm(array $array): array
    {
        foreach ($array as $input => $value) {
            $array[$input] = (preg_match(self::INPUTS_REGEX[$input], $value)) ? 'pass' : 'fail';
        }

        return $array;
    }
}
