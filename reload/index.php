<?php


$postdata = http_build_query(
    array(
        'id' => '13'
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
