const Card = require('../../../models/Card');

module.exports = function(req, res){

  console.log("entered the function");

  const data = Object.assign({}, req.body);

  console.log("the data retrieved is:", data);

  Card.find({cardNumber: data.cardNumber}, function(err, result){

      let cards = result;

      if(err){
          console.log("error is:", err);
      }

      if(cards.length){
          res.send({status: 'card already present!'});
      }else{
          let newCard = new Card(data);

          newCard.save((err)=>{
              if(err) res.locals.isError = true;
              else{
                  console.log('card saved!', newCard);

                  res.locals.submitted = true;
              }
              res.render('cardsList');
          });

      }
  });
};