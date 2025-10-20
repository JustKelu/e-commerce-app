const pool = require('../../utils/database');

const recentOrdersRepo = async () => {
    try {
        const response = await pool.query(`
            SELECT 
                o.id AS orderId, o.total_amount AS total,
                o.created_at AS date, u.name, u.surname, o.status    
            FROM orders o
            LEFT JOIN users u ON o.user_id = u.id  
            ORDER BY o.created_at DESC LIMIT 5
            `
        );

        return response.rows
    } catch (err) {
        console.log(err);
        throw new Error('Impossibile ricevere gli ordini recenti')
    }
}

module.exports = recentOrdersRepo;