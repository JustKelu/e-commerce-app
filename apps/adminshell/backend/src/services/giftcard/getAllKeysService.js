const getAllKeysRepo = require('../../repositories/giftcard/getAllKeysRepo');

const getAllKeysService = async () => {
    return await getAllKeysRepo();
};

module.exports = getAllKeysService;