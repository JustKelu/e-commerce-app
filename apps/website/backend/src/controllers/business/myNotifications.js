const notificationsServices = require('../../services/business/notificationsService');

const getNotifications = async (req, res, next) => {
    try {
        const userData = {
            userId: req.userId,
            userType: req.userType,
        }

        const result = await notificationsServices(userData);

        res.json({data: result});
    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = getNotifications;