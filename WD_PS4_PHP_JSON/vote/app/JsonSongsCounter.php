<?php

class JsonSongsCounter
{
    private $songsString;
    private $filePath;
    private $songs;

    public function __construct($filePath)
    {
        $this->filePath = $filePath;
        $this->readJson();
    }

    private function readJson()
    {
        set_error_handler(function ()
        {
            echo '<h1>An error occurred while reading the file "dio_top_songs.json"!</h1>';
            die();
        });

        try {
            $this->songsString = file_get_contents($this->filePath);
        }
        catch (Exception $e) {
            trigger_error('');
        }

        $this->songs = json_decode($this->songsString,true);

        if(json_last_error() !== JSON_ERROR_NONE) {
            trigger_error('');
        }

        restore_error_handler();
    }


    public function voteForSong($songName)
    {
        if(array_key_exists($songName, $this->songs)){
            $this->songs[$songName][0]++;
        } else {
            echo '<h1>There is no such song in "dio_top_songs.json" file!';
            die();
        }
    }

    public function writeJson()
    {
        set_error_handler(function ()
        {
            echo '<h1>An error occurred while writing the file "dio_top_songs.json"!<h1/>.';
            die();
        });

        $this->songsString = json_encode($this->songs,JSON_PRETTY_PRINT);

        if(json_last_error() !== JSON_ERROR_NONE) {
            trigger_error('');
        }

        try {
            file_put_contents($this->filePath, $this->songsString);
        } catch (Exception $e) {
            trigger_error('');
        }

        restore_error_handler();
    }

    public function getRating()
    {
        return $this->songs;
    }
}
