<?php
header('Content-Type: application/json');
function autocarga($clase) {
    include '../libs/'.$clase . '.php';
}
spl_autoload_register('autocarga');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$name=$request->nombre;
$rel=$request->rel;
$raspberry=$request->raspberry;

if($name==null){
	echo '{"status":"fail","msg":"Campo nombre obligatorio"}';
}else if($rel==null){
	echo '{"status":"fail","msg":"Campo Nº de socket obligatorio"}';
}else if($raspberry==null){
	echo '{"status":"fail","msg":"Campo rasbperry obligatorio"}';
}else{
	$bd = new BaseDatos();
	$obj = new Socket(null, $raspberry, $name, 0, 0, $rel);
	$gestor = new GestionSocket($bd);	
	$resultado=$gestor->insert($obj);
	
	if($resultado>0){
		echo '{"status":"ok","msg":"Socket creado con éxito","id":"'.$resultado.'"}';
	}else{
		echo '{"status":"fail","msg":"Ocurrió un error"}';
	}
	
	$bd->closeConexion();
}

