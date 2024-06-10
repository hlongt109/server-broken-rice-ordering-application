const mongoose = require('mongoose')
const Scheme = mongoose.Schema

const OrderItem = new Scheme({
    category: {type: String},
    nameProduct: {type: String},
    imageProduct: {type: String},
    priceProduct: {type: Number},
    quantity: {type: Number}
})

const Order = new Scheme({
    customerName: {type: String},
    customerPhone: {type: String},
    items: [OrderItem],
    status: {type: String},
    totalPrice: {type: Number},
    houseNumber: {type: String},
    street: {type: String},
    ward: {type: String},
    district: {type: String},
    city: {type: String},
    date: {type: String},
    time: {type: String},
},{
    timestamps: true
})

module.exports = mongoose.model("order", Order)