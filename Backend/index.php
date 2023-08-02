<?php



header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");

include_once('./core/databaseModel.php');
require_once './core/jwt.php';

$headers=getallheaders();

if ($_SERVER["REQUEST_METHOD"] === "POST") {



    $database = new DatabaseModel();

    $data = json_decode(file_get_contents("php://input"));
    $resultArray = array(); // Initialize an empty array to store the converted data

    // Iterate through the decoded data and create the array
    foreach ($data as $key => $value) {
        $resultArray[$key] = $value;
    }

    if (isset($data->email) && isset($data->password)) {
        $result=$database->where(1,$resultArray);

        if (!$result) {
            // credentials are incorrect
            echo json_encode(array(
                "status" => 0,
                "message"=>"Incorrect credentials"
            ));
        }
        else{
            // authenticate user
            $userData = array(
                'username' => $result->name,
                'email'=>$result->email,
                'img'=>$result->img,
                'role'=>$result->role
            );
            
            // Generate a new JWT token
            $token = generateToken($userData);
            echo json_encode(array(
                "status" => 1,
                "message"=>"Access Granted",
                "jwt"=>$token
            ));

        }
    }else{
        // fields are empty
        echo json_encode(array(
            "status" => 0,
            "message"=>"Empty Fields"
        ));

    }
}
