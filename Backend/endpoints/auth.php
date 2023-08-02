<?php



header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

include_once('../core/databaseModel.php');
require_once '../core/jwt.php';
require_once '../model/user.php';

$headers=getallheaders();

if ($_SERVER["REQUEST_METHOD"] === "POST") {


    $database = new DatabaseModel();

    $data = json_decode(file_get_contents("php://input"));

    $user=new User();

    return $user->login($data);



}
elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {


    $database = new DatabaseModel();

    $data = json_decode(file_get_contents("php://input"));


    $user=new User();

    return $user->signup($data);



}

elseif($_SERVER["REQUEST_METHOD"]==="GET"){
    $token = getBearerTokenFromHeaders(getallheaders());

    if ($token !== null) {
        $decodedData = validateToken($token);
        if ($decodedData !== false) {
            echo json_encode(array(
                "status" => 1,
                "message"=>"Access Granted",
                "data"=>$decodedData
            ));

        } else {
            echo json_encode(array(
                "status" => 0,
                "message"=>"Token is invalid."
            ));
    
        }
    } else {
        echo json_encode(array(
            "status" => 0,
            "message"=>"Token not found."
        ));

    }
}
