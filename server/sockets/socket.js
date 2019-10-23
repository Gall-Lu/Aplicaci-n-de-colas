const { io } = require('../server');
const { TicketControl } = require('../classes/tickeet-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {


    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(`Siguiente ticket ${siguiente}`);
        callback(siguiente);
    });

    // Emitir un evento llamado estado actual
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });


    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: false,
                mensaje: 'El escritorio es necesario.'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // actualizar o notificar cambios en los ULTIMOS 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    });

});