const mongoose = require('mongoose');


const merchantSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    merchant_id: {
       type: String,
        required: true
    },

    logo: String,

    banner: String,

    special_request: Boolean,

    promo_limit: Number, // Number of hours

    html_page: String

});

let merchant = mongoose.model("merchant", merchantSchema);

module.exports = merchant;