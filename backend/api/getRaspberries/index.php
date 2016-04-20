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
	$user=$gestor->getbyToken($token);
	$iduser=$user->getId();
	$gestor = new GestionRaspberry($bd);
	$resultado=$gestor->getAllRaspberryAjax("where rel.id_user='".$iduser."'","order by rasp.id");
				
	$bd->closeConexion();
	
	echo $resultado;
	
}else{
	echo '{"status":"fail","msg":"Fallo en las credenciales"}';
}
