const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');

const { getProfile, getBalance, addBalance } = require("../controllers/myUser");

const { getCart, addCart, removeCart, checkout } = require('../controllers/myCart');

router.get('/profile', verifyToken, getProfile);
router.get('/balance', verifyToken, getBalance);
router.post('/balance', verifyToken, addBalance);

router.post('/add-cart', verifyToken, addCart);
router.get('/cart', verifyToken, getCart);
router.delete('/remove-cart', verifyToken, removeCart);
router.post('/checkout', verifyToken, checkout)

const pool = require('../utils/database');

const getProduct = async (req, res, next) => {
    try {
        const data = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
        const product = data.rows[0];
        res.status(200).json({product});
    } catch (err) {
        next(err)
    }
}

const getProducts = async (req, res, next) => {
    if (req.query.search) {
        try {
            console.log('query ricevuta')
            const data = await pool.query(`
                SELECT *,
                    ts_rank(search_vector, to_tsquery('italian', $1)) AS relevance
                FROM products
                WHERE search_vector @@ to_tsquery('italian', $1)
                ORDER BY relevance DESC
                LIMIT 20
            `, [req.query.search.replace(/ /g, ' | ')]);
            res.json(data.rows)
        } catch (err) {

        }
    } else {
        try {
            const data = await pool.query('SELECT * FROM products ORDER BY RANDOM() LIMIT 10');
            res.json(data.rows);
        } catch (error) {
            console.error('Error retrieving products:', error);
            next(err)
        }
    }
}

router.get('/products', getProducts);
router.get('/product/:id', getProduct);

module.exports = router;