const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
