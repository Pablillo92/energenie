<?php 
	class GestionRel_user_raspberry {
 private $bd = null;
 private $nombreTabla = rel_user_raspberry;

function __construct(BaseDatos $bd) {
	$this->bd = $bd;
}

function count($condicion = "") {
	$this->bd->setConsulta("select count(*) from " . $this->nombreTabla . " $condicion");
	$fila = $this->bd->getFila();
	return $fila[0];
}

function exist($id) {
	$this->bd->setConsulta("select count(*) from " . $this->nombreTabla . " where id_user='$id' ");
	$fila = $this->bd->getFila();
	return $fila[0] > 0; 
}

function get($id) {
	$this->bd->setConsulta("select * from " . $this->nombreTabla . " where id_user='$id'");
	$fila = $this->bd->getFila();
	$obj = new Rel_user_raspberry();
	$obj->set($fila);
	return $obj;
}

function getRel_user_raspberry($pagina=0, $rpp=10, $condicion="", $orderby="order by id_user"){
	if(!is_numeric($pagina))
		$pagina=0;
	$pos=$pagina*$rpp;
	$this->bd->setConsulta("select * from "
		.$this->nombreTabla.
		" $condicion $orderby limit $pos, $rpp");
	$respuesta = [];
	while($fila = $this->bd->getFila()){
		$obj = new Rel_user_raspberry();
		$obj->set($fila);
		$respuesta[] = $obj;
	}
	return $respuesta;
}

function getAllRel_user_raspberry($condicion="", $orderby="order by id_user"){
	$this->bd->setConsulta("select * from "
		.$this->nombreTabla.
		" $condicion $orderby");
	$respuesta = [];
	while($fila = $this->bd->getFila()){
		$obj = new Rel_user_raspberry();
		$obj->set($fila);
		$respuesta[] = $obj;
	}
	return $respuesta;
}

function getRel_user_raspberryAjax($pagina=0, $rpp=10, $condicion="", $orderby="order by id_user"){
	$paginas = $this->getPaginas($pagina, $rpp, $condicion);
	$arrayRel_user_raspberry = $this->getRel_user_raspberry($paginas[4], $rpp, $condicion, $orderby);
	$resultado = '{"pagina":"'.$paginas[4].'","respuesta":[';
	foreach ($arrayRel_user_raspberry as $clave => $rel_user_raspberry) {
		$resultado.=$rel_user_raspberry->getJSON();
	}
	$resultado = substr($resultado, 0, strlen($resultado)-1);
	$resultado .= ']}';
	return $resultado;
}

function getAllRel_user_raspberryAjax($condicion="", $orderby="order by id_user"){
	$arrayRel_user_raspberry = $this->getAllRel_user_raspberry($condicion, $orderby);
	$resultado = '{"respuesta":[';
	foreach ($arrayRel_user_raspberry as $clave => $rel_user_raspberry) {
		$resultado.=$rel_user_raspberry->getJSON();
	}
	if(count($arrayRel_user_raspberry)>0){
		$resultado = substr($resultado, 0, strlen($resultado)-1);
	}
	$resultado .= ']}';
	return $resultado;
}

function delete($id) {
	$sql = "delete from " . $this->nombreTabla . " where id_user='$id'";
	$this->bd->setConsulta($sql);
	return $this->bd->getNumeroFilasAfectadas();
}

function set(Rel_user_raspberry $obj, $idold) {
	$sql = "update " . $this->nombreTabla . " set " .
		"id_raspberry='" . $obj->getId_raspberry() . "' " .
		"where id_user='$idold' ";
	$this->bd->setConsulta($sql);
	return $this->bd->getNumeroFilasAfectadas();
}

function insert(Rel_user_raspberry $obj) {
	$sql = "insert into " . $this->nombreTabla . " values(" .
		"'" . $obj->getId_user() . "', " .
		"'" . $obj->getId_raspberry() . "')";
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
