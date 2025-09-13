const giftCardRepo = require('../../repositories/giftcard/giftCardRepo');
const keygen = require('../../utils/keygen');

const giftCardService = async (value) => {
    const key = keygen();
    const result = await giftCardRepo(key, value);
    return result;
}

module.exports = giftCardService;