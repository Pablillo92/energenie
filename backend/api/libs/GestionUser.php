<?php 
	class GestionUser {
 private $bd = null;
 private $nombreTabla = user;

function __construct(BaseDatos $bd) {
	$this->bd = $bd;
}

function count($condicion = "") {
	$this->bd->setConsulta("select count(*) from " . $this->nombreTabla . " $condicion");
	$fila = $this->bd->getFila();
	return $fila[0];
}

function exist($email) {
	$this->bd->setConsulta("select count(*) from " . $this->nombreTabla . " where email='$email' ");
	$fila = $this->bd->getFila();
	return $fila[0] > 0; 
}

function get($email) {
	$this->bd->setConsulta("select * from " . $this->nombreTabla . " where email='$email'");
	$fila = $this->bd->getFila();
	$obj = new User();
	$obj->set($fila);
	return $obj;
}

function getbyToken($token) {
	$token=base64_decode(trim(str_replace("Token", "", $token)));
	$id=str_replace(sha1("energenie"), "", $token);
	$this->bd->setConsulta("select * from " . $this->nombreTabla . " where id='$id'");
	$fila = $this->bd->getFila();
	$obj = new User();
	$obj->set($fila);
	return $obj;
}

function getUser($pagina=0, $rpp=10, $condicion="", $orderby="order by id"){
	if(!is_numeric($pagina))
		$pagina=0;
	$pos=$pagina*$rpp;
	$this->bd->setConsulta("select * from "
		.$this->nombreTabla.
		" $condicion $orderby limit $pos, $rpp");
	$respuesta = [];
	while($fila = $this->bd->getFila()){
		$obj = new User();
		$obj->set($fila);
		$respuesta[] = $obj;
	}
	return $respuesta;
}

function getAllUser($condicion="", $orderby="order by id"){
	$this->bd->setConsulta("select * from "
		.$this->nombreTabla.
		" $condicion $orderby");
	$respuesta = [];
	while($fila = $this->bd->getFila()){
		$obj = new User();
		$obj->set($fila);
		$respuesta[] = $obj;
	}
	return $respuesta;
}

function getUserAjax($pagina=0, $rpp=10, $condicion="", $orderby="order by id"){
	$paginas = $this->getPaginas($pagina, $rpp, $condicion);
	$arrayUser = $this->getUser($paginas[4], $rpp, $condicion, $orderby);
	$resultado = '{"pagina":"'.$paginas[4].'","respuesta":[';
	foreach ($arrayUser as $clave => $user) {
		$resultado.=$user->getJSON();
	}
	$resultado = substr($resultado, 0, strlen($resultado)-1);
	$resultado .= ']}';
	return $resultado;
}

function getAllUserAjax($condicion="", $orderby="order by id"){
	$arrayUser = $this->getAllUser($condicion, $orderby);
	$resultado = '{"respuesta":[';
	foreach ($arrayUser as $clave => $user) {
		$resultado.=$user->getJSON();
	}
	if(count($arrayUser)>0){
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

function set(User $obj, $idold) {
	$sql = "update " . $this->nombreTabla . " set " .
		"email='" . $obj->getEmail() . "' " .
		"pass='" . $obj->getPass() . "' " .
		"name='" . $obj->getName() . "' " .
		"where id='$idold' ";
	$this->bd->setConsulta($sql);
	return $this->bd->getNumeroFilasAfectadas();
}

function insert(User $obj) {
	$sql = "insert into " . $this->nombreTabla . " values(" .
		"'null', " .
		"'" . $obj->getEmail() . "', " .
		"'" . $obj->getPass() . "', " .
		"'" . $obj->getName() . "')";
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
