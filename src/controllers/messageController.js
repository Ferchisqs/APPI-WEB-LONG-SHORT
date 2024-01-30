
  const messageModel = require('../models/messageModel');
  const longPollingResponses = {};

  const sendNotification = (userID, message) => {
    if (longPollingResponses[userID]) {
      const res = longPollingResponses[userID];
      res.json({ message });
      delete longPollingResponses[userID]; 
    }
  };

  const addLongPollingResponse = (userID, response) => {
    longPollingResponses[userID] = response;
  };


  const handleIncomingMessage = async (userID, message, isTyping) => {
    try {
      await messageModel.saveMessage(userID, message, isTyping);
  
      if (longPollingResponses[userID]) {
        const res = longPollingResponses[userID];
        res.json({ message, isTyping });
        delete longPollingResponses[userID]; 
      }
  
      return { success: true, message: 'Message saved successfully' };
    } catch (error) {
      console.error('Error saving message:', error);
      return { success: false, message: 'Error saving message' };
    }
  };
  
  module.exports = {
    handleIncomingMessage,
    sendNotification,
    addLongPollingResponse
  };
  

 
