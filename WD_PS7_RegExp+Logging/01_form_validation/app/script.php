<?php

foreach ($_POST as $input => $value) {
    $_POST[$input] = (preg_match($config['inputs_regex'][$input], $value)) ? 'pass' : 'fail';
}

echo json_encode($_POST);
