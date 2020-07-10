<?php 
include("configuracion.php");
header("Access-Control-Allow-Origin: *");
/*
function cargar_foto($f){
	$temp=$_FILES[$f]['tmp_name'];
	if($ban==0){
			mkdir("../clientes/".$_POST['emp']."/asistencias/$titulo/fotos");
			$ban=1;
	}
			move_uploaded_file($temp, "../clientes/".$_POST['emp']."/asistencias/$titulo/fotos/$f.jpg"); 
			$name="../clientes/".$_POST['emp']."/asistencia/$titulo/fotos/$f-mini.jpg";
			header('Content-Type: image/jpeg');
			$img=imagecreatefromjpeg("../clientes/".$_POST['emp']."asistencia/$titulo/fotos/$titulo.jpg");
			$alto = imagesy($img);
			$ancho = imagesx($img);
			$alto_n = 250;
			$ancho_n = round($alto_n*$ancho/$alto);	
			$duplicado = imagecreatetruecolor($ancho_n, $alto_n);
			imagecopyresampled( $duplicado, $img, 0,0,0,0, $ancho_n, $alto_n, $ancho, $alto );
			imagejpeg($duplicado,$name,100);
			imagedestroy($duplicado);
			imagedestroy($img);
}*/
if(isset($_POST['emp'])){
			$archivo = @file_get_contents("../clientes/".$_POST['emp']."/asistencias/asistencias.json");
			$acarpeta = json_decode($archivo);
			$acarpeta[]= $_POST;
		
		$asistencia = json_encode($acarpeta);
		file_put_contents("../clientes/".$_POST['emp']."/asistencias/asistencias.json", $asistencia);
echo "OK";
}
else{
	echo "Error";
}
		
		/*$acarpeta[$i]=$_POST['fecha'];
		$i++;
		if(isset($_POST['descripcion'])){
			$acarpeta[$i]=$_POST['descripcion'];
			$i++;			
		}
		if(isset($_POST['solicitar'])){
			$acarpeta[$i]="Solicitar muestra";
			$i++;			
		}
		if(isset($_POST['entregar'])){
			$acarpeta[$i]="Entregar muestra";
			$i++;			
		}
		if(isset($_POST['ensayar'])){
			$acarpeta[$i]="Ensayar materiales";
			$i++;			
		}
		if(isset($_POST['recomendacion'])){
			$acarpeta[$i]="Recomendación de pegado";
			$i++;			
		}
		if(isset($_POST['contactar'])){
			$acarpeta[$i]="Contactar cliente";
		}*/
		
		
		
		
		
		
		/*if($_FILES['foto1']['name']){
			cargar_foto('foto1');
		}
		if($_FILES['foto2']['name']){
			cargar_foto('foto2');
		}
		if($_FILES['foto3']['name']){
			cargar_foto('foto3');
		}*/
		
	

?>