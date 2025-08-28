const pool = require('../utils/database');

const userRepo = (userData) => {
    const getProfile = async () => {
        const query = `
            SELECT 
            name, surname, address_street, address_number, address_city, address_zip, phone_number, email 
            FROM users 
            WHERE id = $1 AND user_type = $2
        `;

        const values = [
            userData.userId,
            userData.userType,
        ];

        const result = await pool.query(query, values);

        return result.rows[0];
    }

    return { getProfile };
}


module.exports = userRepo;