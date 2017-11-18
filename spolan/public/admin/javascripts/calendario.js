var citasModule = angular.module('calendario', []);

citasModule.factory('calendario', function ($http,$q) {







});




citasModule.controller('ctrlCalendario', function ($scope, $location,$timeout,$http) {

    $timeout(function () {

        $(".timepicker").timepicker({
            showInputs: false
        });

    }, 0, false);


    $timeout(function () {

        $(".timepicker1").timepicker({
            showInputs: false
        });

    }, 0, false);


    //Date picker
    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true
    });


    $scope.evento = {};


    var listado = [];

    $http({

        method: 'GET',
        url: '/web/obtenerCalendario',

        headers: {
            'Content-Type': 'application/json'
        }

    }).then(function successCallback(response) {


        console.log(response.data);
        listado = response.data;

    }, function errorCallback(response) {
        console.log('entra');


    });

    var listado1 = [];


    $http({

        method: 'GET',
        url: '/web/obtenerCalendario', //ocupado va un slect


        headers: {
            'Content-Type': 'application/json'
        }

    }).then(function successCallback(response) {


        console.log(response.data);

        var n = response.data.length;

        for (var i = 0; i < n; i++) {

            response.data[i].title = "ocupado";
            listado1.push(response.data[i]);

        }


    }, function errorCallback(response) {
        console.log('entra');


    });

    $scope.horario = {};

    // formato de ingreso "2017-07-12T14:00:00-05:00"


    var date = new Date(),
        d = date.getDate(),
        m = date.getMonth(),
        y = date.getFullYear(),
        started,
        categoryClass;


    function Calendario(lista) {


        var calendar = $('#calendar1').fullCalendar({
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            selectable: true,
            selectHelper: true,


            eventClick: function (calEvent, jsEvent, view) {
                $('#fc_edit').click();

                console.log(calEvent);


                ver(calEvent);
                categoryClass = $("#event_type").val();


                $(".antosubmit2").on("click", function () {



                    guardar(calEvent);


                    var aux = $("#estado").val();


                    var color = "#00c0ef";


                    if (aux == "cancelado") {
                        color = "#ff9250";
                    }

                    if (aux == "ocupado") {
                        color = "#88f200";
                    }



                    calEvent.estado= aux;
                        calEvent.backgroundColor= color;
                        calEvent.borderColor= color;

                    calendar.fullCalendar('updateEvent', calEvent);

                    $('.antosubmit2').unbind();

                });



                $(".antoclose").on("click", function () {

                    console.log("cerrar");
                    $('.antosubmit2').unbind();


                });




            },
            editable: true,
            events: lista

        });



    }





    $timeout(function () {
        Calendario(listado);
    }, 100, false);


    function ver(obj) {

        $('#title2').val(obj.title);
        $('#nombre').val(obj.evento.nombre);
        $('#apellido').val(obj.evento.apellido);
        $('#telefono').val(obj.evento.telefono);
        $('#estado').val(obj.estado);
        console.log(obj);


    }


    function guardar(obj) {


        console.log(obj);

        var aux = $("#estado").val();

        console.log(aux);
        var color = "#00c0ef";


        if (aux == "cancelado") {
            color = "#ff9250";
        }

        if (aux == "ocupado") {
            color = "#88f200";
        }


        $http({
            method: 'PUT',
            url: '/web/actulizarCalendario' + '/' + obj.id_agenda,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {

                estado: $("#estado").val(),
                backgroundColor: color,
                borderColor: color

            }


        }).then(function successCallback(response) {

            console.log(response.data);


        }, function errorCallback(response) {


        });


    }

    $timeout(function () {


        var calendar = $('#calendar').fullCalendar({
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },

            selectable: true,
            selectHelper: true,

            editable: false,


            events: listado1

        });

    }, 500, false);


    $scope.agregar = function () {


        var aux = document.getElementById('datepicker').value.toString();
        var vec = aux.split("T");


        console.log(vec[0]);

        var aux1 = document.getElementById('timepicker').value.toString();
        var vec1 = aux1.split(":");

        console.log(vec1);
        var vec3 = vec[0].split("/");

        console.log(vec3);
        var vec2 = vec1[1].split(" ");

        console.log(vec2);

        console.log($scope.evento);
        var hora;

        if (vec2[1] == "PM") {
            hora = ( parseInt(vec1[0]) + 12).toString();

        } else {
            hora = vec1[0];
        }

//revisar inervalso de tiempo 


        var aux12 = document.getElementById('timepicker1').value.toString();
        var vec12 = aux12.split(":");

        console.log(vec12);



        var vec22 = vec12[1].split(" ");

        console.log(vec22);

        var hora2;

        if (vec22[1] == "PM") {
            hora2 = ( parseInt(vec12[0]) + 12).toString();

        } else {
            hora2 = vec12[0];
        }





        var fecha1 = "" + vec3[2] + "-" + vec3[1] + "-" + vec3[0] + "T" + hora + ":" + vec2[0] + ":00";

        console.log(fecha1);

        var fecha2 = "" + vec3[2] + "-" + vec3[1] + "-" + vec3[0] + "T" + hora2 + ":" + vec22[0]  + ":00";

//sumar 12 a las horas si es pm

        // formato de ingreso "2017-07-12T14:00:00-05:00"


        $http({
            method: 'POST',
            url: '/api/eventos',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                title: $scope.evento.titulo,
                evento: $scope.evento,
                start: fecha1,
                end: fecha2,
                backgroundColor: "#00c0ef",
                borderColor: "#00c0ef",
                estado: "pendiente"

            }


        }).then(function successCallback(response) {
            console.log(response.data);


            $('#calendar1').fullCalendar('destroy');

       listado.push(response.data);
            Calendario(listado);




        }, function errorCallback(response) {

        });


    };


    $scope.filtroPendiente = function () {


        if (true == $scope.a.ocupados) {

            $('#calendar1').fullCalendar('destroy');

            console.log("esta marcado pendientes");

            var pendientes = [];
            var aprobados = [];
            var total = [];
            $.getJSON('/api/eventos?estado=pendiente', function (data) {
                console.log(data);
                pendientes = data;

            });

            $.getJSON('/api/eventos?estado=ocupado', function (data) {
                console.log(data);
                aprobados = data;

            });

            $timeout(function () {
                total = pendientes.concat(aprobados);
                Calendario(total);
            }, 100, false);
        }
        else {

            if (true == $scope.a.pendientes) {


                console.log($scope.a.pendientes);


                $('#calendar1').fullCalendar('destroy');

                $.getJSON('/api/eventos?estado=pendiente', function (data) {
                    console.log(data);
                    Calendario(data);

                });


            } else {

                $('#calendar1').fullCalendar('destroy');
                console.log($scope.a.pendientes);
                Calendario(listado);
            }


        }


    };


    $scope.filtroOcupado = function () {

        if (true == $scope.a.pendientes) {

            $('#calendar1').fullCalendar('destroy');

            console.log("esta marcado pendientes");

            var pendientes = [];
            var aprobados = [];
            var total = [];
            $.getJSON('/api/eventos?estado=pendiente', function (data) {
                console.log(data);
                pendientes = data;

            });

            $.getJSON('/api/eventos?estado=ocupado', function (data) {
                console.log(data);
                aprobados = data;

            });

            $timeout(function () {
                total = pendientes.concat(aprobados);
                Calendario(total);
            }, 100, false);
        }
        else {


            if (true == $scope.a.ocupados) {


                console.log($scope.a.ocupados);


                $('#calendar1').fullCalendar('destroy');

                $.getJSON('/api/eventos?estado=ocupado', function (data) {
                    console.log(data);
                    Calendario(data);

                });


            } else {

                $('#calendar1').fullCalendar('destroy');
                console.log($scope.a.pendientes);
                Calendario(listado);
            }


        }


    }


    $scope.filtroCancelado = function () {


        if (true == $scope.a.cancelados) {


            console.log($scope.a.cancelados);


            $('#calendar1').fullCalendar('destroy');

            $.getJSON('/api/eventos?estado=cancelado', function (data) {
                console.log(data);
                Calendario(data);

            });


        } else {

            $('#calendar1').fullCalendar('destroy');
            console.log($scope.a.cancelados);
            Calendario(listado);
        }

    }


});




