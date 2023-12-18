const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
}); 
/*
{
    "nom": "",
    "prenom": "",
    "email": "",
    "password": "",
}
*/

// userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("UserT", userSchema);