const mongoose = require('mongoose'),
const couponSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
    code: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    otherDetails: {
        type: String
    }
});

module.exports = mongoose.model("Coupon", couponSchema);