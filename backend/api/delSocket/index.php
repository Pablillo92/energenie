<?php
header('Content-Type: application/json');
function autocarga($clase) {
    include '../libs/'.$clase . '.php';
}
spl_autoload_register('autocarga');


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id=$request->id;


if($id==null){
	echo '{"status":"fail","msg":"Campo ID obligatorio"}';
}else{
	$bd = new BaseDatos();
	$gestor = new GestionSocket($bd);
	$resultado=$gestor->delete($id);

	if($resultado>0){
		echo '{"status":"ok","msg":"Socket eliminado con éxito"}';
	}else{
		echo '{"status":"fail","msg":"Ocurrió un error"}';
	}	
	$bd->closeConexion();
}

