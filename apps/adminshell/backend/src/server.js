require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/auth/authRoutes');
const giftCard = require('./controllers/giftcard/giftCard');
const { getAllKeys } = require('./controllers/giftcard/getAllKeys');

app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.get('/get-all-keys', getAllKeys);
app.post('/generate-key', giftCard);


app.listen(PORT, () => {
    console.log('Server is running on http://localhost:8001');
});