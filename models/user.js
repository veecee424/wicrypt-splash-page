const mongoose = require('mongoose')

let user_schema = new mongoose.Schema({

    user_id: {
        type: Number,
        required: true
    },

    email: String,

    used_referrals: [],

});

let user = mongoose.model("user", user_schema);


module.exports = user;