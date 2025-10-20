require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: 'http://localhost:8081', 
    credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

const giftCard = require('./controllers/giftcard/giftCard');
const { getAllKeys } = require('./controllers/giftcard/getAllKeys');


const authRoutes = require('./routes/auth/authRoutes');
const ordersRoutes = require('./routes/orders/ordersRoutes');
const shipmentsRoutes = require('./routes/orders/shipmentsRoutes');
const dashboardRoutes = require('./routes/orders/dashboardRoutes');
const productsRoutes = require('./routes/products/productsRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/shipments', shipmentsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/products', productsRoutes);

const errorHandler = require('./middlewares/errorHandler');

app.use(errorHandler);

app.get('/get-all-keys', getAllKeys);
app.post('/generate-key', giftCard);


app.listen(PORT, () => {
    console.log('Server is running on http://localhost:8001');
});