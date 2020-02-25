const express = require("express");
const router = express.Router();

// Require controllers
const controller = require("../controller/controller");

// Require validation for input
const validateInput = require("../validation/validation");




// configure get request to handle screen display (get request)
router.get("/", controller.showSplashPage)

// Main page 
router.get("/main", controller.redirectToMainPage)


// Handle what happens for screens that do not require user input and input validations
router.post("/main", controller.clickToContinue)


// Handle user input from merchant1 users
router.post("/",validateInput ,controller.handleQuestionnaireInput)


module.exports = router;
