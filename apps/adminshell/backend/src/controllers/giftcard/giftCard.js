const gidtCardService = require('../../services/giftcard/giftCardService');

const giftCard = async (req, res) => {
    if (req.body.value === '5' || req.body.value === '10' || req.body.value === '25' || req.body.value === '50' || req.body.value === '100') {
        const key = await gidtCardService(req.body.value);
        res.json({ key });
    } else {
        res.status(400).json({ error: 'Valore non valido. I valori accettati sono 5, 10, 25, 50, 100.' });
    }
};

module.exports = giftCard;