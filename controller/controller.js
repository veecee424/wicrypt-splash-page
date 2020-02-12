
// Import mock data
const merchants = require("../testdata/testdata");
const user = require("../models/user");
const timeCheck = require("../helpers/timecheck");





let controller = {

    showSplashPage: (req, res) => {

        let merchant = merchants.merchant1; // Consume/process merchant data received from wicrypt server to find out the merchant through which a user is logged in
        

        // Checks if the merchant specified a unique page to be shown
        if (merchant && merchant.special_request == false) {
            res.render("index.ejs")
        }
            res.render(`${merchant.html_page}`, {merchant: merchant});
    },

    
    redirectToMainPage: (req, res) => {
        res.render("main.ejs")
    },


    clickToContinue: (req, res) => {
        res.redirect("/main")
    },


    handleQuestionnaireInput: async (req, res) => {

        let userObj = {
            user_id: req.body.userId,
            email: req.body.email
        }

        let currentUserId = req.body.userId; //Consume information from wicrypt server to find get the current user id of the user who is logged in

        // query the database to know if the user exists
        let existingUser = await user.find({user_id: currentUserId});

        try {

            if(existingUser[0] === undefined) {
                // If the user doesn't exist in my database, create the user with information from the payload
                user.create(userObj, (err, userInput) => {

                    if(err) {

                        throw "unable to create user"

                    } else {
                        // userInput.used_referrals.push(req.body.referral)
                        // userInput.save();
                    
                       timeCheck(userInput, req)
              
                        
                    }
                })
                res.render("main.ejs")
                
            } else {
                
                // if the user exists, just push in the referral code after checking that it hasn't been used
                existingUser.forEach((activeUsers) => {

                    let existingReferral = activeUsers.used_referrals.indexOf(req.body.referral);

                    if (existingReferral !== -1) {
               
                        return res.redirect("/");
                    } else {
                        
                        //TIME CHECK HAPPENS HERE
                        
                        timeCheck(activeUsers, req)


                        // activeUsers.used_referrals.push(req.body.referral);
                        // activeUsers.save();
                       return res.render("main.ejs")
                    }
                })
            }
        } catch (e) {
            console.log(e, "caught error")
        }









           
    },




}




module.exports = controller;