const Notification = require('../models/notificacionModel');

let notificaciones = [];

    const createNotification = async ( req, res ) => {
        try {
            const name = req.params.name
            const notification = {
                name,
                text: "Nueva notificacion"
            }
            notificaciones.push(notification)
        } catch (error) {
            console.error("Error el servidor", error);
        }
    }

    const getNewNotification = (req, res) => {
        try {
            createNotification(req, res)
        } catch (error) {
            
        }
    }
