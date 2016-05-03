<?php
/*
if($_SERVER["HTTP_X_FORWARDED_FOR"]) { 
    if($pos=strpos($_SERVER["HTTP_X_FORWARDED_FOR"]," ")) 
    { 
        echo "IP local: ".substr($_SERVER["HTTP_X_FORWARDED_FOR"],0,$pos)." - IP Pública: ".substr($_SERVER["HTTP_X_FORWARDED_FOR"],$pos+1); 
        $hostlocal=substr($_SERVER["HTTP_X_FORWARDED_FOR"],$pos+1); 
    }else{ 
        echo "&ippublica=".$_SERVER["HTTP_X_FORWARDED_FOR"]; 
        $hostlocal=$_SERVER["HTTP_X_FORWARDED_FOR"]; 
    } 
  
}else{ 
    echo "&ippublica=".$_SERVER["REMOTE_ADDR"]; 
} 


   if(isset($_SERVER['HTTP_X_FORWARDED_FOR'])) { 
	   $ip = $_SERVER['HTTP_X_FORWARDED_FOR']; 
   }elseif(isset($_SERVER['HTTP_VIA'])) { 
	   $ip = $_SERVER['HTTP_VIA']; 
   }   
   elseif(isset($_SERVER['REMOTE_ADDR'])){
	   $ip = $_SERVER['REMOTE_ADDR'];
   } 
   else{
	   $ip = "Desconocido";
   } 
   echo "&ip=" . $ip ; 
*/
$postdata = http_build_query(
    array(
        'id' => '13',
        'ip' => '192.168.1.135'
    )
);

$opts = array('http' =>
    array(
        'method'  => 'POST',
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => $postdata
    )
);

$context = stream_context_create($opts);

$result = file_get_contents('http://pablo.x10host.com/api/api/reloadRaspberry/', false, $context);

echo $result;

?>
