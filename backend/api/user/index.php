<?php
header('Content-Type: application/json');
function autocarga($clase) {
    include '../libs/'.$clase . '.php';
}
spl_autoload_register('autocarga');

$headers=getallheaders();

if(isset($headers['Authorization'])){
	$token=$headers['Authorization'];

	$bd = new BaseDatos();
	$gestor = new GestionUser($bd);
	$obj=$gestor->getbyToken($token);
	$bd->closeConexion();
	
	echo '{"status":"ok","msg":"Datos de usuario","user":'.$obj->getJSON().'}';
}else{
	echo '{"status":"fail","msg":"Fallo en las credenciales"}';
}
