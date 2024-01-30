// notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.get('/notifications', notificationController.getAllNotifications);
router.get('/notifications/:notificationId', notificationController.readNotification);
router.post('/notifications', notificationController.createNotification);

module.exports = router;
