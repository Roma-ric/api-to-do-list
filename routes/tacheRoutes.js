const express = require('express');
const router = express.Router();
const TacheController = require('../controller/tachesController');
const multer = require('../middleware/multer-config');

router.get('/', TacheController.getAllTache);

router.get('/:id', TacheController.getOneTache);

router.post('/', multer, TacheController.createTache);

router.put('/:id', multer, TacheController.updateAllThingTache);

router.patch('/:id', multer, TacheController.updateSomeThingTache);

router.delete('/:id', TacheController.deleteOneTache);

module.exports = router;
