<?php
namespace app\modules;

interface DatabaseHandler
{
    public function isUserExist($name);

    public function isPasswordMatch($name, $password);

    public function addUser($name, $password);

    public function addMessage($name, $message);

    public function getMessagesForLastHour();

    public function getUserId($name);
}