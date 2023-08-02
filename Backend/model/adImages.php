<?php

use function PHPSTORM_META\type;

include_once('../core/databaseModel.php');
require_once '../core/jwt.php';
require_once '../core/utils.php';


class AdImages
{

    public $database;

    // Constructor to initialize the $database property
    public function __construct()
    {
        $this->database = new DatabaseModel();
        $this->database->table='images';
    }

    public function getAdImages($id){

        $results=$this->database->where(2,$id);

        return $results;
    }

    public function saveAdImages($data){
        $results=$this->database->insert($data);
        return $results;

    }
}