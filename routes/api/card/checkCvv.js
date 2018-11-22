const bcrypt = require('bcrypt');
const Card = require('../../../models/Card');

const saltRounds = 10;

module.exports = function(req, res){

    let params = req.query;

    console.log(params);

    let cvv = params.cvv;

    console.log("cvv from params:", cvv);

    bcrypt.genSalt(saltRounds, function(err, salt){

        console.log("the salt generated is", salt);

        if(err) return next(err);

        bcrypt.hash(cvv, salt, function(err, hash){

            console.log("the hash generated is:", hash);

            let encryptedCvv = hash;

            Card.find({cardNumber: params.number}, function(err, result){
                if(err) throw err;
                let card = result[0];

                console.log("the card retrieved is:", card, card.cvv);

                if(card.cvv === encryptedCvv){
                    res.send({status: "you entered the right cvv"});
                }else{
                    res.send({status: "wrong cvv entered"});
                }
            });
        });
    });
};