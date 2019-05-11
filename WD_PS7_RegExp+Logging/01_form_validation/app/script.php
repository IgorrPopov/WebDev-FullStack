<?php

use app\module\Validator;

require_once $config['pathToFormValidator'];


echo json_encode((new Validator())->validateForm($_POST));
