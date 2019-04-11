<?php
namespace app\modules;

class ChatDatabaseHandler implements DatabaseHandler
{
    private $databaseHandler;

    public function __construct(DatabaseHandler $databaseHandler)
    {
        $this->databaseHandler = $databaseHandler;
    }

    public function isUserExist($name)
    {
        return $this->databaseHandler->isUserExist($name);
    }

    public function isPasswordMatch($name, $password)
    {
        return $this->databaseHandler->isPasswordMatch($name, $password);
    }

    public function addUser($name, $password)
    {
        $this->databaseHandler->addUser($name, $password);
    }

    public function addMessage($name, $message)
    {
        $this->databaseHandler->addMessage($name, $message);
    }

    public function getMessagesForLastHour()
    {
        return $this->databaseHandler->getMessagesForLastHour();
    }
}
