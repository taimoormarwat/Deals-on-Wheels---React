<?php
// jwt.php

require_once '../vendor/autoload.php'; // Include Composer autoloader

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Secret key to sign and verify tokens
$secretKey = 'thisisthesecretkey';

// Function to generate a new JWT token
function generateToken($data)
{
    global $secretKey;

    $issuedAt = time();
    $expirationTime = $issuedAt + 60 * 60 * 24; // 1 hour

    $payload = array(
        'iat' => $issuedAt,
        'exp' => $expirationTime,
        'data' => $data
    );

    return JWT::encode($payload, $secretKey, 'HS256');
}

// Function to validate a JWT token
function validateToken($token)
{
    global $secretKey;

    try {
        $alg = new stdClass();
        $alg->alg = array('HS256');
    

        // $decoded = JWT::decode($token, $secretKey, array('HS256'));
        $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
        return $decoded->data;
    } catch (Exception $e) {
        // Token is invalid
        return false;
    }
}



function getBearerTokenFromHeaders($headers)
{
    if (isset($headers['Authorization']) && preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
        return $matches[1];
    }

    return null;
}

