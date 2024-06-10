const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Food = new Scheme({
    name: {type: String, maxLength: 255},
    price:{type: Number},
    image: {type: String},
},{
    timestamps: true
})
module.exports = mongoose.model("food",Food);