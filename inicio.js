var appIni=angular.module('appIni',['ngRoute']);
appIni.config(function($routeProvider){
  $routeProvider
            .when("/", {
                controller: "appCtrl",
                controllerAs: "vm",
                templateUrl: "ini.html"
            })
            .when("/condiciones", {
                controller: "appCtrl",
                controllerAs: "vm",
                templateUrl: "condicionesuso.html"
            })
            .when("/privacidad", {
                controller: "appCtrl",
                controllerAs: "vm",
                templateUrl: "politicaprivacidad.html"
            });
});
appIni.controller("navCtrl", function($location){
        var map = this;
        map.estoy = function(ruta){
            return $location.path() == ruta;
        }
    })
appIni.controller("appCtrl",function(){
  var vm=this;
});
