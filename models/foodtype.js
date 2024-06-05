const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const FoodType = new Scheme({
    name: {type: String, maxLength: 255},
},{
    timestamps: true
})
module.exports = mongoose.model("foodtype",FoodType);
