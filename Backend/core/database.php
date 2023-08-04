<?php

use function PHPSTORM_META\type;

Trait Database
{
	

	private function connect()
	{
		$string = "mysql:hostname=localhost;dbname=dealsonwheels";
		$con = new PDO($string,"mamp","root");
		return $con;
	}

	public function query($query, $data = [])
	{

		$con = $this->connect();
		$stm = $con->prepare($query);

    

        try{
            $check = $stm->execute($data);
        }catch(Exception $e){
            return $e;
        }
		if($check)
		{
			$result = $stm->fetchAll(PDO::FETCH_OBJ);
			if(is_array($result) && count($result))
			{
				return $result;
			}
		}
		if(is_numeric($con->lastInsertId())){
			return $con->lastInsertId();
		}

		return true;


	}


	public function get_row($query, $data = [])
	{

		$con = $this->connect();
		$stm = $con->prepare($query);

		$check = $stm->execute($data);
		if($check)
		{
			$result = $stm->fetchAll(PDO::FETCH_OBJ);
			if(is_array($result) && count($result))
			{
				return $result[0];
			}
		}

		return false;
	}
	
}


