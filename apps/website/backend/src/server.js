require('dotenv').config();
const express = require('express')
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const frontend = process.env.FRONTEND || "localhost";
const frontendPORT = process.env.FRONTEND_PORT || 3000;

app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: `${frontend}:${frontendPORT}`, 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(cookieParser());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const businessRoutes = require('./routes/businessRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/business', businessRoutes);

app.use((req, res, next) => {
  const err = new Error("Route not found");
  err.statusCode = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server online on port: " + PORT)
});