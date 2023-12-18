const mongoose = require('mongoose');

const tacheSchema = mongoose.Schema({
    titre: {type: String, required: true},
    statut: {type: String, required: true},
    image: {type: String, required: true},
    idUser: {type: String, required: true}
}); 

/*
{
    "titre": "",
    "statut": "",
    "lien": "",
    "idUser": ""
}
*/

module.exports = mongoose.model("Tache", tacheSchema);

