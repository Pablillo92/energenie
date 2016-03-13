<?php
	$r=0;
	$respuesta=exec("sudo script/s1on");
	
	if($respuesta=="send LEGACY message:	Socket 1 ON "){
			$r=1;
	}
	echo "{'r':'$r'}";
?>
