const Tache = require('../models/tache');
const fs = require('fs');

exports.getAllTache = function (req, res) {
    Tache.find()
        .then(taches => res.status(200).json(taches))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneTache = function (req, res) {
    Tache.findOne({ _id: req.params.id })
        .then(taches => res.status(200).json(taches))
        .catch(error => res.status(400).json({ error }));
};

exports.createTache = function (req, res) {
    if (!req.file) {
        return res.status(400).json({ error: "Aucun fichier n'a été téléchargé." });
    }
    delete req.body.id;
    const fileUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const tache = new Tache({
        ...req.body,
        image: fileUrl
    });
    tache.save()
        .then(() => res.status(201).json({ message: 'Tâche enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.updateAllThingTache = async function (req, res) {
    try {
        const tacheObject = {
            ...req.body,
            image: req.file
                ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                : undefined,
        };

        const updatedTache = await Tache.findOneAndUpdate(
            { _id: req.params.id },
            tacheObject,
            { new: true }
        );

        if (!updatedTache) {
            return res.status(404).json({ message: "La tâche n'a pas été trouvée" });
        }

        res.status(200).json({ message: 'Tâche modifiée!', tache: updatedTache });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la tâche :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de la tâche' });
    }
};

exports.updateSomeThingTache = async function (req, res) {
    // Récupérer la tâche à mettre à jour
    const tache = await Tache.findOne({ _id: req.params.id });

    // Appliquer les modifications à la tâche
    const updates = req.body;
    for (const [key, value] of Object.entries(updates)) {
        tache[key] = value;
    }

    // Enregistrer la âche mis à jour
    await tache.save();

    // Renvoyer une réponse réussie
    res.status(200).json({ message: 'Tâche modifié !' });
};

exports.deleteOneTache = function (req, res) {
    Tache.findOne({ _id: req.params.id })
        .then(tache => {
            if (!tache) {
                return res.status(404).json({ message: "Tâche non trouvée" });
            }

            const filename = tache.image.split('/images/')[1];

            fs.unlink(`images/${filename}`, (unlinkError) => {
                if (unlinkError) {
                    return res.status(500).json({ error: "Erreur lors de la suppression de l'image" });
                }

                Tache.deleteOne({ _id: req.params.id })
                    .then(() => {
                        res.status(200).json({ message: 'Tâche supprimée avec succès' });
                    })
                    .catch(error => res.status(401).json({ error }));
            });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
}

