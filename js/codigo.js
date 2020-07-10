var MyApp = angular.module('MyApp', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures',
  'ngMdIcons'
]);

MyApp.run(function($transform) {
  window.$transform = $transform;
});

var n;

function modal(v){
			var div=document.createElement("div");
			div.className="modal";
			var di=document.createElement("div");
			di.className="modal-backdrop in";
			div.appendChild(di);
			var di=document.createElement("div");
			di.className="modal-dialog";
			div.appendChild(di);
			var d=document.createElement("div");
			d.className="modal-content";
			di.appendChild(d);
			var x=document.createElement("a");
			x.href="javascript:void(0);";
			var txt=document.createTextNode("x");
			x.appendChild(txt);
			x.className="close";
			x.style.color="red";
			x.href='#empresas';
			x.onclick=function(){
				document.getElementsByTagName("body")[0].removeChild(div);
			}
			var h4=document.createElement("h4");
			if(v=='e'){
				var txt=document.createTextNode("Ups!! Se ha producido un error!");
			}
			else{
				var txt=document.createTextNode("Operación realizada con éxito");
			}
			h4.className="modal-header";
			h4.style.textAlign='center';
			h4.appendChild(txt);
			var body=document.createElement("div");
			body.appendChild(x);
			body.appendChild(h4);
			body.className="modal-body";
			d.appendChild(body);
			document.getElementsByTagName("body")[0].appendChild(div);
}

MyApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			redirectTo: '/empresas'
		})
		.when('/nuevo', {
			templateUrl : 'html/nuevo.html'
		})
		.when('/empresas', {
			templateUrl : 'html/empresas.html',
			controller 	: 'empresasCtrl'
		})
		.when('/empresa', {
			templateUrl : 'html/empresa.html',
			controller 	: 'empresaCtrl'
		})
		.when('/info', {
			templateUrl : 'html/info.html',
			controller 	: 'infoCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});

MyApp.controller("infoCtrl", function ($scope, $http) { 
	$scope.message = "Fenoclor S.R.L";
	$scope.message2 ="Sector: Soporte Tecnico ";
	$scope.message3 = "Desarrollo: Iara Nizza";
	$http.get("http://everydapp.esy.es/php_/contenido.php")
	.success(function (data) {
			localStorage.setItem("cont", angular.toJson(data))
			$scope.mostrar = angular.fromJson(data); 
			$scope.rta="Contenido online";
	})
	.error (function (data) {
		$scope.datos_local = localStorage.getItem("cont");
			if ($scope.datos_local != "undefined" && $scope.datos_local != null){
				$scope.datolocal = JSON.parse($scope.datos_local);
				$scope.rta = "No hay conexión";
			}else{
				$scope.rta ="No hay contenido";
			}
	});
}); 
  

MyApp.controller("formCtrl", function ($scope, $http){
$scope.submit = function (usuario){
		if(!window.localStorage.getItem("la_empresa")){
			$scope.misdts=[];
		}
		else{
			$scope.misdts = localStorage.getItem("la_empresa"); 
			$scope.misdts = JSON.parse($scope.misdts); 
		}
		 var datos={
			empresa : usuario.empresa,
			direccion : usuario.direccion,
			localidad : usuario.localidad,
			nombre : usuario.nombre,
			tel1 : usuario.tel1,
			tel2 : usuario.tel2,
			tel3 : usuario.tel3,
			email : usuario.email,
			comentarios : usuario.comentarios
		}; 
		$scope.misdts.push(datos); 
		localStorage.setItem("la_empresa", JSON.stringify($scope.misdts)); 
	var item = [];
	for(var i in usuario){
		item.push( i+'='+usuario[i] ); 
	}
	var union = item.join('&');	
	var ajax = new XMLHttpRequest( );
			ajax.open( 'POST', 'php/submit.php', true);
			ajax.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
			ajax.send( union );
			ajax.onreadystatechange = function(){
				if( ajax.readyState == 4 ){
					if(ajax.status!=200){
						modal("e");
					}
					else{
						modal("o");
						var inputs=document.getElementsByTagName("form")[0].getElementsByTagName("input");
						for(var i=0;i<inputs.length;i++){
							inputs[i].value='';
						}
					}
				}
			}
}
});

MyApp.controller("empresasCtrl", function ($scope,$http){
   var ajax= $http.get('json/clientes.json')
   .success(function (data){
		localStorage.setItem("datos", angular.toJson(data)); 
        $scope.scrollItems = angular.fromJson(data); 
	})
	.error(function(){
		modal("e");
	});
	$scope.cargar=function(){
		n=this.item.empresa;
		var a= $http.get('clientes/'+this.item.empresa+'/'+this.item.empresa+'.json')
		.success(function(data){
			var aj= $http.get('html/empresa.html');
		})
		.error(function(){
			modal("e");
		});
	}
});
	
MyApp.controller("empresaCtrl", function ($scope,$http){
	$scope.tit=n;
	var ajax= $http.get('clientes/'+$scope.tit+'/'+$scope.tit+'.json')
    .success(function (data){
		localStorage.setItem("datos", angular.toJson(data)); 
        $scope.listaInfo = angular.fromJson(data);
		$scope.listaInfo=$scope.listaInfo[0];
	})
	.error(function(){
		modal("e");
	});
	var ajax2= $http.get('clientes/'+$scope.tit+'/asistencias/asistencias.json')
	.success(function(data){
		localStorage.setItem("datos2", angular.toJson(data)); 
        $scope.listaAsist = angular.fromJson(data);
		for(var k=0;k<$scope.listaAsist.length;k++){
			$scope.listaAsist[k].largo=k+1;
		}
		$scope.minilista=function(){
			var array=this.i;
			var minilist=[];
				for(k in array){
						if(k=='solicitar'){
							minilist.push("Solicitar muestra");
						}
						else if(k=='entregar'){
							minilist.push("Entregar muestra");
						}
						else if(k=='ensayar'){
							minilist.push("Ensayar materiales");
						}
						else if(k=='recomendacion'){
							minilist.push("Recomendación de pegado");
						}
						else if(k=='contactar'){
							minilist.push("Contactar cliente");
						}
					
				}
				$scope.mini=minilist;
		}
		
	})
	.error(function(){
		var box=document.getElementById("acordion");
		box.innerHTML='';
		var pre=document.createElement("pre");
		pre.style.paddingBottom="2em";
		pre.style.fontSize="1.1em";
		var txt=document.createTextNode("No se han realizado asistencias");
		pre.appendChild(txt);
		box.appendChild(pre);
	});
	$scope.submit_soporte = function (asistencia){
		if(!window.localStorage.getItem("asistencia")){
			$scope.asist=[];
		}
		else{
			$scope.asist = localStorage.getItem("asistencia"); 
			$scope.asist = JSON.parse($scope.asist); 
		}
		var datos={
			fecha : asistencia.fecha,
			descripcion : asistencia.descripcion,
			solicitar : asistencia.solicitar,
			entregar : asistencia.entregar,
			ensayar : asistencia.ensayar,
			recomendacion : asistencia.recomendacion,
			contactar : asistencia.contactar
		}; 
		$scope.asist.push(datos); 
		localStorage.setItem("asistencia", JSON.stringify($scope.asist)); 
	var item = [];
	for(var i in asistencia){
		if(asistencia[i]!=false){
			item.push( i+'='+asistencia[i] ); 
		}
	}
	item.push('emp='+n ); 
	var union = item.join('&');	
	var ajax = new XMLHttpRequest( );
			ajax.open( 'POST', 'php/submitSoporte.php', true);
			ajax.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
			ajax.send( union );
			ajax.onreadystatechange = function(){
				if( ajax.readyState == 4 ){
					if(n==undefined){
						modal("e");
					}
					if(ajax.status==200){
						modal("o");
						var inputs=document.getElementsByTagName("form")[0].getElementsByTagName("input");
						for(var i=0;i<inputs.length;i++){
							inputs[i].value='';
						}
					}
					else{
						modal("e");
					}
				}
			}
}

});