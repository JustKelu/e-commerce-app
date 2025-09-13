const getAllKeysService = require('../../services/giftcard/getAllKeysService');

const getAllKeys = async (req, res) => {
    try {
        const giftCards = await getAllKeysService();
        res.json({ giftCards });
    } catch (error) {
        res.status(500).json({ error: 'Errore nel recupero delle gift card' });
    }
};

module.exports = { getAllKeys };