<?php

namespace module;

class JsonSongsCounter
{
    private $filePath;
    private $songs;

    public function __construct($filePath, $defaultSongsList)
    {
        $this->filePath = $filePath;
        $this->validateJsonDatabase($defaultSongsList);
        $this->readJsonDatabase();
    }

    private function validateJsonDatabase($defaultSongsList)
    {
        if (!$this->validateDatabaseFolder()) {
            throw new \Exception('An error occurred "Cannot create database folder!"');
        }

        if (!$this->validateDatabaseJsonFile($defaultSongsList)) {
            throw new \Exception('An error occurred "Database is corrupted!"');
        }
    }

    private function validateDatabaseFolder()
    {
        if (!file_exists(dirname($this->filePath))) {
            return mkdir(dirname($this->filePath), 0700);
        }

        return true;
    }

    private function validateDatabaseJsonFile($defaultSongsList)
    {
        if (!is_file($this->filePath) || !is_readable($this->filePath)
            || !is_writable($this->filePath)) {
            return $this->createDefaultDatabaseJsonFile($defaultSongsList);
        }

        return true;
    }

    private function createDefaultDatabaseJsonFile($defaultSongsList)
    {
        if (!fopen($this->filePath, 'w')) {
            return false;
        }

        return $this->addContentToJsonFile($defaultSongsList);
    }

    private function addContentToJsonFile($defaultSongsList)
    {
        $this->songs = $defaultSongsList;
        return $this->writeJson();
    }

    private function writeJson()
    {
        file_put_contents(
            $this->filePath,
            json_encode($this->songs, JSON_PRETTY_PRINT)
        );

        if (json_last_error() !== JSON_ERROR_NONE) {
            return false;
        }

        return true;
    }

    private function readJsonDatabase()
    {
        if (!$this->songs) { // if songs get from createDefaultDatabaseJsonFile()
            $this->songs = json_decode(file_get_contents($this->filePath), true);
        }

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception('An error occurred "Cannot read json database file!"');
        }
    }

    public function voteForSong($songName)
    {
        if (array_key_exists($songName, $this->songs)) {
            $this->songs[$songName][0]++;
        } else {
            throw new \Exception('404'); // if json doesn't have transferred song
        }

        if (!$this->writeJson()) {
            throw new \Exception('An error occurred "Database is corrupted!"');
        }
    }

    public function getRating()
    {
        return $this->songs;
    }

    public function createVoteOptions()
    {
        $options = '';

        foreach ($this->songs as $song => $value) {
            $options .=
                '<label><input type="radio" name="song" value="' . $song .
                '" checked="checked">' . $value[1] . '</label><br>';
        }
        unset($song);

        return $options;
    }
}
