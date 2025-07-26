require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const db = require('./models');

app.use(express.json());
app.use(cookieParser());

require('./routes/auth.routes')(app);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
