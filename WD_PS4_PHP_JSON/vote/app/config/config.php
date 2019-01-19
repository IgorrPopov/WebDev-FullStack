<?php

define('JSON_FILE_NAME', 'dio_top_songs.json');

define('PATH_TO_JSON_FILE',
    dirname(dirname(__DIR__)) .
    DIRECTORY_SEPARATOR .
    'app' .
    DIRECTORY_SEPARATOR .
    'json' .
    DIRECTORY_SEPARATOR .
    JSON_FILE_NAME);

define('PATH_TO_JSON_COUNTER_CLASS',
    dirname(dirname(__DIR__)) .
    DIRECTORY_SEPARATOR .
    'app' .
    DIRECTORY_SEPARATOR .
    'JsonSongsCounter.php');

define('DEFAULT_JSON_FILE_CONTENT', array(
        "stargazer" => [
        10389,
        "\"Stargazer\" by Rainbow (Rising 1976)"
    ],
        "holy_diver" => [
        9376,
        "\"Holy Diver\" by Dio (Holy Diver 1983)"
    ],
        "heaven_and_hell" => [
        9125,
        "\"Heaven and Hell\" by Black Sabbath (Heaven and Hell 1980)"
    ],
        "rainbow_in_the_dark" => [
        9040,
        "\"Rainbow in the Dark\" by Dio (Holy Diver 1983)"
    ],
        "stars" => [
        7038,
        "\"Stars\" by Hear'n Aid (\"Stars\" single 1986)"
    ],
        "man_on_the_silver_mountain" => [
        6996,
        "\"Man on the Silver Mountain\" by Rainbow (Ritchie Blackmore's Rainbow 1975)"
    ],
        "the_last_in_line" => [
        5708,
        "\"The Last in Line\" by Dio (The Last in Line 1984)"
    ],
        "we_rock" => [
        3208,
        "\"We Rock\" by Dio (The Last in Line 1984)"
    ],
        "stand_up_and_shout" => [
        3131,
        "\"Stand Up and Shout\" by Dio (Holy Diver 1983)"
    ],
        "neon_knights" => [
        3005,
        "\"Neon Knights\" by Black Sabbath (Heaven and Hell 1980)"
    ])
);