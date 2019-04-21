<?php
namespace app\modules;

use DateTime;
use DateTimeZone;

class ChatLogger
{
    private $logBody = [];
    private $logFile = '';
    private $dateTime;

    public function __construct($logFile)
    {
        $this->logFile = $logFile;
        $this->dateTime = new DateTime('now', new DateTimeZone('Europe/Helsinki'));
    }

    public function setLog($level, $message, $service, $userId = 'none')
    {
        $this->logBody['date_time'] = $this->getDateAndTime();
        $this->logBody['level'] = $level;
        $this->logBody['message'] = $message;
        $this->logBody['service'] = $service;
        $this->logBody['ip'] = $this->getUserIP();
        $this->logBody['user_id'] = $userId;

        $this->writeLog();
    }

    public function getLog()
    {
        return $this->logBody;
    }

    private function writeLog()
    {
        $logString = '';

        foreach ($this->logBody as $key => $value) {
            $logString .= '[' . $key . '] ' . $value . ' ';
        }

        file_put_contents($this->logFile, $logString . "\n", FILE_APPEND );
    }

    private function getDateAndTime()
    {
        $this->dateTime->setTimestamp(time());
        return $this->dateTime->format('d.m.Y / H:i:s');
    }

    private function getUserIP()
    {
        return isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'none';
    }
}
