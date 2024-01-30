const messageModel = require('./src/models/messageModel');
const messageController = require('./src/controllers/messageController');

const startShortPolling = (webSocketServer) => {
  async function poll() {
    const connectedUsers = Object.keys(webSocketServer.connections);
    console.log('Connected Users:', connectedUsers.length);

    await Promise.all(connectedUsers.map(async (userID) => {
      const isTyping = await messageModel.getTypingStatus(userID);
      messageController.sendNotification(userID, '¡Nueva notificación!', isTyping);
    }));
  }

};

module.exports = { startShortPolling };
