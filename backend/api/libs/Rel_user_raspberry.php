<?php 
	class Rel_user_raspberry {
private $id_user;
private $id_raspberry;

function __construct($id_user = null, $id_raspberry = null) {
	$this->id_user = $id_user;
	$this->id_raspberry = $id_raspberry;
}

public function set($datos, $posini=0){	
	$this->id_user = $datos[0+$posini];
	$this->id_raspberry = $datos[1+$posini];
}

public function getJSON(){
	return '{'.
	'"id_user":"'.$this->id_user.'",'.
	'"id_raspberry":"'.$this->id_raspberry.'"'.
	'},';
}
public function getId_user() {
	return $this->id_user;
}

public function setId_user() {
	$this->id_user=$id_user;
}

public function getId_raspberry() {
	return $this->id_raspberry;
}

public function setId_raspberry() {
	$this->id_raspberry=$id_raspberry;
}

}
