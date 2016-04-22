<?php
header('Content-Type: application/json');
function autocarga($clase) {
    include '../libs/'.$clase . '.php';
}
spl_autoload_register('autocarga');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email=$request->email;
$raspberry=$request->raspberry;

if($email==null){
	echo '{"status":"fail","msg":"El campo E-mail es obligatorio"}';
}else if($raspberry==null){
	echo '{"status":"fail","msg":"El campo raspberry es obligatorio"}';
}else{
	$bd = new BaseDatos();
	$gestor = new GestionUser($bd);
	$user=$gestor->get($email);
	
	$rel= new Rel_user_raspberry($user->getId(), $raspberry);
	$gestor = new GestionRel_user_raspberry($bd);
	$resultado=$gestor->insert($rel);
	
	$bd->closeConexion();
	if($resultado>0){
		echo '{"status":"ok","msg":"Usuario vinculado con éxito","user":'.$user->getJSON().'}';
	}else{
		echo '{"status":"fail","msg":"El usuario '.$email.' no existe"}';
	}
}

