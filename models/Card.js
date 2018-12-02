const bcrypt = require('bcrypt');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const saltRounds = 10;

const cardSchema = new Schema({
    name: {type: String, unique:true, required: true},
    cardNumber: {type: Number, unique:true, required: true},
    expiry: {type: Date, required: true},
    cvv: {type: String, required: true} //because it needs to be encrypted and will store a hash, therefore cant be a number
});

cardSchema.pre('save', function(next){

    console.log('Entered the pre function', this);

    let card = this;

    if(!card.isModified('cvv')) {
        return next();
    }

    bcrypt.genSalt(saltRounds, function(err, salt){

        if(err) return next(err);

        console.log("pre function salt generated is:", salt);

        bcrypt.hash(card.cvv, salt, function(err, hash){
            if(err) return next(err);
            console.log("hash generated is:", hash);
            card.cvv = hash;
            console.log(card.cvv);
            next(card);
        });
    });
});

let Card = mongoose.model('Card', cardSchema);

module.exports = Card;


