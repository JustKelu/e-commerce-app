const pool = require('../../utils/database');

const notificationsRepo = async (userId) => {
    const query = 'SELECT * FROM notifications WHERE seller_id = $1 ORDER BY created_at DESC LIMIT 3';
    const values = [userId];

    const result = await pool.query(query, values);

    return result.rows;
}

module.exports = notificationsRepo;