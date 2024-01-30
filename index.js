require('dotenv').config();
const { w3cwebsocket: W3CWebSocket } = require('websocket');
const { createConnection } = require('mysql2');
const messageController = require('./src/controllers/messageController');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors'); 

app.use(cors());

const dbConnection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const webSocketServerPort = 8000;
const webSocketServer = require('websocket').server;

const clients = {};

const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

const wsServer = new webSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

wsServer.on('request', function (request) {
  const userID = getUniqueID();
  console.log((new Date()) + ` Received a new connection from origin ${request.origin}.`);

  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log(`Connected: ${userID} in ${Object.getOwnPropertyNames(clients)}`);

  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ', message.utf8Data);

      for (key in clients) {
        clients[key].sendUTF(message.utf8Data);
        console.log('Sent Message to WebSocket Client: ', clients[key]);
      }

      dbConnection.query(
        'INSERT INTO Messages (userID, message) VALUES (?, ?)',
        [userID, message.utf8Data],
        function (error, results, fields) {
          if (error) throw error;
          console.log('Message saved to the database.');

          messageController.sendNotification(userID, '¡Nueva notificación!', 'notification');
        }
      );
    }
  });
});

app.get("/clientes", (req, res) => {
  res.json({ clientesEnLinea: Object.getOwnPropertyNames(clients) });
});

server.listen(webSocketServerPort, () => {
  console.log(`WebSocket and HTTP Server is listening on port ${webSocketServerPort}`);
});
