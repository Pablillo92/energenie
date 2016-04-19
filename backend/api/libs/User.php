<?php 
	class User {
private $id;
private $email;
private $pass;
private $name;

function __construct($id = null, $email = null, $pass = null, $name = null) {
	$this->id = $id;
	$this->email = $email;
	$this->pass = $pass;
	$this->name = $name;
}

public function set($datos, $posini=0){	
	$this->id = $datos[0+$posini];
	$this->email = $datos[1+$posini];
	$this->pass = $datos[2+$posini];
	$this->name = $datos[3+$posini];
}

public function getJSON(){
	return '{'.
	'"id":"'.$this->id.'",'.
	'"email":"'.$this->email.'",'.
	'"name":"'.$this->name.'"'.
	'}';
}
public function getId() {
	return $this->id;
}

public function setId() {
	$this->id=$id;
}

public function getEmail() {
	return $this->email;
}

public function setEmail() {
	$this->email=$email;
}

public function getPass() {
	return $this->pass;
}

public function setPass() {
	$this->pass=$pass;
}

public function getName() {
	return $this->name;
}

public function setName() {
	$this->name=$name;
}

}
