require('dotenv').config();
const express = require('express')
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.PORT;
const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(cors());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.json({message: 'API Online!'});
})

app.listen(PORT, () => {
    console.log("Server online on port: " + PORT)
})
