<?php
namespace app\modules;

class ChatResponse
{
    private $responseBody = ['status' => 'fail'];

    public function send($responseArray)
    {
        foreach ($responseArray as $key => $value) {
            $this->responseBody[$key] = $value;
        }

        echo json_encode($this->responseBody);

        die();
    }
}
