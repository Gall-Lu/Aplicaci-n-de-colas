// Comando para establecer la conexión

var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});


socket.on('disconnect', function() {
    console.log('Perdimos conección con el servidor.');

});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });

});


socket.on('estadoActual', function(estadoActual) {
    label.text(estadoActual.actual);
});