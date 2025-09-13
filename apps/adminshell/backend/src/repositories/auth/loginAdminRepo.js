const pool = require('../../utils/database');

const loginAdminRepo = async (adminEmail) => {
    try {
        const query = 'SELECT id, type, password_hash FROM admin_users WHERE email = $1';
        const adminData = await pool.query(query, [adminEmail]);

        return adminData.rows[0];
    } catch (err) {
        throw err
    }
}
module.exports = loginAdminRepo;