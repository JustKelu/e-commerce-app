const pool = require('../../utils/database');

const getAllKeysRepo = async () => {
    const result = await pool.query(
        'SELECT code, value, used, created_at FROM giftcards ORDER BY created_at DESC'
    );
    return result.rows;
};

module.exports = getAllKeysRepo;