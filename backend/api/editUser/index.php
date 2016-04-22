<?php
header('Content-Type: application/json');
function autocarga($clase) {
    include '../libs/'.$clase . '.php';
}
spl_autoload_register('autocarga');

$headers=getallheaders();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$name=$request->name;
$email=$request->email;
$id=$request->id;


if(isset($headers['Authorization'])){
	$token=$headers['Authorization'];

	if($name==null){
		echo '{"status":"fail","msg":"Campo nombre obligatorio"}';
	}else if($email==null){
		echo '{"status":"fail","msg":"Campo email obligatorio"}';
	}else if($id==null){
		echo '{"status":"fail","msg":"Campo ID obligatorio"}';
	}else{
		$bd = new BaseDatos();
		$user = new User(null, $email, null, $name);
		$gestor = new GestionUser($bd);
		$resultado=$gestor->set($user, $id);

		if($resultado>=0){
			echo '{"status":"ok","msg":"Usuario editado con éxito"}';
		}else{
			echo '{"status":"fail","msg":"Ocurrió un error"}';
		}
		
		$bd->closeConexion();
	}

}else{
	echo '{"status":"fail","msg":"Fallo en las credenciales"}';
}


