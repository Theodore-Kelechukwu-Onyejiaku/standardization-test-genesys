const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema =  new Schema({
    username: {type: String, unique:true},
    password: {type: String},
    firstname: {type: String, default: ""},
    lastname: {type: String, default: ""},
    admin: {type: Boolean, default: false},
})

module.exports = mongoose.model("User", userSchema);