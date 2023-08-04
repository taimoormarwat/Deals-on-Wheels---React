<?php



header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");


include_once('../core/databaseModel.php');
require_once '../core/jwt.php';
require_once '../model/ad.php';


$headers=getallheaders();

$data = json_decode(file_get_contents("php://input"));
$ads=new Ad();



if ($_SERVER["REQUEST_METHOD"] === "POST") {

    return $ads->postAd($data);

}
elseif($_SERVER["REQUEST_METHOD"]==="GET"){

    return $ads->getAds($data);

    
}

elseif($_SERVER["REQUEST_METHOD"]==="PATCH"){

    return $ads->changeStatus();


}