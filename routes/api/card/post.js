const Card = require('../../../models/Card');

module.exports = function(req, res){

  console.log("entered the function");

  const data = Object.assign({}, req.body);

  if( !data.cardNumber.length  || !data.cvv.length || !data.name.length || !data.expiry.length ){

      if(!data.cardNumber){
          res.locals.cardNumberNotValid = true;
      }
      if(!data.cvv){
          res.locals.cvvNotValid = true;
      }
      if(!data.name){
          res.locals.nameNotValid = true;
      }
      if(!data.expiry){
          res.locals.dateNotValid = true;
      }
      res.render('cardsList');

  } else {
      if(data.cardNumber.isNaN() || (/^\d{16}$/.exec(data.cardNumber))){
          res.locals.cardNumberNotValid = true;
      }
      if((/^[a-z\s]$/i.exec(data.name))){
          res.locals.nameNotValid = true;
      }
      if(data.cvv.length > 3 || (/^[0-9]+/).exec(data.cvv)){
          res.locals.cvvNotValid = true;
      }
      res.render('cardsList');
  }

  console.log("the data retrieved is:", data);

  Card.find({cardNumber: data.cardNumber}, function(err, result){

      console.log('entered the find function callback', result);

      if(err){
          res.send({status: err});
      }

      if(result.length){
          res.send({status: 'card already present!'});
      }

      let newCard = new Card(data);

      console.log("the new card formed is:", newCard);

      newCard.save(function(err){

          if(err) {
              res.send({status: err});
          }
          else{
              console.log('card saved!', newCard);
              res.locals.submitted = true;
              Card.find({}, function(err, result){
                  if(err) throw err;
                  res.locals.cards = result;
                  res.render('cardsList');
              });
          }

      });
  });
};