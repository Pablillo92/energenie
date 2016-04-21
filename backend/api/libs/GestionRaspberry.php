<?php 
	class GestionRaspberry {
 private $bd = null;
 private $nombreTabla = raspberry;

function __construct(BaseDatos $bd) {
	$this->bd = $bd;
}

function count($condicion = "") {
	$this->bd->setConsulta("select count(*) from " . $this->nombreTabla . " $condicion");
	$fila = $this->bd->getFila();
	return $fila[0];
}

function exist($id) {
	$this->bd->setConsulta("select count(*) from " . $this->nombreTabla . " where id='$id' ");
	$fila = $this->bd->getFila();
	return $fila[0] > 0; 
}

function get($id) {
	$this->bd->setConsulta("select * from " . $this->nombreTabla . " where id='$id'");
	$fila = $this->bd->getFila();
	$obj = new Raspberry();
	$obj->set($fila);
	return $obj;
}

function getRaspberry($pagina=0, $rpp=10, $condicion="", $orderby="order by id"){
	if(!is_numeric($pagina))
		$pagina=0;
	$pos=$pagina*$rpp;
	$this->bd->setConsulta("select * from "
		.$this->nombreTabla.
		" $condicion $orderby limit $pos, $rpp");
	$respuesta = [];
	while($fila = $this->bd->getFila()){
		$obj = new Raspberry();
		$obj->set($fila);
		$respuesta[] = $obj;
	}
	return $respuesta;
}

function getAllRaspberry($condicion="", $orderby="order by id"){ 
	$this->bd->setConsulta("select rasp.* from "
		.$this->nombreTabla.
		" rasp join rel_user_raspberry rel on rasp.id=rel.id_raspberry $condicion $orderby");
	$respuesta = [];
	while($fila = $this->bd->getFila()){
		$obj = new Raspberry();
		$obj->set($fila);
		$respuesta[] = $obj;
	}
	return $respuesta;
}

function getRaspberryAjax($pagina=0, $rpp=10, $condicion="", $orderby="order by id"){
	$paginas = $this->getPaginas($pagina, $rpp, $condicion);
	$arrayRaspberry = $this->getRaspberry($paginas[4], $rpp, $condicion, $orderby);
	$resultado = '{"pagina":"'.$paginas[4].'","response":[';
	foreach ($arrayRaspberry as $clave => $raspberry) {
		$resultado.=$raspberry->getJSON();
	}
	$resultado = substr($resultado, 0, strlen($resultado)-1);
	$resultado .= ']}';
	return $resultado;
}

function getAllRaspberryAjax($condicion="", $orderby="order by id"){
	$arrayRaspberry = $this->getAllRaspberry($condicion, $orderby);
	$resultado = '{"response":[';
	foreach ($arrayRaspberry as $clave => $raspberry) {
		$resultado.=$raspberry->getJSON();
	}
	if(count($arrayRaspberry)>0){
		$resultado = substr($resultado, 0, strlen($resultado)-1);
	}
	$resultado .= ']}';
	return $resultado;
}

function delete($id) {
	$sql = "delete from " . $this->nombreTabla . " where id='$id'";
	$this->bd->setConsulta($sql);
	return $this->bd->getNumeroFilasAfectadas();
}

function set(Raspberry $obj, $idold) {
	$sql = "update " . $this->nombreTabla . " set " .
		"nombre='" . $obj->getNombre() . "', " .
		"ip='" . $obj->getIp() . "' " .
		"where id='$idold' ";
	$this->bd->setConsulta($sql);
	return $this->bd->getNumeroFilasAfectadas();
}

function insert(Raspberry $obj) {
	$sql = "insert into " . $this->nombreTabla . " values(" .
		"'null', " .
		"'" . $obj->getNombre() . "', " .
		"'" . $obj->getIp() . "')";
	$this->bd->setConsulta($sql);
	return $this->bd->getAutonumerico();
}

function getPaginas($pagina=0, $rpp=10, $condicion=""){
	$numregs=$this->count($condicion);
	$paginas = ceil($numregs/$rpp)-1;
	$ant = $pagina-1;
	if($ant<0)
		$ant=0;
	$sig = $pagina+1;
	if($sig>=$paginas)
		$sig=$paginas;
	$resultado[0]=0;//primera
	$resultado[1]=$ant;//anterior
	$resultado[2]=$sig;//siguiente
	$resultado[3]=$paginas;//última
	if($pagina>$paginas)
		$pagina=$paginas;
	if($pagina<0)
		$pagina=0;
	$resultado[4]=$pagina;//actual
	return $resultado;
}
}
