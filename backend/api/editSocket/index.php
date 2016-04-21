<?php
header('Content-Type: application/json');
function autocarga($clase) {
    include '../libs/'.$clase . '.php';
}
spl_autoload_register('autocarga');


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id_raspberry=$request->id_raspberry;
$name=$request->nombre;
$id=$request->id;
$state=$request->state;
$active=$request->active;
$rel=$request->rel;


if($name==null){
	echo '{"status":"fail","msg":"Campo nombre obligatorio"}';
}else if($id_raspberry==null){
	echo '{"status":"fail","msg":"Campo raspberry obligatorio"}';
}else if($id==null){
	echo '{"status":"fail","msg":"Campo ID obligatorio"}';
}else if($state==null){
	echo '{"status":"fail","msg":"Campo estado obligatorio"}';
}else if($active==null){
	echo '{"status":"fail","msg":"Campo modo obligatorio"}';
}else if($rel==null){
	echo '{"status":"fail","msg":"Campo socket obligatorio"}';
}else{
	$bd = new BaseDatos();
	$socket = new Socket(null, $id_raspberry, $name, $state, $active, $rel);
	$gestor = new GestionSocket($bd);
	$resultado=$gestor->set($socket, $id);

	if($resultado>=0){
		echo '{"status":"ok","msg":"Socket editado con éxito"}';
	}else{
		echo '{"status":"fail","msg":"Ocurrió un error"}';
	}
	
	$bd->closeConexion();
}

