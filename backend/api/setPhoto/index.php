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
	$rename=$user->getId();
	
	$subida=new Subir('photo');
	$subida->setNombre($rename);
	$subida->setDestino("../../media/");
	$subida->setSobrescribir();	
	$resultado=$subida->subir();

	if($resultado){
		$img = new SimpleImage("../../media/$resultado");
		$img->best_fit(200, 200)->save('../../media/'.$rename.'.jpg');
		echo '{"status":"ok","msg":"Foto subida con éxito","name":"'.$rename.'.jpg"}';
	}else{
		echo '{"status":"fail","msg":"Ocurrió un error"}';
	}

	$bd->closeConexion();
	
}else{
	echo '{"status":"fail","msg":"Fallo en las credenciales"}';
}

