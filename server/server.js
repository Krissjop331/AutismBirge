const dotenv = require('dotenv');
const express = require('express');
const app = express();
const db = require("./models/index.js");
const cookie = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.SERVER_PORT || 5000;
const ApiRouter = require("./routes/router.js");

dotenv.config();
app.use(cors({ origin: '*' }));
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use('/', ApiRouter);

const start = async() => {
  //  db.sequelize.sync({ alter: true });

    app.listen(PORT, () => {
        console.log(`Running at localhost:${PORT}`);
    })
}

start();