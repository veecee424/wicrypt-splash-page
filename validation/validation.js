// Configure express validator
// const { check, validationResult } = require('express-validator');
const joi = require("@hapi/joi")



function validateInput (req, res, next) {


        const schema = joi.object().keys({
            email: joi.string().trim().email().required().messages({
                'string.base': 'Invalid email',
                'string.empty': 'Email is required',
                'any.requied': 'Email is required'
            }),
            userId: joi.number().required().min(6).messages({
                'number.base': 'Invalid user id. User ID must be numbers',
                'number.empty': 'User id field cannot be empty',
                'number.min': 'User Id cannot be less than 6 characters',
                'any.requied': 'Referral is required'
            }),
            
            referral: joi.number().required().min(11).messages({
                'number.base': 'Invalid referral, referrals must be numbers',
                'number.empty': 'Referral field cannot be empty',
                'number.min': 'Referral code should not be less than 11 characters',
                'any.requied': 'User id is required'
            }),
            
        })

       const {error} = schema.validate(req.body);

       if (error) {

           let main_error = error.details;

           main_error.forEach(err => {

               res.json(err.message);

           })

       } else {

           next();

       }
           
}



module.exports = validateInput;