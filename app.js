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
// const ejs = require("ejs")
app.set('view engine', 'ejs');

//Use and connect mongodb
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/wicrypt", {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function() {
    console.log("connection success");
});


// Create a merchant
let merchant = require("./models/merchant");




const createMerchant = () => {
    let merchantObj = {
        name: "merchant3",
        merchant_id: "wicrypt_003",
     
         logo: "http://itedgenews.ng/wp-content/uploads/2018/09/MTN.jpg",
     
         banner: "http://itedgenews.ng/wp-content/uploads/2018/09/MTN.jpg",
     
         special_request: true,
     
         promo_limit: 5, //In hours

         html_page: "<p>paragraph tag on fleek</p>"
    }
    try {

        merchant.create(merchantObj, (err, createdMerchant) => {
            if (err) {
                throw "Unable to create merchant"
            } else {
                console.log(createdMerchant)
            }
        })
    }

    catch (error) {
        console.log(err);
    }
    
}

// createMerchant();




// Use routes
app.use(routes);




// Listener configuration
app.listen(process.env.PORT || 3000, () => {
    console.log("running on 3k")
})
