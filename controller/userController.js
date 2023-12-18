const UserT = require('../models/user');

exports.getAllUserT = function (req, res) {
    UserT.find()
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error))
};

exports.getOneUserT = function (req, res) {
    UserT.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};

exports.createUserT = function (req, res) {
    delete req.body.id;

    const user = new UserT({
        ...req.body
    });
    
    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur enregistré !' })) 
        .catch(error => res.status(400).json({ error }));                       
};

exports.updateAllThingUserT = function (req, res) {
    UserT.updateOne({ _id: req.params.id }, { ...req.body, id: req.params.id })
        .then(() => res.status(200).json({ message: 'Utilisateur modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.updateSomeThingUserT = async function (req, res) {
    const user = await UserT.findOne({ _id: req.params.id });

    const updates = req.body;
    for (const [key, value] of Object.entries(updates)) {
        user[key] = value;
    }

    await user.save();

    res.status(200).json({ message: 'Utilisateur modifié !' });
};

exports.deleteOneUserT = function (req, res) {
    UserT.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
        .catch(error => res.status(400).json({ error }));
}; 