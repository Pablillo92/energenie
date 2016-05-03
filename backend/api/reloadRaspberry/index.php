<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
function autocarga($clase) {
    include '../libs/'.$clase . '.php';
}
spl_autoload_register('autocarga');


$ip=$_POST['ip'];
$id=$_POST['id'];


if($ip==null){
	echo '{"status":"fail","msg":"Campo IP obligatorio"}';
}else if($id==null){
	echo '{"status":"fail","msg":"Campo ID obligatorio"}';
}else{
	$bd = new BaseDatos();
	$gestor = new GestionRaspberry($bd);
	$resultado=$gestor->reload($ip, $id);

	if($resultado>=0){
		echo '{"status":"ok","msg":"Raspberry editada con éxito"}';
	}else{
		echo '{"status":"fail","msg":"Ocurrió un error"}';
	}
	
	$bd->closeConexion();
}

