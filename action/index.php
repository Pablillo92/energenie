<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$headers=getallheaders();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$socket=$request->socket;
$active=$request->active;


if(isset($headers['Authorization'])){
	
	if($socket==null){
		echo '{"status":"fail","msg":"El campo socket es obligatorio"}';
	}else{
		$s="off";
		if($active==1){
			$s="on";
		}
		
		exec("sudo ../script/s".$socket.$s,$respuesta);	
		echo '{"status":"ok","msg":"Acción enviada al socket","response":"'.$respuesta[0].'"}';
	}
}else{
	echo '{"status":"fail","msg":"Fallo en las credenciales"}';
}
?>
