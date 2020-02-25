const mongoose = require('mongoose')

let user_schema = new mongoose.Schema({

    user_id:Number,

    email: String,

    used_referrals: [],

    merchant_id: String

});

let user = mongoose.model("user", user_schema);


module.exports = user;