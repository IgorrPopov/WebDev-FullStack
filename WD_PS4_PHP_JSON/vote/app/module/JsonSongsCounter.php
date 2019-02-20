<?php
namespace module;

class JsonSongsCounter
{
    private $filePath;
    private $songs;

    public function __construct($filePath)
    {
        $this->filePath = $filePath;
    }

    public function validateJsonFile()
    {
        return (file_exists($this->filePath));
    }

    public function createJsonFile($jsonFileContent)
    {
        if (!file_exists(dirname($this->filePath))) {
            mkdir(dirname($this->filePath), 0700);
        }

        fopen($this->filePath, 'w')
            or die('Could not create the file "' . basename($this->filePath) . '"');
        $this->addContentToJsonFile($jsonFileContent);
    }

    private function addContentToJsonFile($jsonFileContent)
    {
        $this->songs = $jsonFileContent;
        $this->writeJson();
    }

    public function readJson()
    {
        set_error_handler(function () {
            echo '<h1>An error occurred while reading the file "' .
                  basename($this->filePath) . '"!</h1>';
            die();
        });

        $this->songs = json_decode(file_get_contents($this->filePath), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            trigger_error('');
        }

        restore_error_handler();
    }

    public function voteForSong($songName)
    {
        if (array_key_exists($songName, $this->songs)) {
            $this->songs[$songName][0]++;
        } else {
            return false; // if json doesn't have transferred song
        }
        return true;
    }

    public function writeJson()
    {
        set_error_handler(function () {
            echo '<h1>An error occurred while writing the file "' .
                  basename($this->filePath) . '"!<h1/>.';
            die();
        });

        file_put_contents(
            $this->filePath,
            json_encode($this->songs, JSON_PRETTY_PRINT)
        );

        if (json_last_error() !== JSON_ERROR_NONE) {
            trigger_error('');
        }

        restore_error_handler();
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
