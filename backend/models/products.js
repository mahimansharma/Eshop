const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    id : {
        type: Number
    },
    pic: {
        type: String
    },
    brand: {
        type: String
    },
    name: {
        type: String
    },
    quality: {
        type: String
    },
    price: {
        type: String
    },
    des: {
        type: String
    },
    high1: {
        type: String
    },
    high2: {
        type: String
    },
    high3: {
        type: String
    },
    high4: {
        type: String
    },
    high5: {
        type: String
    },
    high6: {
        type: String
    },
    high7: {
        type: String
    },
    high:{
        type: Array
    },
    inStock: {
        type: Number
    },
    

}, { timestamps: true} )

const Products = mongoose.model('mobiles', productSchema);

module.exports = { Products }