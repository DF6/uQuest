(function(){
	var uquestFunciones = angular.module('commonMethods', ['apiProvider']);

	uquestFunciones.factory('helperMethods', ['EncuestaProvider', 'UsuarioProvider', function(EncuestaProvider, UsuarioProvider){
		return methods = {
			validID: function(id){
				if(typeof id != "undefined" && id != "" && id.length == 10){
					return true;
				}else{
					return false;
				}
			},
			ifEncuestaExists: function(id, success, error){
				if(methods.validID(id)){					
					EncuestaProvider.get({idEncuesta: id}).$promise.then(function(response){
						success();
					}, function(reason){
						error();
					});
				}
			},
			checkUser: function(usuario){
				var client = new ClientJS();
				var fingerprint = client.getFingerprint();
				usuario.idUsuario = fingerprint;
				UsuarioProvider.get({idUsuario: usuario.idUsuario}).$promise.then(function(response){
					console.log("Este usuario sí existe en la base de datos");
				},function(reason){
					console.log("Esta usuario no existe en la base de datos, procedemos a crearlo");
					UsuarioProvider.save(usuario);
				});
			}
		}
	}])
})();