const keystone = require('keystone');

const User = keystone.List('User');

let Types = keystone.Field.Types;

User.add({
    displayName: {type: String},
    email: {type: Types.Email},
    password: {type: Types.Password, unique: true}
});

User.schema.virtual('canAccessKeystone').get(function(){
    return true;
});

User.defaultColumns = 'id, displayName, email';

User.register();