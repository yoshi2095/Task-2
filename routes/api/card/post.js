const Card = require('../../../models/Card');

module.exports = function(req, res){

  console.log("entered the function");

  const data = Object.assign({}, req.body);

  console.log("the data retrieved is:", data);

  Card.find({cardNumber: data.cardNumber}, function(err, result){

      console.log('entered the find function callback', result);

      if(err){
          res.send({status: error});
      }

      if(result.length){
          res.send({status: 'card already present!'});
      }

      let newCard = new Card(data);

      console.log("the new card formed is:", newCard);

      newCard.save((err)=>{

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