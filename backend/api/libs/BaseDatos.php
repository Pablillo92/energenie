<?php

class BaseDatos {

    private $conexion;
    private $resultado;
    private $sentencia;

    //constructor

    function __construct() {
        $this->conexion = new mysqli(Constantes::$servidor, Constantes::$usuario, Constantes::$clave, Constantes::$baseDatos);
        $this->conexion->set_charset("utf8");
    }

    //métodos privados

    private function asociaParametros($arrayParametros) {
        call_user_func_array(array($this->sentencia, "bind_param"), BaseDatos::referencia($arrayParametros));
    }

    private function ejecutaConsulta() {
        $this->sentencia->execute();
    }
    
    private function ejecutaConsultaResult() {
        $this->sentencia->execute();
		$meta = $this->sentencia->result_metadata();

        // This is the tricky bit dynamically creating an array of variables to use
        // to bind the results
        while ($field = $meta->fetch_field()) { 
            $var = $field->name; 
            $$var = null; 
            $fields[$var] = &$$var;
        }

        // Bind Results
        call_user_func_array(array($this->sentencia,'bind_result'),$fields);

        $results = array();
        // Fetch Results
        $i = 0;
        while ($this->sentencia->fetch()) {
            $results[$i] = array();
            $j=0;
            foreach($fields as $k => $v){
                $results[$i][$j] = $v;
                $j++;
            }
            $i++;
        }
        $this->resultado = $results;
    }

    private function prepareConsulta($consulta) {
        $this->sentencia = $this->conexion->prepare($consulta);
    }

    private static function referencia($arrayParametros) {
        $referencia = [];
        foreach ($arrayParametros as $indice => $valor) {
            $referencia[$indice] = &$arrayParametros[$indice];
        }
        return $referencia;
    }

    //métodos públicos

    function closeConexion() {
        $this->conexion->close();
    }
    
    function limpiar($str){
        return $this->conexion->real_escape_string($str);
    }

    function getAutonumerico() {
        return $this->conexion->insert_id;
    }

    function getFila() {
        return $this->resultado->fetch_array();
    }
    
    function getFilaPreparada(){
		return $this->resultado;
	}

    function getNumeroFilasAfectadas() {
        return $this->conexion->affected_rows;
    }

    function getNumeroFilasConsulta() {
        return $this->resultado->num_rows;
    }

    function getNumeroFilasConsultaPreparada() {
        return $this->sentencia->affected_rows;
    }

    function setBaseDatos($baseDatos) {
        return $this->conexion->select_db($baseDatos);
    }

    function setConexion($servidor, $usuario, $clave, $baseDatos) {
        if ($this->conexion = new mysqli($servidor, $usuario, $clave, $baseDatos)) {
            $this->conexion->set_charset("utf8");
            return true;
        }
        return false;
    }

    function setConsulta($consulta) {
        return $this->resultado = $this->conexion->query($consulta);
    }

    function setConsultaPreparada($consulta, $arrayParametros) {
        $this->prepareConsulta($consulta);
        $this->asociaParametros($arrayParametros);
        $this->ejecutaConsulta();
    }
    
    function setConsultaPreparadaResult($consulta, $arrayParametros) {
        $this->prepareConsulta($consulta);
        $this->asociaParametros($arrayParametros);
        $this->ejecutaConsultaResult();
    }

}
