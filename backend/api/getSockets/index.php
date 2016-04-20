<?php
header('Content-Type: application/json');
function autocarga($clase) {
    include '../libs/'.$clase . '.php';
}
spl_autoload_register('autocarga');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id=$request->id;

if($id!=null){

	$bd = new BaseDatos();
	$gestor = new GestionSocket($bd);
	$resultado=$gestor->getAllSocketAjax("where id_raspberry='".$id."'");
				
	$bd->closeConexion();
	
	echo $resultado;
	
}else{
	echo '{"status":"fail","msg":"Fallo al no encontrar identificador de raspberry"}';
}
