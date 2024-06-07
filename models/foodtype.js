const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const FoodType = new Scheme({
    name: {type: String, maxLength: 255},
    image: {type: String}
},{
    timestamps: true
})
module.exports = mongoose.model("foodtype",FoodType);
