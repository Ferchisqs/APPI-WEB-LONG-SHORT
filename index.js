const express = require("express");
const serveStatic = require('serve-static');
const path = require("path");
const app = express();

// settings
app.set("port", process.env.PORT || 3000);

// static file
app.use(serveStatic(path.join(__dirname, 'public')));

// start the server
const httpServer = app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});

// websockets
const { Server } = require("socket.io");
const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log('New connection', socket.id);

    socket.on('chat:message', (data) => {
        io.emit('chat:message', data); // Cambiado de io.socket.emit a io.emit
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
});

