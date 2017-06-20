(function(){
	var uquestVotar = angular.module('uquestVotar', ['ngRoute', 'commonMethods']);

	uquestVotar.controller('uquestVotarCtrl', ['$routeParams', '$location', 'helperMethods', 'Encuesta', 'Usuario', 'EncuestaProvider', 'PreguntasProvider', 'OpcionesProvider', 'RespuestaProvider', 'RespuestasProvider', function($routeParams, $location, helperMethods, Encuesta, Usuario, EncuestaProvider, PreguntasProvider, OpcionesProvider, RespuestaProvider, RespuestasProvider){
		var uq = this;
		
		//Esta función la inicializamos cuando entran en la url /votar/:idEncuesta? 
		//Si el id es valido buscamos si ademas esta existe en el servidor
		var tempIdEncuesta = $routeParams.idEncuesta;
		if(helperMethods.validID(tempIdEncuesta)){

			helperMethods.checkUser(Usuario);
			//esta funcion busca el id en el servidor y si existe ejecuta la primera funcion anonima, si falla ejecuta la segunda
			helperMethods.ifEncuestaExists(tempIdEncuesta, function(){
				uq.idEncuesta = Encuesta.idEncuesta = tempIdEncuesta;
				uq.blockedForm = true;
				uq.encuestaLoad();
			}, function(){
				Materialize.toast('El ID no existe',5000,'rounded');
				$location.url("/votarport");
			})
			
		}else{			
			Materialize.toast('Debes indicar un ID v&aacute;lido de 10 caracteres',5000,'rounded');
			$location.url("/votarport");
		}


		//*** Funciones para que el controlador guarde las respuestas en la base de datos ***//

		uq.submitForm = function(){
			//Coger el usuario y mezclar con la pregunta y la respuesta y añadir las respuestas a la pregunta.
			for (i = 0; i < uq.preguntas.length; i++) {
				console.log(uq.preguntas[i]);
				var respuestas = uq.preguntas[i].respuestasNew;
				console.log(respuestas);
				for(var j = respuestas.length - 1; j >= 0; j--) {
					respuestas[j].nombreUsuario = Usuario.nombreUsuario = uq.nombreUsuario;
					RespuestaProvider.save(respuestas[j]);
				}
			}
			$location.url("/respuestas/" + uq.idEncuesta);
		}



		//*** Funciones para conectar con la base de datos y obtener sus datos ***//

		uq.encuestaLoad = function(){
			EncuestaProvider.get({idEncuesta: uq.idEncuesta}).$promise.then(function(response) {
		  		uq.pass = Encuesta.pass = response.pass;
		  		uq.fechaInicio = Encuesta.fechaInicio = response.fechaInicio;
		  		uq.fechaFin = Encuesta.fechaFin = response.fechaFin;

		  		//una vez cargada la encuesta, cargamos las preguntas
		  		uq.preguntasLoad();
			}, function(reason) {
				$location.url("/votarport");
				Materialize.toast('El ID no existe',5000,'rounded');
			});
		}

		uq.respuestasLoad = function(pregunta){
			RespuestasProvider.get({idPregunta: pregunta.idPregunta}).$promise.then(function(response){
				pregunta.respuestas = response;
				//si la respuesta es del usuario actual, bloquear el input
				var respuestas = pregunta.respuestas;
				console.log(respuestas);
				for (var i = respuestas.length - 1; i >= 0; i--) {
					if(respuestas[i].idUsuario == Usuario.idUsuario){
						//pregunta.bloqueada = true;
						uq.blockedForm = true;
						uq.respondida = true;
					}
				}
			},function(reason){
		  		console.log("Ha fallado la petición, razón: ", reason);
			});
		};

		uq.preguntasLoad = function(){
			PreguntasProvider.get({idEncuesta: uq.idEncuesta}).$promise.then(function(response){
				uq.preguntas = Encuesta.preguntas = response;

				//Cargamos los extras de las preguntas
				uq.preguntasExtrasload();
			},function(reason){
		  		console.log("Ha fallado la petición, razón: ", reason);
			});
		};

		uq.opcionesLoad = function(pregunta){
			OpcionesProvider.get({idPregunta: pregunta.idPregunta}).$promise.then(function(response){
				pregunta.opciones = response;
				for (var i = pregunta.opciones.length - 1; i >= 0; i--) {
					//Recorremos las opciones para asignarles una propiedad formValue que será la que se muestre en la vista.
					pregunta.opciones[i].formValue = {
						idRespuesta: null,
						respuesta: pregunta.opciones[i].opcion,
						idPregunta: pregunta.idPregunta,
						tipoPregunta: pregunta.tipoPregunta,
						//**Revisar para enviar los datos correctos del usuario
						idUsuario: Usuario.idUsuario,
						nombreUsuario: Usuario.nombreUsuario
					}

					//A la primera opciones del array la establecemos como la opción por defecto
					if(i == 0){
						pregunta.respuestasNew = [pregunta.opciones[i].formValue];
					}
				};

			},function(reason){

			});
		}	

		//**Revisar que las funciones mantengan actualizadas tanto la vista como el controlador
		uq.preguntasExtrasload = function(){
			for (var i = Encuesta.preguntas.length - 1; i >= 0; i--) {
				var pregunta = Encuesta.preguntas[i];
				switch(pregunta.tipoPregunta){
					case 'Lista': 
						uq.opcionesLoad(pregunta);
						break;
					default:
						pregunta.respuestasNew = [{
							idRespuesta: null,
							respuesta: null,
							idPregunta: pregunta.idPregunta,
							tipoPregunta: pregunta.tipoPregunta,
							idUsuario: Usuario.idUsuario,
							nombreUsuario: Usuario.nombreUsuario
						}];
						break;
				}

		  		uq.respuestasLoad(pregunta);


				if(i == Encuesta.preguntas.length -1){
					uq.blockedForm = false;	
				}				
			};
		}
	}]);


	//*** Persistencia de datos en la vista ***//

	uquestVotar.factory('Encuesta', function(){
		return function Encuesta(){
			this.idEncuesta = '';
			this.pass = '';
			this.fechaFin = '';
			this.fechaInicio = '';
			this.preguntas = [];
		};
	});
})();