<?php 
	class GestionSocket {
 private $bd = null;
 private $nombreTabla = socket;

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
	$obj = new Socket();
	$obj->set($fila);
	return $obj;
}

function getSocket($pagina=0, $rpp=10, $condicion="", $orderby="order by id"){
	if(!is_numeric($pagina))
		$pagina=0;
	$pos=$pagina*$rpp;
	$this->bd->setConsulta("select * from "
		.$this->nombreTabla.
		" $condicion $orderby limit $pos, $rpp");
	$respuesta = [];
	while($fila = $this->bd->getFila()){
		$obj = new Socket();
		$obj->set($fila);
		$respuesta[] = $obj;
	}
	return $respuesta;
}

function getAllSocket($condicion="", $orderby="order by id"){
	$this->bd->setConsulta("select * from "
		.$this->nombreTabla.
		" $condicion $orderby");
	$respuesta = [];
	while($fila = $this->bd->getFila()){
		$obj = new Socket();
		$obj->set($fila);
		$respuesta[] = $obj;
	}
	return $respuesta;
}

function getSocketAjax($pagina=0, $rpp=10, $condicion="", $orderby="order by id"){
	$paginas = $this->getPaginas($pagina, $rpp, $condicion);
	$arraySocket = $this->getSocket($paginas[4], $rpp, $condicion, $orderby);
	$resultado = '{"pagina":"'.$paginas[4].'","respuesta":[';
	foreach ($arraySocket as $clave => $socket) {
		$resultado.=$socket->getJSON();
	}
	$resultado = substr($resultado, 0, strlen($resultado)-1);
	$resultado .= ']}';
	return $resultado;
}

function getAllSocketAjax($condicion="", $orderby="order by id"){
	$arraySocket = $this->getAllSocket($condicion, $orderby);
	$resultado = '{"respuesta":[';
	foreach ($arraySocket as $clave => $socket) {
		$resultado.=$socket->getJSON();
	}
	if(count($arraySocket)>0){
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

function set(Socket $obj, $idold) {
	$sql = "update " . $this->nombreTabla . " set " .
		"id_raspberry='" . $obj->getId_raspberry() . "' " .
		"nombre='" . $obj->getNombre() . "' " .
		"state='" . $obj->getState() . "' " .
		"active='" . $obj->getActive() . "' " .
		"rel='" . $obj->getRel() . "' " .
		"where id='$idold' ";
	$this->bd->setConsulta($sql);
	return $this->bd->getNumeroFilasAfectadas();
}

function insert(Socket $obj) {
	$sql = "insert into " . $this->nombreTabla . " values(" .
		"'null', " .
		"'" . $obj->getId_raspberry() . "', " .
		"'" . $obj->getNombre() . "', " .
		"'" . $obj->getState() . "', " .
		"'" . $obj->getActive() . "', " .
		"'" . $obj->getRel() . "')";
	$this->bd->setConsulta($sql);
	return $this->bd->getNumeroFilasAfectadas();
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
