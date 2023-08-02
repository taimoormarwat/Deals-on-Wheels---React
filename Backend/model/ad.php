<?php

use function PHPSTORM_META\type;

include_once('../core/databaseModel.php');
require_once '../core/jwt.php';
require_once '../core/utils.php';
require_once 'adImages.php';


class Ad
{

    public $database;

    // Constructor to initialize the $database property
    public function __construct()
    {
        $this->database = new DatabaseModel();
        $this->database->table = 'ads';
    }

    public function getAds($data)
    {
        $query = "SELECT ads.*, GROUP_CONCAT(images.url SEPARATOR '|') AS images
        FROM ads
        LEFT JOIN images ON ads.id = images.car_id
        WHERE ads.status = 1
        GROUP BY ads.id";


        $result = $this->database->query($query);

        if ($result) {
            echo json_encode(array(
                "status" => 1,
                "message" => "Successful",
                "ads" => $result
            ));
        } else {
            echo json_encode(array(
                "status" => 0,
                "message" => "Failure",
            ));
        }
        //        $images=$result[1]->images;


        
    }

    public function postAd($data)
    {
        if (isset($data->title) && isset($data->make) && isset($data->price) && isset($data->description) && isset($data->images)) {

            $token = getBearerTokenFromHeaders(getallheaders());
            if ($token != null) {
                $decodedata = validateToken($token);
                if ($decodedata !== false) {
                    $resultArray = inputToArray($data);

                    $resultArray['status'] = 0;
                    $resultArray['uploader'] = $decodedata->email;
                    $resultArray['views'] = "0";

                    $images = $resultArray['images'];
                    unset($resultArray['images']);

                    $result = $this->database->insert($resultArray);

                    if ($result instanceof Exception) {
                        echo json_encode(array(
                            "status" => 0,
                            "message" => $result->getMessage()
                        ));
                    }

                    if (is_numeric($result)) {
                        $adImages = new AdImages();

                        
                        for ($i = 0; $i < count($images); $i++) {
                            $pic = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $images[$i]));


                            $uniq=uniqid();
                            $imageFilePath =__DIR__ . "/../images/" . $uniq . ".png";
                            $imgurl ="http://localhost:8888/Api/dealsonwheels/images/" . $uniq . ".png";

                            file_put_contents($imageFilePath, $pic);

                                
                            $queryData = array("car_id" => $result, "url" => $imgurl);
                            $imgResult = $adImages->saveAdImages($queryData);

                            if ($imgResult instanceof Exception) {
                                echo json_encode(array(
                                    "status" => 0,
                                    "message" => $imgResult->getMessage()
                                ));
                                exit;
                            }
                        }
                        echo json_encode(array(
                            "status" => 1,
                            "message" => "Ad Posted",
                            "car_id" => $result
                        ));
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
        } else {
            echo json_encode(array(
                "status" => 0,
                "message" => "Incomplete Data"
            ));
        }
    }
}
