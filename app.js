const express = require('express');
const cors = require('cors');

const app = express();

// allow frontend to connect
app.use(cors());

app.use(express.json());

const postsRoutes = require('./routes/posts');
app.use('/api/posts', postsRoutes);

module.exports = app;