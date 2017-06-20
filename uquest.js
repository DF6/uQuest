var uquest=angular.module('uquest',['ngRoute', 'apiProvider', 'uquestVotar', 'uquestRespuestas']);
uquest.config(function($routeProvider){
  $routeProvider
            .when("/", {
              templateUrl: "portada.html"
            })
            .when("/admincreacion", {
              templateUrl: "admincreacion.html"
            })
            .when("/crear", {
              templateUrl: "crearencuesta.html"
            })
            .when("/fecha", {
              templateUrl: "fecha.html"
            })
            .when("/compartir", {
              templateUrl: "compartir.html"
            })
            .when("/finalizar", {
              templateUrl: "finalizarencuesta.html"
            })
            .when("/nuevalista", {
              templateUrl: "preguntalista.html"
            })
            .when("/opcion", {
              templateUrl: "opcion.html"
            })
            .when("/nuevarespbreve", {
              templateUrl: "preguntarespbreve.html"
            })
            .when("/adminport", {
              templateUrl: "adminport.html"
            })
            .when("/admin", {
              templateUrl: "administracion.html"
            })
            .when("/votarport", {
              templateUrl: "votarport.html"
            })
            .when("/votar/:idEncuesta?", {
              templateUrl: "votar.html"
            })
            .when("/respuestas/:idEncuesta?", {
              templateUrl: "respuestas.html"
            })
            .when("/elegirtipo", {
              templateUrl: "eleccionquest.html"
            })
            .when("/questcena", {
              templateUrl: "questcena.html"
            })
            .when("/questfoto",{
              templateUrl: "questfoto.html"
            })
            .when("/questfecha",{
              templateUrl: "questfecha.html"
            })
            .when("/editar",{
              templateUrl: "editar.html"
            });
});
uquest.controller("navuquest", function($location){
        var map = this;
        map.estoy = function(ruta){
            return $location.path() == ruta;
        }
})
uquest.controller("uquestCtrl",function($routeParams, uquestFactory, EncuestaProvider, PreguntaProvider, OpcionProvider){
  var uq=this;
  var termi=false;
  uq.preguntas=uquestFactory.getPreguntas();
  uq.resultados=uquestFactory.getResultados();
  uq.sugerencias=uquestFactory.getSugerencias();
  uq.pass=uquestFactory.pass;
  uq.pregunta=uquestFactory.preguntaTemp;
  uq.opcion="";
  uq.opciones=[];
  uq.opc=[false,false,false,false,false,false,false,false,false];
  uq.fecha=uquestFactory.fecha;
  uq.encu=uquestFactory.encu;
  uq.fecha1="";
  uq.fecha2="";
  uq.fecha3="";
  uq.fechaTemp=uquestFactory.fechaTemp;
  uq.foto=uquestFactory.foto;
  uq.preguntaEditar=uquestFactory.preguntaEditar;
  uq.multipleSwitch=function(valor)
  {
    uquestFactory.multiple=valor;
  }
  uq.consultaSwitch=function()
  {
    return uquestFactory.multiple;
  }
  uq.validarPass=function()
  {
    if(uq.pass=="")
    {
      Materialize.toast('Contrase&ntilde;a inexistente', 5000, 'rounded');
    }else{
      uquestFactory.pass=uq.pass;
      switch(uquestFactory.multiple)
      {
        case 1:window.location="#/questfoto";
              break;
        case 2:window.location="#/questcena";
              break;
        case 3:window.location="#/nuevalista";
              break;
        case 4:window.location="#/nuevarespbreve";
              break;
        case 5:window.location="#/questfecha";
              break;
        case 0:window.location="#/crear";
              break;
      }
    }
    if(uq.pass=="rotatemepls")
    {
        estilo=document.createElement("style");
        estilo.innerHTML="@-moz-keyframes girando{from{-moz-transform: rotateY(0deg);}to{-moz-transform: rotateY(-360deg);}}body{-moz-animation-name: girando;-moz-animation-timing-function: linear;-moz-animation-iteration-count: infinite;-moz-animation-duration: 3s;-moz-transform-style: preserve-3d;}footer{margin:30px auto;-moz-perspective:600px;}@-webkit-keyframes girando2{from{-webkit-transform: rotateY(0deg);}to{-webkit-transform: rotateY(-360deg);}}body{-webkit-animation-name: girando2;-webkit-animation-timing-function: linear;-webkit-animation-iteration-count: infinite;-webkit-animation-duration: 3s;-webkit-transform-style: preserve-3d;}footer{margin:30px auto;-webkit-perspective:600px;}@-o-keyframes girando3{from{-o-transform: rotateY(0deg);}to{-o-transform: rotateY(-360deg);}}body{-o-animation-name: girando3;-o-animation-timing-function: linear;-o-animation-iteration-count: infinite;-o-animation-duration: 3s;-o-transform-style: preserve-3d;}footer{margin:30px auto;-o-perspective:600px;}";
        document.getElementsByTagName("head")[0].appendChild(estilo);
    }
  }
  uq.validarPreguntas=function()
  {
    if(uq.preguntas.length==0)
    {
      Materialize.toast('Sin preguntas', 5000, 'rounded');
    }else{
      uquestFactory.setPreguntas(uq.preguntas);
      window.location="#/fecha";
    }
  }
  uq.guardarPregunta=function(tipo)
  {
    switch(tipo)
    {
      case 'Lista':if(uq.pregunta=="")
                  {
                    Materialize.toast('Debes rellenar la pregunta', 5000, 'rounded');
                  }else if(uquestFactory.getOpciones().length==0)
                  {
                    Materialize.toast('Necesitas m&aacute;s opciones', 5000, 'rounded');
                  }else{
                    var opciones = uquestFactory.getOpciones();
                    var pregunta = {
                      pregunta: uq.pregunta,
                      tipoPregunta: "Lista",
                      opciones: opciones
                    }
                    uq.preguntas.push(pregunta);
                    reenvioPag();
                  }
                  break;
      case 'Breve':if(uq.pregunta=="")
                  {
                    Materialize.toast('Debes rellenar la pregunta', 5000, 'rounded');
                  }else{
                    var pregunta = {
                      pregunta: uq.pregunta,
                      tipoPregunta: "Breve"
                    }
                    uq.preguntas.push(pregunta);
                    reenvioPag();
                  }
                  break;
      case 'Foto':if(uq.pregunta=="")
                  {
                    Materialize.toast('Debes rellenar la pregunta', 5000, 'rounded');
                  }else if(uq.foto=="")
                  {
                    Materialize.toast('No has elegido foto', 5000, 'rounded');
                  }else{
                    var pregunta = {
                      pregunta: uq.pregunta,
                      tipoPregunta: "Foto",
                      foto: uq.foto
                    }
                    uq.preguntas.push(pregunta);
                    reenvioPag();
                  }
                  break;
      case 'Fecha':if(uq.pregunta=="")
                  {
                    Materialize.toast('Debes rellenar la pregunta', 5000, 'rounded');
                  }else if(uq.fecha3==""){
                    Materialize.toast('Debes rellenar la fecha', 5000, 'rounded');
                  }else{
                    var pregunta = {
                      pregunta: uq.pregunta,
                      tipoPregunta: "Fecha",
                      fecha: uq.fecha3
                    }
                    uq.preguntas.push(pregunta);
                    reenvioPag();
                  }
                  break;
      case 'Cena':if(uq.fecha1=="" || uq.fecha2=="")
                  {
                    Materialize.toast('Debes rellenar las fechas de inicio y fin', 5000, 'rounded');
                  }else{
                    var opctru=[];
                    var o=0;
                    for(var i=0;i<uq.opc.length;i++)
                    {
                      if(uq.opc[i]==true)
                      {
                        opctru[o]=document.getElementById('ch').getElementsByTagName('label')[i].innerHTML;
                        o++;
                      }
                    }
                    if(opctru.length==0)
                    {
                      Materialize.toast('Debes seleccionar alg&uacute;n restaurante', 5000, 'rounded');
                    }else{
                      var pregunta = {
                        pregunta: "Quest-Cena",
                        tipoPregunta: "Cena",
                        fecha1: uq.fecha1,
                        fecha2: uq.fecha2,
                        opctru: opctru
                      }
                      uq.preguntas.push(pregunta);
                      window.location="#/fecha";
                    }
                  }
                  break;
      default:Materialize.toast('Error desconocido', 5000, 'rounded');
                  break;
    }
    uquestFactory.preguntaTemp="";
    uquestFactory.borraTodasOpc();
  }
  uq.guardaFoto=function()
  {
    uquestFactory.foto=document.getElementsByClassName('white')[0].value;
    uq.foto=uquestFactory.foto;
  }
  uq.borrarPregunta=function(indice)
  {
    uquestFactory.borrarPregunta(indice);
  }
  uq.revisaPreguntas=function(tipo)
  {
    if(uq.preguntas.length<10)
    {
      switch(tipo)
      {
        case 'Lista':window.location="#/nuevalista";
                    Materialize.toast('Con la pregunta tipo lista podr&aacute;s responder eligiendo entre varias opciones', 5000, 'rounded');
                    break;
        case 'Breve':window.location="#/nuevarespbreve";
                    Materialize.toast('Con la pregunta tipo respuesta breve podr&aacute;s enviar una respuesta escrita a la pregunta', 5000, 'rounded');
                    break;
        case 'Foto':window.location="#/questfoto";
                    Materialize.toast('Con la pregunta tipo foto podr&aacute; adjuntar una foto a una pregunta breve', 5000, 'rounded');
                    break;
        case 'Fecha':window.location="#/questfecha";
                    Materialize.toast('Con la pregunta tipo fecha das la posibilidad de elegir una fecha en concreto asociada a una pregunta', 5000, 'rounded');
                    break;
        default:Materialize.toast('Error inesperado', 5000, 'rounded');
                    break;
      }
    }else{
      Materialize.toast('Muchas preguntas', 5000, 'rounded');
    }
  }
  uq.opci=function()
  {
    return uquestFactory.getOpciones();
  }
  uq.revisaOpciones=function()
  {
    if(uq.opciones.length<10)
    {
      uquestFactory.preguntaTemp=uq.pregunta;
      window.location="#/opcion";
    }else{
      Materialize.toast('Diez opciones es suficiente', 5000, 'rounded');
    }
  }
  uq.guardarOpcion=function()
  {
    if(uq.opcion=="")
    {
      Materialize.toast('Debes rellenar la opci&oacute;n', 5000, 'rounded');
    }else{
      if(uquestFactory.anadirOpcion(uq.opcion))
      {
        window.location="#/nuevalista";
      }else{
        Materialize.toast('Esa opci&oacute;n ya existe', 5000, 'rounded');
      }
    }
  }
  uq.guardarFecha=function()
  {
    if(document.getElementsByClassName("datepicker")[0].value=="")
    {
      Materialize.toast('Debes elegir alguna fecha', 5000, 'rounded');
    }else{
      uquestFactory.fecha=document.getElementsByClassName("datepicker")[0].value;
      window.location="#/finalizar";
    }
  }
  uq.guardarFechaCena=function(numero)
  {
    switch(numero)
    {
      case 1: uquestFactory.fecha1=document.getElementById("d1").value;
              uq.fecha1=uquestFactory.fecha1;
              break;
      case 2: uquestFactory.fecha2=document.getElementById("d2").value;
              uq.fecha2=uquestFactory.fecha2;
              break;
      case 3: uquestFactory.fecha3=document.getElementById("d3").value;
              uq.fecha3=uquestFactory.fecha3;
              break;
      default:
              break;
    }
  }
  uq.enviarEncuesta=function()
  {
    if(uquestFactory.pass=="")
    {
      Materialize.toast('Falta la contrase&ntilde;a',5000,'rounded');
    }
    if(uquestFactory.fecha=="")
    {
      Materialize.toast('Falta la fecha',5000,'rounded');
    }
    if(uquestFactory.getPreguntas().length==0)
    {
      Materialize.toast('No hay preguntas',5000,'rounded');
    }
    if(uquestFactory.pass=="" || uquestFactory.fecha=="" || uquestFactory.getPreguntas().length==0){return;}

      EncuestaProvider.save(uquestFactory).$promise.then(function(encuestaResponse){
        uq.encu = uquestFactory.encu = encuestaResponse.idEncuesta;

        for (var i = uq.preguntas.length - 1; i >= 0; i--) {
          var pregunta =uq.preguntas[i];
          pregunta.idEncuesta = uq.encu;
          PreguntaProvider.save(pregunta).$promise.then(function(preguntaResponse){
            var tipoPregunta = preguntaResponse.tipoPregunta;
            switch(tipoPregunta){
              case 'Lista':
                for (var i = pregunta.opciones.length - 1; i >= 0; i--) {
                  var opcion = pregunta.opciones[i];
                  var opcAux = {
                    tipoPregunta: preguntaResponse.tipoPregunta,
                    idPregunta: preguntaResponse.idPregunta,
                    opcion: opcion
                  }
                  OpcionProvider.save(opcAux);
                };
                break;              
            }
          });
        };

        window.location="#/compartir";  
      });

    //EncuestaProvider.save(uquestFactory).$promise.then(function(response){
      //Cuando se finaliza correctamente el guardado, se ejecuta esta función
      //uquestFactory.encu = response.data.idEncuesta;
      //uq.encu = uquestFactory.encu;      
    //});
  }
  uq.borraOpcion=function(num)
  {
    uquestFactory.borraOpcion(num);
  }
  uq.borraTodo=function()
  {
    uquestFactory.borraTodo();
    uquestFactory.pass="";
    uquestFactory.fecha="";
  }
  uq.buscarEncuesta=function()
  {
    if(uq.encu=="" || uq.encu.length!=10)
    {
      Materialize.toast('Debes indicar un ID v&aacute;lido de 10 caracteres',5000,'rounded');
    }else if(uq.pass==""){
      Materialize.toast('Debes indicar la contrase&ntilde;a',5000,'rounded');
    }else{
      switch(DBBuscaEncuesta(uq.encu)){
        case 0:Materialize.toast('El ID no existe',5000,'rounded');
                break;
        case 2:Materialize.toast('La contrase&ntilde;a es incorrecta',5000,'rounded');
                break;
        case 1:var p=[{pregunta:"Pregunta1",tipoPregunta:"Lista",opciones:[{opcion:"asdf"},{opcion:"fdsa"}]},{pregunta:"Pregunta2",tipoPregunta:"Breve"},{pregunta:"Pregunta3",tipoPregunta:"Foto",foto:"prueba.jpg"},{pregunta:"Pregunta4",tipoPregunta:"Fecha",fecha:"10/10/2010"}];
               var r=[{usuario:"Axel",numeroPregunta:0,numeroOpcion:0},{usuario:"Harry",numeroPregunta:0,numeroOpcion:1},{usuario:"Julen",numeroPregunta:0,numeroOpcion:0},{usuario:"Axel",numeroPregunta:1,respuesta:"El cerdo de la duquesa"},{usuario:"Harry",numeroPregunta:1,respuesta:"Se dice Yava"},{usuario:"Julen",numeroPregunta:1,respuesta:"Cuanto Love"},{usuario:"Axel",numeroPregunta:2,respuesta:"La foto muy bonita"},{usuario:"Harry",numeroPregunta:2,respuesta:"Muy negro todo"},{usuario:"Julen",numeroPregunta:2,respuesta:"Esa foto no es de Apple"},{usuario:"Axel",numeroPregunta:3,fecha:"22/08/2015"},{usuario:"Harry",numeroPregunta:3,fecha:"29/08/2015"},{usuario:"Julen",numeroPregunta:3,fecha:"25/08/2015"}];
               var s=[{nombre:"Axel",numeroPregunta:0,opcion:"wuwuwu"},{nombre:"Harry",numeroPregunta:0,opcion:"wawawa"},{nombre:"Julen",numeroPregunta:-1,opcion:{pregunta:"Pregunta5",tipoPregunta:"Lista",opciones:[{opcion:"asdf"},{opcion:"fdsa"}]}}];
               var re=[];
               uquestFactory.fecha="29/08/2015";
               //Las variables anteriores son temporales, se supone que son los datos que se reciben de la BD
               for(i=0;i<p.length;i++)
               {
                 var respu={numeroPregunta:-1,tipoPregunta:"",respuesta:[]};
                 respu.numeroPregunta=i;
                 respu.tipoPregunta=p[i].tipoPregunta;
                 if(p[i].tipoPregunta=='Lista')
                 {
                   for(w=0;w<p[i].opciones.length;w++)
                   {
                     respu.respuesta.push({opcion:p[i].opciones[w].opcion,numero:0});
                   }
                 }
                 for(t=0;t<r.length;t++)
                 {
                   if(r[t].numeroPregunta==i)
                   {
                     switch(p[i].tipoPregunta)
                     {
                       case 'Lista':
                                    respu.respuesta[r[t].numeroOpcion].numero++;
                                    break;
                       case 'Breve':
                       case 'Foto':respu.respuesta.push({usuario:r[t].usuario,respuesta:r[t].respuesta});
                                    break;
                       case 'Fecha':respu.respuesta.push([{usuario:r[t].usuario,fecha:r[t].fecha}]);
                                    break;
                       default:Materialize.toast("Error inesperado",5000,"rounded");
                                break;
                     }
                   }
                 }
                 re.push(respu);
               }
               uquestFactory.setPreguntas(p);
               uquestFactory.setResultados(re);
               uquestFactory.setSugerencias(s);
               window.location="#/admin";
                break;
        default:Materialize.toast('Error inesperado',5000,'rounded');
                break;
      }
    }
  }
  function DBBuscaEncuesta(id_encuesta)
  {
    Materialize.toast(id_encuesta,5000,'rounded');
    return 1;
  }
  function reenvioPag()
  {
    if(uquestFactory.multiple==0)
    {
      window.location="#/crear";
    }else{
      window.location="#/fecha";
    }
  }
  uq.votar=function()
  {
    window.location="#/";
  }
  function anadirCero(numero)
  {
    if(numero<10)
    {
      numero="0"+numero;
    }
    return numero;
  }
  uq.terminarEncuesta=function()
  {
    if(!termi)
    {
      var d=new Date();
      uquestFactory.fecha=anadirCero(parseInt(d.getDate())) + "/" + anadirCero(parseInt(d.getMonth()+1)) + "/" + d.getFullYear();
      uq.fecha=uquestFactory.fecha;
      uq.sugerencias=[];
      Materialize.toast('Terminada',5000,'rounded');
      document.getElementById("term").innerHTML="Encuesta Terminada";
      termi=true;
    }
  }
  uq.resetearEncuesta=function()
  {
    for(i=0;i<uq.resultados.length;i++)
    {
      if(uq.resultados[i].tipoPregunta=='Lista')
      {
        for(j=0;j<uq.resultados[i].respuesta.length;j++)
        {
          uq.resultados[i].respuesta[j].numero=0;
        }
      }else{
        uq.resultados.splice(i,1);
        i--;
      }
    }
    reseteada=true;
    uquestFactory.setResultados(uq.resultados);
    uq.resultados=uquestFactory.getResultados();
    Materialize.toast("Reseteados",5000,"rounded");
  }
  uq.incluirOpcion=function(numPregunta,opcIncluida,indice)
  {
    uq.preguntas[numPregunta].opciones.push({opcion:opcIncluida});
    uq.resultados[numPregunta].respuesta.push({opcion:opcIncluida,numero:0});
    uq.sugerencias.splice(indice,1);
  }
  uq.incluirPregunta=function(pregunta,indice)
  {
    uq.preguntas.push(pregunta);
    uq.sugerencias.splice(indice,1);
    uq.resultados.push({numeroPregunta:uq.preguntas.length-1,tipoPregunta:pregunta.tipoPregunta,respuesta:[]});
    if(pregunta.tipoPregunta=='Lista')
    {
      for(w=0;w<pregunta.opciones.length;w++)
      {
        uq.resultados[uq.resultados.length-1].respuesta.push({opcion:pregunta.opciones[w].opcion,numero:0});
      }
    }

  }
  uq.editarPregunta=function(indice)
  {
    uquestFactory.preguntaEditar=indice;
    uquestFactory.preguntaTemp=uq.preguntas[indice].pregunta;
    switch(uq.preguntas[indice].tipoPregunta)
    {
      case 'Foto':uquestFactory.foto=uq.preguntas[indice].foto;
                  break;
      case 'Fecha':uquestFactory.fechaTemp=uq.preguntas[indice].fecha;
                  break;
      default:break;
    }
    window.location="#/editar";
  }
  uq.cambiosEdicion=function(indice)
  {
    if(uq.preguntas[indice].tipoPregunta=='Lista')
    {
      var mantener=false;
      if(uq.resultados[indice].respuesta.length!=uq.preguntas[indice].opciones.length)
      {
        for(i=0;i<uq.resultados[indice].respuesta.length;i++)
        {
          for(j=0;j<uq.preguntas[indice].opciones.length;j++)
          {
            if(uq.resultados[indice].respuesta[i].opcion==uq.preguntas[indice].opciones[j].opcion)
            {
              mantener=true;
            }
          }
          if(!mantener)
          {
            uq.resultados[indice].respuesta.splice(i,1);
            i--;
          }
          mantener=false;
        }
      }
    }
    switch (uq.preguntas[indice].tipoPregunta) {
      case 'Fecha':uq.fechaTemp=document.getElementById('d3').value;
                   uq.preguntas[indice].fecha=uq.fechaTemp;
                   uq.preguntas[indice].pregunta=uq.pregunta;
                  break;
      case 'Foto':uq.foto=document.getElementById("fot").value;
                  uq.preguntas[indice].foto=uq.foto;
      case 'Lista':
      case 'Breve':uq.preguntas[indice].pregunta=uq.pregunta;
                break;
      default:Materialize.toast('Error inesperado',5000,'rounded');
                break;
    }
    uquestFactory.preguntaTemp="";
    uquestFactory.fechaTemp="";
    window.location="#/admin";
  }
  uq.cambiosBorrado=function(indice)
  {
    for(i=0;i<uq.sugerencias.length;i++)
    {
      if(uq.sugerencias[i].numeroPregunta==indice)
      {
        uq.sugerencias.splice(i,1);
        i--;
      }else if(uq.sugerencias[i].numeroPregunta>indice)
      {
        uq.sugerencias[i].numeroPregunta--;
      }
    }
    for(i=0;i<uq.resultados.length;i++)
    {
      if(uq.resultados[i].numeroPregunta==indice)
      {
        uq.resultados.splice(i,1);
        i--;
      }else if(uq.resultados[i].numeroPregunta>indice)
      {
        uq.resultados[i].numeroPregunta--;
      }
    }
  }
});
uquest.factory("uquestFactory", function(){
    var preguntas=[];
    var resultados=[];
    var sugerencias=[];
    var opciones=[];
    var interfaz = {
        encu: "",
        pass:"",
        fecha:"",
        fecha1:"",
        fecha2:"",
        fecha3:"",
        foto:"",
        preguntaEditar:-1,
        preguntaTemp:"",
        multiple:-1,
        getNumPregunta: function(){
            return preguntas.length+1;
        },
        getPreguntas: function(){
          return preguntas;
        },
        setPreguntas: function(p){
          preguntas=p;
        },
        borrarPregunta: function(indice){
          preguntas.splice(indice,1);
        },
        getOpciones: function()
        {
          return opciones;
        },
        getResultados: function(){
          return resultados;
        },
        setResultados: function(r){
          resultados=r;
        },
        getSugerencias: function(){
          return sugerencias;
        },
        setSugerencias: function(s){
          sugerencias=s;
        },
        anadirOpcion: function(o)
        {
          for(i=0;i<opciones.length;i++)
          {
            if(o==opciones[i])
            {
              return false;
            }
          }
          opciones.push(o);
          return true;
        },
        borraTodasOpc: function()
        {
          opciones=[];
        },
        borraTodo: function()
        {
          preguntas=[];
          opciones=[];
          resultados=[];
          sugerencias=[];
        },
        borraOpcion: function(num)
        {
          var opcc=[];
          for(i=0;i<opciones.length;i++)
          {
            if(i<num)
            {
              opcc[i]=opciones[i];
            }else if(i>num)
            {
              opcc[i-1]=opciones[i];
            }
          }
          opciones=opcc;
        }
    }
    return interfaz;
});
