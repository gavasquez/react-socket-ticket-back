const TicketList = require("./ticket-list");


class Sockets {

    constructor(io) {
        this.io = io;
        //* Crear instancia de nuevo ticketList
        this.ticketList = new TicketList();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            console.log('Cliente conectado...');

            socket.on('solicitar-ticket', (data, callback) => {
                const nuevoTicket = this.ticketList.crearTicket();
                // Enviamos al ticket en metodo callback
                callback(nuevoTicket);
            });

            socket.on('siguiente-ticket-trabajar', ({ agente, escritorio }, callback) => {
                const suTicket = this.ticketList.asignarTicket(agente, escritorio);
                callback(suTicket);
                //* Emitimos los ticket
                this.io.emit('ticket-asignado', this.ticketList.ultimos13);
            });

        });
    }


}


module.exports = Sockets;