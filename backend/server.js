const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postsRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/login', authRoutes);
app.use('/posts', postsRoutes);

app.listen(3000, '0.0.0.0', () => {
  console.log('🚀 Servidor rodando em http://0.0.0.0:3000');
});