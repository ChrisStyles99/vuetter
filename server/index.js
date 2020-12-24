const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./database/db');
const users = require('./routes/users');
const posts = require('./routes/posts');
require('./database/asociations');

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 3000;

const verifyToken = require('./middlewares/verifyToken');

// Middlewares
app.use(cors({credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Routes
app.use('/api/users', users);
app.use('/api/posts', verifyToken, posts);

app.listen(PORT, () => {
  console.log('Server on port ' + PORT);

  // Conectarse a la DB
  // force true: DROP TABLES
  sequelize.sync({force: false}).then(() => {
    console.log('DB Connected');
  }).catch(err => {
    console.log(err);
  });
});