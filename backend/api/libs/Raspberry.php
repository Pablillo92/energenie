<?php 
	class Raspberry {
private $id;
private $nombre;
private $ip;

function __construct($id = null, $nombre = null, $ip = null) {
	$this->id = $id;
	$this->nombre = $nombre;
	$this->ip = $ip;
}

public function set($datos, $posini=0){	
	$this->id = $datos[0+$posini];
	$this->nombre = $datos[1+$posini];
	$this->ip = $datos[2+$posini];
}

public function getJSON(){
	return '{'.
	'"id":"'.$this->id.'",'.
	'"nombre":"'.$this->nombre.'",'.
	'"ip":"'.$this->ip.'"'.
	'},';
}
public function getId() {
	return $this->id;
}

public function setId() {
	$this->id=$id;
}

public function getNombre() {
	return $this->nombre;
}

public function setNombre() {
	$this->nombre=$nombre;
}

public function getIp() {
	return $this->ip;
}

public function setIp() {
	$this->ip=$ip;
}

}
