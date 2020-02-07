
// Import mock data
const merchants = require("../testdata/testdata");
const user = require("../models/user")



let controller = {

    showSplashPage: (req, res) => {

        let merchant = merchants.merchant1; // Consume/process merchant data received
        
    
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

        let currentUserId = req.body.userId;
        // query the database to know if the user exists
        let existingUser = await user.find({user_id: currentUserId});

        try {

            if(existingUser[0] === undefined) {
                // create the user and push the referral code
                user.create(userObj, (err, userInput) => {
                    if(err) {
                        throw "unable to create user"
                    } else {
                        userInput.used_referrals.push(req.body.referral)
                        userInput.save();
                    }
                })
                res.render("main.ejs")
                
            } else {
                
                // if the user exists, just push in the referral code after checking that it hasn't been used
                existingUser.forEach((activeUsers) => {
                    // console.log(activeUsers.used_referrals, "actoive")
                    let existingReferral = activeUsers.used_referrals.indexOf(req.body.referral);
                    // console.log(existingReferral)
                    if (existingReferral !== -1) {
                        // console.log("existing")
                        return res.redirect("/");
                    } else {
                        // console.log("non existent")
                        activeUsers.used_referrals.push(req.body.referral);
                        activeUsers.save();
                       return res.render("main.ejs")
                    }
                })
            }
        } catch (e) {
            console.log(e, "caught error")
        }









           
    },

























    // checkUser: (req, res, next) => {
    //     //If user exists already, don't do anything. Just push the referral code
    //     let currentUserId = req.body.userId;

    //     user.find({user_id: currentUserId}, (err, found) => {
    //         if(err) {
    //             console.log(err)
    //         } else if(found !== []) {
    //             found.forEach((item) => {
    //             item.used_referrals.push(req.body.referral)
    //             item.save();
    //             })
    //             res.render("main.ejs")
    //         } else {
    //             next();
    //         }
            
    //     })
    // },


    // checkReferral: (req, res, next) => {
    //     let currentUserId = req.body.userId;

    //     user.find({user_id: currentUserId}, (err, currentUser) => {
    //         if (err) {
    //             console.log(err)
    //         } else {
                
    //             currentUser.forEach((activeUsers) => {
    //                 console.log(activeUsers.used_referrals)
    //                 let existingReferral = activeUsers.used_referrals.indexOf(req.body.referral);
    //                 if(existingReferral !== -1) {
    //                     console.log("existing")
    //                     res.redirect("/");
    //                 } else {
    //                     next();
    //                 }
            
                    
    //             //     activeUsers.used_referrals.forEach((referralUsed) => {
                        
    //             //         // if (referralUsed == req.body.referral) {
    //             //         //     res.redirect("/")    
    //             //         //     console.log("This referral has been used before");
    //             //         // }
    //             //         //  else {
    //             //         //     next();
    //             //         // } 
    //             //     })
    //             })
    //         }
    //     })
    // }, 




}

module.exports = controller;