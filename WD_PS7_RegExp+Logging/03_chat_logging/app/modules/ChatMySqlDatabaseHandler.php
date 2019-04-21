<?php
namespace app\modules;

use PDO;

class ChatMySqlDatabaseHandler implements DatabaseHandler
{
    public function isUserExist($name)
    {
        $sql = 'SELECT name FROM users WHERE name=:name';
        $stm = DatabaseConnection::getConnection()->prepare($sql);
        $stm->bindParam(':name', $name);
        $stm->execute();

        return ($stm->fetch(PDO::FETCH_ASSOC)) ? true : false;
    }

    public function isPasswordMatch($name, $password)
    {
        $sql = 'SELECT password FROM users WHERE name=:name';
        $stm = DatabaseConnection::getConnection()->prepare($sql);
        $stm->bindParam(':name', $name);
        $stm->execute();

        $hashedPasswordFromDb = $stm->fetch(PDO::FETCH_ASSOC)['password'];

        return password_verify($password, $hashedPasswordFromDb);
    }

    public function addUser($name, $password)
    {
        $newHashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $sql = 'INSERT INTO users(name, password) VALUES(:name, :password)';
        $stm = DatabaseConnection::getConnection()->prepare($sql);
        $stm->bindParam(':name', $name);
        $stm->bindParam(':password', $newHashedPassword);
        $stm->execute();
    }

    public function addMessage($name, $message)
    {
        $userId = $this->getUserId($name);

        $sql = 'INSERT INTO messages(user_id, message) VALUES(:user_id, :message)';
        $stm = DatabaseConnection::getConnection()->prepare($sql);
        $stm->bindParam(':user_id', $userId);
        $stm->bindParam(':message', $message);
        $stm->execute();
    }

    public function getMessagesForLastHour()
    {
        $sql = "SELECT messages.time, messages.message, users.name
                FROM messages
                LEFT JOIN users
                ON messages.user_id=users.user_id
                WHERE messages.time > NOW() - INTERVAL 1 HOUR";
        $stm = DatabaseConnection::getConnection()->prepare($sql);
        $stm->execute();

        return $stm->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserId($name)
    {
        $sql = 'SELECT user_id FROM users WHERE name=:name';
        $stm = DatabaseConnection::getConnection()->prepare($sql);
        $stm->bindParam(':name', $name);
        $stm->execute();

        return $stm->fetch(PDO::FETCH_ASSOC)['user_id'];
    }
}
