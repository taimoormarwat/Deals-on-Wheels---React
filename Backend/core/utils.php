<?php 

function inputToArray($data){
    $resultArray = array(); // Initialize an empty array to store the converted data

    foreach ($data as $key => $value) {
        $resultArray[$key] = $value;
    }

    return $resultArray;
}