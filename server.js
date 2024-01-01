// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connection Successful'))
    .catch((err) => console.log(err.message));

const authRouter = require('./routes/auth-router');
const sessionRouter = require('./routes/session-router');

app.use('/warden', authRouter);
app.use('/sessions', sessionRouter);

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
