<?php

require_once 'database.php';

class DatabaseModel{

    use Database;

    public $table="user";
    
    public function where($results_count,$data, $data_not = [])
	{
		$keys = array_keys($data);
		$keys_not = array_keys($data_not);
		$query = "select * from $this->table where ";

		foreach ($keys as $key) {
			$query .= $key . " = :". $key . " && ";
		}

		foreach ($keys_not as $key) {
			$query .= $key . " != :". $key . " && ";
		}
		
		$query = trim($query," && ");

		$data = array_merge($data, $data_not);


        if($results_count>1){
            return $this->query($query, $data);

        }else{
            return $this->get_row($query, $data);
        }
	}
    public function insert($data)
	{
		

		$keys = array_keys($data);

		$query = "insert into $this->table (".implode(",", $keys).") values (:".implode(",:", $keys).")";
		$result=$this->query($query, $data);

		return $result;
	}
	public function update($id, $data, $id_column = 'id')
	{

		$keys = array_keys($data);
		$query = "update $this->table set ";

		foreach ($keys as $key) {
			$query .= $key . " = :". $key . ", ";
		}

		$query = trim($query,", ");

		$query .= " where $id_column = :$id_column ";

		$data[$id_column] = $id;

		$this->query($query, $data);
		return false;

	}

}