(function(){
	var app = angular.module('apiParser', ['ngResource']);

	app.factory('EncuestaParser', ['$filter', function($filter){
		return {
			parseRequest: function(requestData){
				var fechaInicio = $filter('date')(new Date(), 'yyyy-MM-dd');
				var datos = {
					pass: requestData.pass,
					fechaInicio: fechaInicio,
					fechaFin: requestData.fecha
				};
				return angular.toJson(datos);
			},
			parseResponse: function(responseData){
				dataAux = angular.fromJson(responseData);
				var datos = {
					idEncuesta: dataAux.id_encuesta,
					pass: dataAux.pass,
					fechaInicio: dataAux.fecha_inicio,
					fechaFin: dataAux.fecha_fin						
				};
				return datos;
			}
		}
	}]);

	app.factory('UsuarioParser', function(){
		return {
			parseRequest: function(requestData){
				console.log("tales tales", requestData);
				var datos = {
					idUsuario: requestData.idUsuario,
					generadoEn: requestData.generadoEn,
					nombreUsuario: requestData.nombreUsuario,
					email: requestData.email,
					ip: requestData.ip
				};
				return angular.toJson(datos);
			},
			parseResponse: function(responseData){
				dataAux = angular.fromJson(responseData);
				var datos = {
					idUsuario: dataAux.id_usuario,
					generadoEn: dataAux.generado_en,
					nombreUsuario: dataAux.nombre_usuario,
					email: dataAux.email,
					ip: dataAux.ip					
				};
				return datos;
			}
		}
	});

	app.factory('PreguntasParser', ['PreguntaParser', function(PreguntaParser){
		return {
			parseResponse: function(responseData){
				var preguntasJS = angular.fromJson(responseData);
				var preguntas = [];
				for (var i = preguntasJS.length - 1; i >= 0; i--) {
					preguntas.push(PreguntaParser.parseResponse(angular.toJson(preguntasJS[i])));
				};
				return preguntas;
			}
		}
	}]);

	app.factory('PreguntaParser', function(){
		return {
			parseRequest: function(requestData){
				var tipoPregunta;
				switch(requestData.tipoPregunta){
					case 'Breve':
						tipoPregunta = 1;
						break;
					case 'Lista':
						tipoPregunta = 2;
						break;
					case 'Fecha':
						tipoPregunta = 3;
						break;
					case 'Foto':
						tipoPregunta = 4;
						break;
					case 'Cena':
						tipoPregunta = 5;
						break;
				}
				var datos = {						
					tipoPregunta: tipoPregunta,
					pregunta: requestData.pregunta,
					idEncuesta: requestData.idEncuesta
				};
				return angular.toJson(datos);
			},
			parseResponse: function(responseData){
				dataAux = angular.fromJson(responseData);
				var tipoPregunta;
				switch(dataAux.tipo_pregunta){
					case 1:
						tipoPregunta = 'Breve';
						break;
					case 2:
						tipoPregunta = 'Lista';
						break;
					case 3:
						tipoPregunta = 'Fecha';
						break;
					case 4:
						tipoPregunta = 'Foto';
						break;
					case 5:
						tipoPregunta = 'Cena';
						break;
				}
				var datos = {
					idPregunta: dataAux.id_pregunta,
					tipoPregunta: tipoPregunta,
					pregunta: dataAux.pregunta,
					idEncuesta: dataAux.id_encuesta
				};
				return datos;
			}
		}
	});

	app.factory('OpcionParser', function(){
		return {
			parseRequest: function(requestData){
				var tipoPregunta;
				switch(requestData.tipoPregunta){
					case 'Breve':
						tipoPregunta = 1;
						break;
					case 'Lista':
						tipoPregunta = 2;
						break;
					case 'Fecha':
						tipoPregunta = 3;
						break;
					case 'Foto':
						tipoPregunta = 4;
						break;
					case 'Cena':
						tipoPregunta = 5;
						break;
				}				
				var datos = {
					idPregunta: requestData.idPregunta,
					tipoPregunta: tipoPregunta,
					opcion: requestData.opcion
				};
				return angular.toJson(datos);
			},
			parseResponse: function(responseData){
				dataAux = angular.fromJson(responseData);
				var datos = {
					idOpcion: dataAux.id_opcion,
					idPregunta: dataAux.id_pregunta,
					tipoPregunta: dataAux.tipo_pregunta,
					opcion: dataAux.opcion
				};
				return datos;
			}
		}
	});

	app.factory('OpcionesParser', ['OpcionParser', function(OpcionParser){
		return {
			parseResponse: function(responseData){
				var opcionesJS = angular.fromJson(responseData);
				var opciones = [];
				for (var i = opcionesJS.length - 1; i >= 0; i--) {					
					opciones.push(OpcionParser.parseResponse(angular.toJson(opcionesJS[i])));
				};
				return opciones;
			}
		}
	}]);

	app.factory('RespuestaParser', function(){
		return {
			parseRequest: function(requestData){
				var tipoPregunta;
				switch(requestData.tipoPregunta){
					case 'Breve':
						tipoPregunta = 1;
						break;
					case 'Lista':
						tipoPregunta = 2;
						break;
					case 'Fecha':
						tipoPregunta = 3;
						break;
					case 'Foto':
						tipoPregunta = 4;
						break;
					case 'Cena':
						tipoPregunta = 5;
						break;
				}			
				var datos = {
					idRespuesta: requestData.idRespuesta,
					respuesta: requestData.respuesta,
					idPregunta: requestData.idPregunta,
					tipoPregunta: tipoPregunta,
					idUsuario: requestData.idUsuario,
					nombreUsuario: requestData.nombreUsuario
				};
				return angular.toJson(datos);
			},
			parseResponse: function(responseData){
				var dataAux = angular.fromJson(responseData);
				var tipoPregunta;
				switch(dataAux.tipo_pregunta){
					case 1:
						tipoPregunta = 'Breve';
						break;
					case 2:
						tipoPregunta = 'Lista';
						break;
					case 3:
						tipoPregunta = 'Fecha';
						break;
					case 4:
						tipoPregunta = 'Foto';
						break;
					case 5:
						tipoPregunta = 'Cena';
						break;
				}
				var datos = {
					idRespuesta: dataAux.id_respuesta,
					respuesta: dataAux.respuesta,
					idPregunta: dataAux.id_pregunta,
					tipoPregunta: tipoPregunta,
					idUsuario: dataAux.id_usuario,
					nombreUsuario: dataAux.nombre_usuario
				};
				return datos;
			}
		}
	});

	app.factory('RespuestasParser', ['RespuestaParser', function(RespuestaParser){
		return {
			parseResponse: function(responseData){
				var respuestasJS = angular.fromJson(responseData);
				var respuestas = [];
				for (var i = respuestasJS.length - 1; i >= 0; i--) {
					respuestas.push(RespuestaParser.parseResponse(angular.toJson(respuestasJS[i])));				
				};
				return respuestas;
			}
		}
	}]);
})();