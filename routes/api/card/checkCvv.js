const Card = require('../../../models/Card');

module.exports = function(req, res){
    let params = req.params;
    Card.find({cardNumber: params.cardNumber}, function(err, result){
       if(err) throw err;
       let card = result[0];
       if(card.cvv === params.cvv){
           res.send({status: "you entered the right cvv"});
       }else{
           res.send({status: "wrong cvv entered"});
       }
    });
};