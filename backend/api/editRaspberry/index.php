<?php
header('Content-Type: application/json');
function autocarga($clase) {
    include '../libs/'.$clase . '.php';
}
spl_autoload_register('autocarga');


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$name=$request->nombre;
$ip=$request->ip;
$id=$request->id;


if($name==null){
	echo '{"status":"fail","msg":"Campo nombre obligatorio"}';
}else if($ip==null){
	echo '{"status":"fail","msg":"Campo IP obligatorio"}';
}else if($id==null){
	echo '{"status":"fail","msg":"Campo ID obligatorio"}';
}else{
	$bd = new BaseDatos();
	$raspberry = new Raspberry(null, $name, $ip);
	$gestor = new GestionRaspberry($bd);
	$resultado=$gestor->set($raspberry, $id);

	if($resultado>=0){
		echo '{"status":"ok","msg":"Raspberry editada con éxito"}';
	}else{
		echo '{"status":"fail","msg":"Ocurrió un error"}';
	}
	
	$bd->closeConexion();
}

