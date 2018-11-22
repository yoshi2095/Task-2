const Card = require('../../../models/Card');

module.exports = function(req, res){
    let params = req.query;
    console.log(params);
    Card.find({cardNumber: params.number}, function(err, result){
       if(err) throw err;
       let card = result[0];
       if(card.cvv.toString() === params.cvv){
           res.send({status: "you entered the right cvv"});
       }else{
           res.send({status: "wrong cvv entered"});
       }
    });
};