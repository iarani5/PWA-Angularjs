<?php 
include("configuracion.php");
header("Access-Control-Allow-Origin: *");
if(isset($_POST['empresa'])){
		$archivo = @file_get_contents("../json/clientes.json");
		$contenido = json_decode($archivo);
		$contenido[]= $_POST;
		$acarpeta[]=$_POST;
		$cliente = json_encode($acarpeta);
		$data = json_encode($contenido);
		mkdir("../clientes/".$_POST['empresa']);
		mkdir("../clientes/".$_POST['empresa']."/asistencias");
		file_put_contents("../clientes/".$_POST['empresa']."/".$_POST['empresa'].".json", $cliente);
		file_put_contents("../json/clientes.json", $data);
		echo "OK";
}
else{
	echo "Error";
}

?>