<?php 
	class Socket {
private $id;
private $id_raspberry;
private $nombre;
private $state;
private $active;
private $rel;

function __construct($id = null, $id_raspberry = null, $nombre = null, $state = null, $active = null, $rel = null) {
	$this->id = $id;
	$this->id_raspberry = $id_raspberry;
	$this->nombre = $nombre;
	$this->state = $state;
	$this->active = $active;
	$this->rel = $rel;
}

public function set($datos, $posini=0){	
	$this->id = $datos[0+$posini];
	$this->id_raspberry = $datos[1+$posini];
	$this->nombre = $datos[2+$posini];
	$this->state = $datos[3+$posini];
	$this->active = $datos[4+$posini];
	$this->rel = $datos[5+$posini];
}

public function getJSON(){
	return '{'.
	'"id":"'.$this->id.'",'.
	'"id_raspberry":"'.$this->id_raspberry.'",'.
	'"nombre":"'.$this->nombre.'",'.
	'"state":"'.$this->state.'",'.
	'"active":"'.$this->active.'",'.
	'"rel":"'.$this->rel.'"'.
	'}';
}
public function getId() {
	return $this->id;
}

public function setId() {
	$this->id=$id;
}

public function getId_raspberry() {
	return $this->id_raspberry;
}

public function setId_raspberry() {
	$this->id_raspberry=$id_raspberry;
}

public function getNombre() {
	return $this->nombre;
}

public function setNombre() {
	$this->nombre=$nombre;
}

public function getState() {
	return $this->state;
}

public function setState() {
	$this->state=$state;
}

public function getActive() {
	return $this->active;
}

public function setActive() {
	$this->active=$active;
}

public function getRel() {
	return $this->rel;
}

public function setRel() {
	$this->rel=$rel;
}

}
