const keystone = require('keystone');
const importRoutes = keystone.importer(__dirname);

const routes = {
  views: importRoutes('./views'),
  api: importRoutes('./api')
};

exports = module.exports = function(app){
  app.get('/', routes.views.index);
  app.get('/get-cards', routes.views.getCards);
  app.post('/api/card', routes.api.card.post);
  app.get('/api/card', routes.api.card.checkCvv);
};