const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Food = new Scheme({
    category: {type: String},
    name: {type: String, maxLength: 255},
    foodType: {type: String},
    price:{type: Number},
    image: {type: String}
},{
    timestamps: true
})
module.exports = mongoose.model("food",Food);