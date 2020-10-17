const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose); //This loads this module to mongoose

const Currency = mongoose.Types.Currency;   //This now becomes a particular data-type of our mongoose

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

const foodSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true},
    label: {type:String,default: ""},
    price: {type: Currency, required: true, min: 0},
    comments: [ commentSchema ]
},
{
    timestamps: true
})

module.exports = mongoose.model("Food", foodSchema);