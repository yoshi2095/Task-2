const keystone = require('keystone');
const handlebars = require('express-handlebars');

keystone.init({
   'cookie secret': 'some cookie secret string',
   'name': 'my-project',
   'user model': 'User',
   'auth': true,
   'auto update': true,
    views: 'templates/views',
   'view engine': '.hbs',
    'custom engine' : handlebars.create({
        extname: '.hbs',
        helpers: {
            check: function (index) {
                console.log('the object passed is', index );
            }
        }
    }).engine
});

keystone.set('routes', require('./routes'));

keystone.import('./models');

keystone.start();