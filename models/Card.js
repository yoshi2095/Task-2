const bcrypt = require('bcrypt');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const saltRounds = 10;

const cardSchema = new Schema({
    name: {type: String, unique:true},
    cardNumber: {type: Number, unique:true},
    expiry: {type: Date},
    cvv: {type: Number}
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

        bcrypt.hash(card.cvv.toString(), salt, function(err, hash){
            if(err) return next(err);
            console.log("hash generated is:", hash);
            card.cvv = hash;
            console.log(card.cvv);
            next();
        });
    });

    return next(card);
});

let Card = mongoose.model('Card', cardSchema);

module.exports = Card;


