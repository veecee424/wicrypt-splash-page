// Configure express validator
const { check, validationResult } = require('express-validator');


function validateInput (req, res, next) {
    
        check("email", "provide user email").notEmpty().trim().isEmail().withMessage('Invalid email');
        check("referral", "invalid referrer code").isNumeric().notEmpty().withMessage("cannot be empty").trim();
        check("username", "username can't be empty").notEmpty().trim();
    
        const errors = validationResult(req)
            if (errors) {
                // return res.status(422).json({ errors: errors.array() })
                return res.redirect("/")
            }
            next();
}



module.exports = validateInput;