const express = require("express"); // import express
const dotenv = require("dotenv").config(); // import dotenv
const colors = require("colors"); // import colors
const { errorHandler } = require("./middleware/errorMiddleware"); // custom error handler
const port = process.env.PORT || 6000; // set our port
const app = express();
const cors = require("cors"); 
const connectDB = require("./config/db"); // import db connection

connectDB(); // connect to db

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/admin', require('./routes/adminRoutes'));
app.use('/client', require('./routes/clientRoutes'));


app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}`));
