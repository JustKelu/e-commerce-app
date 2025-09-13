const pool = require('../utils/database');

const userRepo = (userId) => {
    const getProfile = async () => {
        const query = `
            SELECT 
            id, name, surname, address_street, address_number, address_city, address_zip, phone_number, email 
            FROM users 
            WHERE id = $1
        `;

        const values = [userId];

        const result = await pool.query(query, values);

        return result.rows[0];
    }

    const getBalance = async () => {
        const query = `SELECT balance FROM users WHERE id = $1`;

        const values = [userId];

        const balance = await pool.query(query, values);

        return balance.rows[0];
    }

    const addBalance = async (giftCard) => {
        const giftCardResult = await pool.query(
            "UPDATE giftcards SET used = true WHERE code = $1 AND used = false RETURNING value", 
            [giftCard]
        );
        
        if (giftCardResult.rows.length === 0) {
            throw new Error('Gift card non trovata o già utilizzata');
        }
        
        const amount = giftCardResult.rows[0].value;

        const updateQuery = `
            UPDATE users 
            SET balance = balance + $2 
            WHERE id = $1 
            RETURNING balance
        `;
    
        const updateValues = [userId, amount];

        const result = await pool.query(updateQuery, updateValues);

        return result.rows[0];
    }

    return { getProfile, getBalance, addBalance };
}


module.exports = userRepo;