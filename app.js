// Configure express
const express = require('express');
let app = express();
//Configure body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}))
// Configure express validator
const { check, validationResult } = require('express-validator');


// Set up mock data
let merchants = {
    "merchant1": {
        "name": "wicrypt_001",
        "user1": true,
        "id": "001",
        "logo": "",
        "banner": "",
        "html_page": "merchant1.ejs"
    },

    "merchant2": {
        "name": "wicrypt_002",
        "user2": true,
        "id": "002",
        "logo": "",
        "banner": "",
        "html_page": "merchant2.ejs"
    },

    "merchant3": {
        "name": "wicrypt_003",
        "user3": true,
        "id": "003",
        "logo": "",
        "banner": "",
        "html_page": ""
    }
}

let questionObj = {
    email: "",
    username: "",
    referrer_id: "",

}


// configure get request to handle screen display (get request)
app.get("/", (req, res) => {

    let merchant = merchants.merchant3; // Consume/process merchant data received

    // Checks if the merchant specified a unique page to be shown
    if (merchant.html_page == "") {
        res.render("index.ejs")
    }
        res.render(`${merchant.html_page}`);

})

// Main page 
app.get("/main", (req, res) => {
    res.render("main.ejs")
})


// Handle what happens for screens that do not require user input and input validations
app.post("/main",(req, res) => {
    res.redirect("/main")
})


// Handle user input from merchant1 users
app.post("/", [
    check("email", "Invalid email input").isEmail().notEmpty().trim(),
    check("referrer", "invalid referrer code").isNumeric().notEmpty().trim(),
    check("username", "username can't be empty").notEmpty().trim(),
], (req, res) => {

    
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() })
        }

    questionObj.email = req.body.email;
    questionObj.referrer_id = req.body.referrer;
    questionObj.username = req.body.username;

    res.render("main.ejs")


})






// Listener configuration
app.listen(process.env.PORT || 3000, () => {
    console.log("running on 3k")
})
