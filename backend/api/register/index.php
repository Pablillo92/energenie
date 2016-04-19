<?php
header('Content-Type: application/json');
function autocarga($clase) {
    include '../libs/'.$clase . '.php';
}
spl_autoload_register('autocarga');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email=$request->email;
$name=$request->name;
$pass=$request->password;

if($email==null){
	echo '{"status":"fail","msg":"El campo E-mail es obligatorio"}';
}else if($name==null){
	echo '{"status":"fail","msg":"El campo nombre es obligatorio"}';
}else if($pass==null){
	echo '{"status":"fail","msg":"El campo contraseña es obligatorio"}';
}else{
	$bd = new BaseDatos();
	$obj = new User(null, $email, sha1($pass), $name);
	$gestor = new GestionUser($bd);
	$resultado=$gestor->insert($obj);
	$bd->closeConexion();
	if($resultado==1){
		echo '{"status":"ok","msg":"Usuario registrado con éxito"}';
	}else{
		echo '{"status":"fail","msg":"Este usuario ya existe"}';
	}
}
/*error_reporting(E_ALL);
ini_set('display_errors', 1);*/
