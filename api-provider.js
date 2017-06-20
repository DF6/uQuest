(function(){	
	var app = angular.module('apiProvider', ['ngResource', 'apiParser', 'uquest']);

	app.provider('EncuestaProvider', function(){
		this.$get = ['$resource', '$filter', 'EncuestaParser', function($resource, $filter, EncuestaParser){
			var Encuesta = $resource('http://uquest.me/api/encuesta/:idEncuesta', {idEncuesta: '@id'}, {				
				save: {
					method: 'POST',
					transformRequest: function(data, headersGetter){
						return EncuestaParser.parseRequest(data);
					},
					transformResponse: function(data, headersGetter){
						return EncuestaParser.parseResponse(data);
					}
				},
				get: {
					method: 'GET',
					transformResponse: function(data, headersGetter){
						return EncuestaParser.parseResponse(data);
					}
				}
			});
			return Encuesta;
		}]
	});

	app.provider('UsuarioProvider', function(){
		this.$get = ['$resource', 'UsuarioParser', function($resource, UsuarioParser){
			var Usuario = $resource('http://uquest.me/api/usuario/:idUsuario', {idUsuario: '@id'}, {				
				save: {
					method: 'POST',
					transformRequest: function(data, headersGetter){
						return UsuarioParser.parseRequest(data);
					},
					transformResponse: function(data, headersGetter){
						return UsuarioParser.parseResponse(data);
					}
				},
				get: {
					method: 'GET',
					transformResponse: function(data, headersGetter){
						return UsuarioParser.parseResponse(data);
					}
				}
			});
			return Usuario;
		}]
	});

	app.provider('PreguntaProvider', function(){
		this.$get = ['$resource', 'PreguntaParser', function($resource, PreguntaParser){
			var Pregunta = $resource('http://uquest.me/api/pregunta/:idPregunta', {idPregunta: '@id'},{
				save: {
					method: 'POST',
					transformRequest: function(data, headersGetter){
						return PreguntaParser.parseRequest(data);
					},
					transformResponse: function(data, headersGetter){
						return PreguntaParser.parseResponse(data);
					}
				}
			});

			return Pregunta;
		}]
	});

	app.provider('PreguntasProvider', function(){
		this.$get = ['$resource', 'PreguntasParser', function($resource, PreguntasParser){
			var Preguntas = $resource('http://uquest.me/api/preguntas/:idEncuesta', {idEncuesta: '@id'},{
				get: {
					isArray: true,
					method: 'GET',
					transformResponse: function(data, headersGetter){
						return PreguntasParser.parseResponse(data);
					}
				}
			});

			return Preguntas;
		}]
	});

	app.provider('OpcionProvider', function(){
		this.$get = ['$resource', 'OpcionParser', function($resource, OpcionParser){
			var Opcion = $resource('http://uquest.me/api/opcion/:idOpcion', {idRespuesta: '@id'},{
				save: {
					method: 'POST',
					transformRequest: function(data, headersGetter){
						return OpcionParser.parseRequest(data);
					},
					transformResponse: function(data, headersGetter){
						return OpcionParser.parseResponse(data);
					}
				}
			});

			return Opcion;
		}]
	});

	app.provider('OpcionesProvider', function(){
		this.$get = ['$resource', 'OpcionesParser', function($resource, OpcionesParser){
			var Opciones = $resource('http://uquest.me/api/opciones/:idPregunta', {idPregunta: '@id'},{
				get: {
					isArray: true,
					method: 'GET',
					transformResponse: function(data, headersGetter){
						return OpcionesParser.parseResponse(data);
					}
				}
			});

			return Opciones;
		}]
	});

	//comprobar si es probable que se envien arrays
	app.provider('RespuestasProvider', function(){
		this.$get = ['$resource', 'RespuestasParser', function($resource, RespuestasParser){
			var Respuestas = $resource('http://uquest.me/api/respuestas/:idPregunta', {idPregunta: '@id'},{
				get: {
					isArray: true,
					method: 'GET',
					transformResponse: function(data, headersGetter){
						return RespuestasParser.parseResponse(data);
					}
				}
			});

			return Respuestas;
		}]
	});

	app.provider('RespuestaProvider', function(){
		this.$get = ['$resource', 'RespuestaParser', function($resource, RespuestaParser){
			var Respuesta = $resource('http://uquest.me/api/respuesta/:idRespuesta', {idRespuesta: '@id'},{
				save: {
					method: 'POST',
					transformRequest: function(data, headersGetter){
						return RespuestaParser.parseRequest(data);
					},
					transformResponse: function(data, headersGetter){
						return RespuestaParser.parseResponse(data);
					}
				}
			});

			return Respuesta;
		}]
	});
})();