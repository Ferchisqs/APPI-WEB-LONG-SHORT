const Notification = require('./src/models/messageModel');

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.readNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);

    if (!notification) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const { payload } = req.body;
    const notification = new Notification({ ...payload, createdBy: req.user._id });
    await notification.save();

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  // notificaciones.js
const startLongPolling = (clients, longPollingResponses) => {
  const handleLongPollingRequest = (req, res) => {
    const userID = req.query.userID;

    longPollingResponses[userID] = res;

    req.on('close', () => {
      delete longPollingResponses[userID];
    });
  };

  return { handleLongPollingRequest };
};

module.exports = { startLongPolling };

};
