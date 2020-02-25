// Configure express
const express = require('express');
let app = express();

//Configure body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}))

// import routes
const routes = require("./routes/route");

// CORS
const cors = require("cors");
app.use(cors());

// Use ejs
app.set('view engine', 'ejs');

//Configure dotenv
const dotenv = require("dotenv").config();

//Use and connect mongodb
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true, useUnifiedTopology: true});

//Database connection test
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function() {
    console.log("connection success");
});


// Use routes
app.use(routes);


// Listener configuration
app.listen(process.env.PORT || 3000, () => {
    console.log("running on 3k")
})
