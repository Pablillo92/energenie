<?php
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
		
		$respuesta=exec("sudo ../script/s".$socket.$s);		
		echo '{"status":"ok","msg":"Acción enviada al socket","response":"'.$respuesta.'"}';
	}
}else{
	echo '{"status":"fail","msg":"Fallo en las credenciales"}';
}
?>
