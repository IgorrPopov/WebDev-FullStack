<?php
namespace app\modules;

class InputValidator
{
    public static function validateInput($input)
    {
        $input = trim($input);
        $input = stripslashes($input);
        return htmlspecialchars($input);
    }
}
