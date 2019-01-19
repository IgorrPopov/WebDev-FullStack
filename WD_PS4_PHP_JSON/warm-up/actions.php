<?php
session_start();

define('UPLOADED_FOLDER', 'uploaded_files' . DIRECTORY_SEPARATOR);

define('IMG_EXT', [
    'bmp',
    'tif',
    'tiff',
    'gif',
    'jpeg',
    'jpg',
    'png'
]);

define('UPLOAD_FILE_MSG', [
    UPLOAD_ERR_OK =>
        'File uploaded successfully',
    UPLOAD_ERR_INI_SIZE =>
        'The uploaded file exceeds the upload_max_filesize directive in php.ini',
    UPLOAD_ERR_FORM_SIZE =>
        'The uploaded file exceeds the MAX_FILE_SIZE 
         directive that was specified in the HTML form',
    UPLOAD_ERR_PARTIAL =>
        'The uploaded file was only partially uploaded',
    UPLOAD_ERR_NO_FILE =>
        'No file was uploaded',
    UPLOAD_ERR_NO_TMP_DIR =>
        'Missing a temporary folder',
    UPLOAD_ERR_CANT_WRITE =>
        'Failed to write file to disk',
    UPLOAD_ERR_EXTENSION =>
        'A PHP extension stopped the file upload'
]);

define('FUNCTIONS', [
    'task1' => addition(),
    'task2' => conditionAddition(),
    'task3' => uploadFile(),
    'task4' => chessboard(),
    'task5' => digitsSum(),
    'task6' => randomArray(),
    'task7' => countText()
]);

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(count($_REQUEST)) {
        end($_REQUEST);
        $task = checkInput(key($_REQUEST));
        $_SESSION[$task] = FUNCTIONS[$task];
    }
}

$_SESSION['files_list'] = showFilesList();

$_SESSION['textarea_input'] = $_POST['textarea'];

function checkInput($input)
{
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    return $input;
}

// task 1
function addition()
{
    $result = 0;
    for ($i = -1000; $i <= 1000; $i++) {
        $result += $i;
    }
    return 'Result: ' . $result;
}

// task 2
function conditionAddition()
{
    $result = 0;
    for ($i = -1000; $i <= 1000; $i++) {
        if(in_array(abs($i % 10), [2, 3, 7])) {
            $result += $i;
        }
    }
    return 'Result: ' . $result;
}

// task 3
function uploadFile()
{
    if(isset($_FILES['file'])){
        if($_FILES['file']['error'] === UPLOAD_ERR_OK){
            ifNeedCreateUploadedFolder(UPLOADED_FOLDER);

            $uploadedFile = UPLOADED_FOLDER . basename($_FILES['file']['name']);
            move_uploaded_file($_FILES['file']['tmp_name'], $uploadedFile);
        }
        return UPLOAD_FILE_MSG[$_FILES['file']['error']];
    }
}

function ifNeedCreateUploadedFolder($pathToFolder)
{
    if(!file_exists($pathToFolder)) {
        mkdir($pathToFolder, 0700);
    }
}

function showFilesList()
{
    $filesArray = array_slice(scandir(UPLOADED_FOLDER), 2);
    return count($filesArray) ? createListOfLinks($filesArray) : false;
}

function createListOfLinks($files)
{
    $arraySize = count($files);
    $filesSize = findSize($files, $arraySize);
    $linksList = '<br />';

    for ($i = 0; $i < $arraySize; $i++) {
        $ext =  pathinfo(UPLOADED_FOLDER . $files[$i], PATHINFO_EXTENSION);
        if(in_array($ext, IMG_EXT)){
            $linksList .= '<a href="' . UPLOADED_FOLDER . $files[$i] . '" class="preview" 
            download>' . $files[$i] . ' ('. $filesSize[$i] .')' . '</a><br />';
        } else {
            $linksList .= '<a href="' . UPLOADED_FOLDER . $files[$i] . '" download>'
                . $files[$i] . ' ('. $filesSize[$i] .')' . '</a><br />';
        }
    }

    return $linksList;
}

function findSize($files, $arraySize)
{
    $filesSize = [];
    for ($i = 0; $i < $arraySize; $i++){
        $filesSize[] =
            convertSize(filesize(UPLOADED_FOLDER . $files[$i]));
    }
    return $filesSize;
}

function convertSize($sizeInBytes)
{
    $suffixes = array(' bt', ' kb', ' mg', ' gb');
    $exponent = floor(log($sizeInBytes) / log(1024));
    return round(($sizeInBytes / pow(1024, $exponent) * 1), 2)
        . $suffixes[(int)$exponent];
}

// task 4
function chessboard()
{
    $maxSize = 30;
    $cellSizePx = 20;
    $rows = isset($_POST['rows']) ? checkInput($_POST['rows']) : '';
    $columns = isset($_POST['columns']) ? checkInput($_POST['columns']) : '';
    if(empty($rows) || empty($columns)) {
        return 'Enter both dimensions!';
    }
    if (!preg_match('/^[1-9]([0-9]*)$/', $rows) ||
        !preg_match('/^[1-9]([0-9]*)$/', $columns)) {
        return 'Invalid input!';
    }
    if($rows > $maxSize || $columns > $maxSize) {
        return 'Maximum size of dimensions is ' . $maxSize . '!';
    }
    return createChessboard($rows, $columns, $cellSizePx);
}

function createChessboard($rows, $columns, $size)
{
    $chessboard = '<div class="chessboard" style="width: ' . $size * $columns
        . 'px; height: '. $size * $rows . 'px;">';
    for ($i = 0; $i < $rows; $i++) {
        for ($j = 0; $j < $columns; $j++) {
            $chessboard .= addCell($size, ($j % 2) === ($i % 2) ?
                '#000000' : '#ffffff');
        }
    }
    $chessboard .= '</div>';
    return $chessboard;
}

function addCell($size, $color)
{
    $style = 'style="background-color: ' . $color . '; width: ' . $size
        . 'px; height: ' . $size . 'px;"';
    return '<div ' . $style . '></div>';
}

// task 5
function digitsSum()
{
    $numbers = isset($_POST['number']) ? checkInput($_POST['number']) : '';
    if(empty($numbers)) {
        return 'Empty input!';
    }
    $numbers = preg_grep('/\d/', str_split($numbers));
    return ($numbers) ? 'Result: ' . array_sum($numbers) :
        'You have not transmitted any numbers!';
}

// task 6
function randomArray()
{
    $array = [];
    for ($i = 0; $i < 100; $i++) {
        $array[] = rand(1, 10);
    }
    $array = array_values(array_unique($array));
    rsort($array);
    return print_r($array, true);
}

// task 7
function countText()
{
    if (isset($_POST['textarea'])) {
        $text = checkInput($_POST['textarea']);
        if(mb_strlen($text)){
            $text = str_replace( ["\r\n", "\r"], "\n", $text);
            $lines = substr_count($text, "\n") + 1;
            $text = str_replace( "\n", '', $text);

            $text = preg_replace('/\s/', ' ', $text);
            $spaces = substr_count($text, ' ');

            $characters = mb_strlen($text) - $spaces;

            return 'Lines: ' . $lines . '<br>' .
                   'Spaces: ' . $spaces . '<br>' .
                   'Letters (emoji & special characters): ' . $characters;
        }
    }

    return 'You passed an empty string, try again!';
}

header('Location: index.php');