const pool = require('../../utils/database');

const giftCardRepo = async (key, value) => {
    const result = await pool.query(
        'INSERT INTO giftcards (code, value) VALUES ($1, $2) RETURNING *',
        [key, value]
    );
    return result.rows[0];
}

module.exports = giftCardRepo;