<?php

use function PHPSTORM_META\type;

include_once('../core/databaseModel.php');
require_once '../core/jwt.php';
require_once '../core/utils.php';


class User
{

    public $database;

    // Constructor to initialize the $database property
    public function __construct()
    {
        $this->database = new DatabaseModel();
    }


    public function login($data)
    {
        if (isset($data->email) && isset($data->password)) {

            // Iterate through the decoded data and create the array
            $resultArray = inputToArray($data);

            $result = $this->database->where(1, $resultArray);

            if (!$result) {
                // credentials are incorrect
                http_response_code(401);

                echo json_encode(array(
                    "status" => 401,
                    "message" => "Incorrect credentials"
                ));
            } else {
                // authenticate user
                $userData = array(
                    'name' => $result->name,
                    'email' => $result->email,
                    'img' => $result->img,
                    'role' => $result->role
                );

                // Generate a new JWT token
                $token = generateToken($userData);
                echo json_encode(array(
                    "status" => 200,
                    "message" => "Access Granted",
                    "jwt" => $token
                ));
            }
        } else {
            // fields are empty
            http_response_code(401);
            echo json_encode(array(
                "status" => 401,
                "message" => "Empty Fields"
            ));
        }
    }

    function signup($data)
    {
        if (isset($data->email) && isset($data->password) && isset($data->name) && isset($data->contact) && isset($data->img) && isset($data->role)) {

            // Iterate through the decoded data and create the array
            $resultArray = inputToArray($data);
            $resultArray['status'] = 1;


            if ($resultArray['role'] == 'admin') {
                $token = getBearerTokenFromHeaders(getallheaders());
                if ($token != null) {
                    $decodedata = validateToken($token);
                    if ($decodedata !== false) {
                        if ($decodedata->role != 'admin') {
                            http_response_code(401);

                            echo json_encode(array(
                                "status" => 401,
                                "message" => "Access limited."
                            ));
                            exit;
                        }
                    } else {
                        echo json_encode(array(
                            "status" => 0,
                            "message" => "Invalid Token."
                        ));
                        exit;
                    }
                } else {
                    echo json_encode(array(
                        "status" => 0,
                        "message" => "Token not found."
                    ));
                    exit;
                }
            }
                // Convert the base64-encoded image data to binary
            $profilePicture = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $resultArray['img']));


            $imageFilePath =__DIR__ . "/../images/" . uniqid() . ".png";

            $resultArray['img']=$imageFilePath;

            $result = $this->database->insert($resultArray);

            if ($result instanceof Exception) {
                if ($result->getCode() == 23000) {
                    echo json_encode(array(
                        "status" => 0,
                        "message" => "Email already Exists"
                    ));
                } else {
                    echo json_encode(array(
                        "status" => 0,
                        "message" => $result->getMessage()
                    ));
                }
            }

            if (is_numeric($result)) {
                file_put_contents($imageFilePath, $profilePicture);
                echo json_encode(array(
                    "status" => 1,
                    "message" => "User created."
                ));
            }


            // if (!$result) {
            //     // credentials are incorrect
            //     echo json_encode(array(
            //         "status" => 0,
            //         "message"=>"Incorrect credentials"
            //     ));
            // }
            // else{
            //     // authenticate user
            //     $userData = array(
            //         'name' => $result->name,
            //         'email'=>$result->email,
            //         'img'=>$result->img,
            //         'role'=>$result->role
            //     );

            //     // Generate a new JWT token
            //     $token = generateToken($userData);
            //     echo json_encode(array(
            //         "status" => 1,
            //         "message"=>"Access Granted",
            //         "jwt"=>$token
            //     ));

            //}
        } else {
            // fields are empty
            echo json_encode(array(
                "status" => 0,
                "message" => "Empty Fields"
            ));
        }
    }
}
