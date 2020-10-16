const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {type: String, required: true},
    food: {type: String, required: true},
    quantity: {type: Number, required: true},
    delivered: {type: Boolean, default: false},
    note: {type: String}
},{
    timestamps: true
})

const userSchema =  new Schema({
    username: {type: String, unique:true},
    password: {type: String},
    firstname: {type: String, default: ""},
    lastname: {type: String, default: ""},
    admin: {type: Boolean, default: false},
    orders: [orderSchema]
})

module.exports = mongoose.model("User", userSchema);