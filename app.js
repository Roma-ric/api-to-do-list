const express = require('express'); //importer le framework express
const mongoose = require('mongoose'); //importer la bibliotheque mongoose
const app = express(); //Creer l'application
const path = require('path'); 
//Importer les routes
const tacheRoutes = require('./routes/tacheRoutes');
const userTRoutes = require('./routes/userRoutes');

//Politique de sécurité CORS (Cross-Origin Resource Sharing)
//Configurer le serveur pour autoriser les requêtes depuis le domaine d'origine de lancement des requêtes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//Etablir la connexion entre la base de données
mongoose.connect('mongodb+srv://romaric:intello@clusteressai.xfatgl1.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//Intercepter toutes les requêtes qui ont comme Content-Type  application/json et mettre à disposition leur  body  directement sur l'objet req
app.use(express.json());

//Endpoints
//Définir la réponse au request vers l'endPoint /images
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/taches", tacheRoutes);
app.use("/users", userTRoutes);

module.exports = app;