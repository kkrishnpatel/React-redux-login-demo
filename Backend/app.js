require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors())

app.use('/user', require('./routes/userRoutes'));
require('./db/mongoose')

// This should be the last route else any after it won't work
app.use("*", (req, res) => {
    res.status(404).json({
        message: "You reached a route that is not defined on this server",
    });
});

module.exports = app;
