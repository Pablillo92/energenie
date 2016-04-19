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
$ip=$request->ip;

if(isset($headers['Authorization'])){
	$token=$headers['Authorization'];

	if($name==null){
		echo '{"status":"fail","msg":"Campo nombre obligatorio"}';
	}else if($ip==null){
		echo '{"status":"fail","msg":"Campo IP obligatorio"}';
	}else{
		$bd = new BaseDatos();
		$obj = new Raspberry(null, $name, $ip);
		$gestor = new GestionRaspberry($bd);	
		$resultado=$gestor->insert($obj);
		
		if($resultado>0){
			$gestor = new GestionUser($bd);
			$user=$gestor->getbyToken($token);
	
			$rel= new Rel_user_raspberry($user->getId(), $resultado);
			$gestor = new GestionRel_user_raspberry($bd);
			$resultadoRel=$gestor->insert($rel);
			if($resultadoRel>0){
				echo '{"status":"ok","msg":"Raspberry creada con éxito","id":"'.$resultado.'"}';
			}else{
				echo '{"status":"fail","msg":"Ocurrió un error"}';
			}
		}else{
			echo '{"status":"fail","msg":"Ocurrió un error"}';
		}
		$bd->closeConexion();
	}
}else{
	echo '{"status":"fail","msg":"Fallo en las credenciales"}';
}
