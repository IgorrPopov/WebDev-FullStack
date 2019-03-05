<?php
session_start();

require_once 'actions.php';

if (!ifNeedCreateUploadedFolder(UPLOADED_FOLDER)) {
    $_SESSION['task3'] = 'An error occurred "The upload folder is not created"!';
}

if (isset($_POST['links_list'])) {
    echo showFilesList();
}
