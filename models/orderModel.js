const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    food: {type: mongoose.Schema.Types.ObjectId, ref: "Food"},
    quantity: {type: Number, required: true},
    delivered: {type: Boolean, default: false},
    note: {type: String},
    location: {type: String, required: true}
},{
    timestamps: true
})



module.exports = mongoose.model("Order", orderSchema);