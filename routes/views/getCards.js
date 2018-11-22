let mongoose = require('mongoose');
const Card = require('../../models/Card');

module.exports = function(req, res){

  //console.log("entered the view method");

  let allCards = [];

  Card.find({}, function(err, result){
      if(err) throw err;
      console.log("the result is:",result);
      allCards = result;
      res.render('cardsList', {
          cards : allCards,
          // helpers: {
          //     check: function(cardNumber){
          //         console.log("the object is", cardNumber);
          //     }
          // }
      });
  });

};