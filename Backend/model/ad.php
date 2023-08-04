<?php

use function PHPSTORM_META\type;

include_once('../core/databaseModel.php');
require_once '../core/jwt.php';
require_once '../core/utils.php';
require_once 'adImages.php';
require_once 'mail.php';


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
        $where = null;
        $status = "where ads.status=1";

        if (isset($_GET['id']) && is_numeric($_GET['id'])) {
            $where = ' and ads.id=' . $_GET['id'];
        }
        if (isset($_GET['uploader'])) {
            $where = ' where ads.uploader="' . $_GET['uploader'] . '"';
            $status = null;
        }

        if (isset($_GET['status']) && $_GET['status'] == 'all' && isAdmin()) {
            $status = null;
        }

        $query = "SELECT ads.*, GROUP_CONCAT(images.url SEPARATOR '|') AS images
        FROM ads
        LEFT JOIN images ON ads.id = images.car_id "
            . $status . $where .
            " GROUP BY ads.id";




        $result = $this->database->query($query);
        if ($result instanceof Exception) {
            echo json_encode(array(
                "status" => 0,
                "message" => $result->getMessage()
            ));
            exit;
        }

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


                            $uniq = uniqid();
                            $imageFilePath = __DIR__ . "/../images/" . $uniq . ".png";
                            $imgurl = "http://localhost:8888/dealsonwheels/backend/images/" . $uniq . ".png";

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

    public function changeStatus()
    {
        if (isset($_GET['id']) && is_numeric($_GET['id']) && isset($_GET['status']) && is_numeric($_GET['status'])) {
            $user = $this->database->where(1, array('id' => $_GET['id']));
            if (isAdmin() || requester()==$user->uploader) {
                $result = $this->database->update($_GET['id'], array('status' => $_GET['status']));
                if ($result instanceof Exception) {
                    echo json_encode(array(
                        "status" => 0,
                        "message" => $result->getMessage()
                    ));
                    exit;
                }


                if (is_numeric($result) || is_bool($result)) {

                    $uploader = $user->uploader;

                    $subject='';
                    $body='';
                    if($_GET['status']==1){
                        $subject='Ad Approved :)';
                        $body='Congrats, your ad has been approved for '.$user->title;
                    }elseif($_GET['status']==0){
                        $subject='Ad Disapproved :)';
                        $body='Your ad has been disapproved for '.$user->title;
                    }

                    $mail = new Mail();
                    $mailMsg = "Mail couldn't be sent";
                    $mailResponse = json_decode($mail->sendMail($uploader, $subject,$body));
                    if ($mailResponse->status) {
                        $mailMsg = "Mail sent";
                    }


                    echo json_encode(array(
                        "status" => 200,
                        "message" => "Status updated, " . $mailMsg,
                    ));
                }
            } else {
                echo json_encode(array(
                    "status" => 403,
                    "message" => "Limited Access"
                ));
            }
        } else {
            echo json_encode(array(
                "status" => 400,
                "message" => "Empty Fields"
            ));
        }
    }
}
