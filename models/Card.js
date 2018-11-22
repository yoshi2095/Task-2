let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const cardSchema = new Schema({
    name: {type: String, unique:true},
    cardNumber: {type: Number, unique:true},
    expiry: {type: Date},
    cvv: {type: Number}
});

let Card = mongoose.model('Card', cardSchema);

module.exports = Card;


