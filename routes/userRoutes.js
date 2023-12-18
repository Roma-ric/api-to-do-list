const express = require('express');
const router = express.Router();
const UserTController = require('../controller/userController');

router.get('/', UserTController.getAllUserT);

router.get('/:id', UserTController.getOneUserT);

router.post('/', UserTController.createUserT);

router.put('/:id' ,UserTController.updateAllThingUserT);

router.patch('/:id' ,UserTController.updateSomeThingUserT);

router.delete('/:id', UserTController.deleteOneUserT);

module.exports = router;
