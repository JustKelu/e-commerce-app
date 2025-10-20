const notificationsRepo = require('../../repositories/business/myNotificationsRepo');

const notificationsServices = async (userData) => {
    if (userData.userType !== 'business') throw new Error('Only business account can access this route.');

    const result = await notificationsRepo(userData.userId);

    return result;
}

module.exports = notificationsServices;