<?php
const UPLOADED_FOLDER = 'uploaded_files' . DIRECTORY_SEPARATOR;

const IMG_EXT =  [
    'bmp',
    'tif',
    'tiff',
    'gif',
    'jpeg',
    'jpg',
    'png'
];

const UPLOAD_FILE_MSG = [
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
];

function checkInput($input)
{
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    return $input;
}

function selectFunctionByTaskName($taskName)
{
    switch ($taskName):
        case 'task1':
            return addition();
        case 'task2':
            return conditionAddition();
        case 'task3':
            return uploadFile();
        case 'task4':
            return chessboard();
        case 'task5':
            return digitsSum();
        case 'task6':
            return randomArray();
        case 'task7':
            return countText();
        default:
            return false;
    endswitch;
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
        if (in_array(abs($i % 10), [2, 3, 7], true)) {
            $result += $i;
        }
    }
    return 'Result: ' . $result;
}

// task 3
function uploadFile()
{
    if (isset($_FILES['file'])) {
        return processUploadedFile();
    }
}

function processUploadedFile()
{
    if (!ifNeedCreateUploadedFolder(UPLOADED_FOLDER)) {
        return 'An error occurred "The upload folder is not created"!';
    }

    if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $uploadedFile = UPLOADED_FOLDER . basename($_FILES['file']['name']);
        move_uploaded_file($_FILES['file']['tmp_name'], $uploadedFile);
    }

    return UPLOAD_FILE_MSG[$_FILES['file']['error']];
}

function ifNeedCreateUploadedFolder($pathToFolder)
{
    if (!file_exists($pathToFolder)) {
        return mkdir($pathToFolder, 0700);
    }

    return true;
}

function showFilesList()
{
    $filesArray = // array slice to reset indexes
        array_slice(array_diff(scandir(UPLOADED_FOLDER), ['.', '..']), 0);

    return count($filesArray) ? createListOfLinks($filesArray) : '';
}

function createListOfLinks($files)
{
    $arraySize = count($files);
    $filesSize = findSize($files, $arraySize);
    $linksList = '<br />';

    for ($i = 0; $i < $arraySize; $i++) {
        $ext =  pathinfo(UPLOADED_FOLDER . $files[$i], PATHINFO_EXTENSION);
        if (in_array($ext, IMG_EXT, true)) {
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
    for ($i = 0; $i < $arraySize; $i++) {
        $filesSize[] =
            convertSize(filesize(UPLOADED_FOLDER . $files[$i]));
    }
    return $filesSize;
}

function convertSize($sizeInBytes)
{
    $suffixes = array(' bt', ' kb', ' mg', ' gb');
    $exponent = floor(log($sizeInBytes) / log(1024));
    return round(($sizeInBytes / 1024 ** $exponent * 1), 2)
        . $suffixes[(int)$exponent];
}

// task 4
function chessboard()
{
    $maxSize = 30;

    $rows = isset($_POST['rows']) ? checkInput($_POST['rows']) : '';
    $columns = isset($_POST['columns']) ? checkInput($_POST['columns']) : '';

    if (empty($rows) || empty($columns)) {
        return 'Enter both dimensions!';
    }

    if (!preg_match('/^[1-9](\d*)$/', $rows) ||
        !preg_match('/^[1-9](\d*)$/', $columns)) {
        return 'Invalid input!';
    }

    if ($rows > $maxSize || $columns > $maxSize) {
        return 'Maximum size of dimensions is ' . $maxSize . '!';
    }

    return 'chessboard ' . $rows . ' ' . $columns;
}

// task 5
function digitsSum()
{
    $numbers = isset($_POST['number']) ? checkInput($_POST['number']) : '';

    if (empty($numbers)) {
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
        $array[] = mt_rand(1, 10);
    }

    $array = array_values(array_unique($array));
    rsort($array);

    return print_r($array, true);
}

// task 7
function countText()
{
    $text = checkInput($_POST['textarea']);

    setcookie('textarea', $text, time() + 3600, "/");

    if ($text != '') {
        $text = str_replace(["\r\n", "\r"], "\n", $text);
        $lines = substr_count($text, "\n") + 1;
        $text = str_replace("\n", '', $text);

        $text = preg_replace('/\s/', ' ', $text);
        $spaces = substr_count($text, ' ');

        $characters = mb_strlen($text) - $spaces;

        return 'Lines: ' . $lines . '<br>' .
               'Spaces: ' . $spaces . '<br>' .
               'Letters (emoji & special characters): ' . $characters;
    }

    return 'You passed an empty string, try again!';
}
