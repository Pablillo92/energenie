<?php
header('Content-Type: application/json');
function autocarga($clase) {
    include '../libs/'.$clase . '.php';
}
spl_autoload_register('autocarga');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email=$request->email;
$pass=$request->password;

if($email==null){
	echo '{"status":"fail","msg":"El campo E-mail es obligatorio"}';
}else if($pass==null){
	echo '{"status":"fail","msg":"El campo contraseña es obligatorio"}';
}else{
	$bd = new BaseDatos();
	$gestor = new GestionUser($bd);
	$obj=$gestor->get($email);
	$bd->closeConexion();
	if(sha1($pass)==$obj->getPass()){
		$token=base64_encode(sha1("energenie").$obj->getId());
		echo '{"status":"ok","msg":"Inicio de sesión correcto","token":"'.$token.'"}';
	}else{
		echo '{"status":"fail","msg":"Usuario o contraseñas incorrectos"}';
	}
}

