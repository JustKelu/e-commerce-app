const pool = require('../utils/database');

const createUser = async (userData) => {
    const query = `
        INSERT INTO users 
        (name, surname, address_street, address_number, address_city, address_zip, phone_number, email, password_hash, user_type) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING id, name, surname, email, user_type
    `;

    const values = [
        userData.name,
        userData.surname,
        userData.addressStreet,
        userData.addressNumber,  
        userData.addressCity,   
        userData.addressZip,   
        userData.phone_number,    
        userData.email,
        userData.passwordHash,
        userData.userType,
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
}

const findUserByEmail = async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
};

module.exports = { createUser, findUserByEmail };