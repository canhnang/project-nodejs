const express = require('express');
const router = express.Router();

const TrashController = require('../app/controllers/TrashController');

router.get('/todos', TrashController.index);

router.delete('/todos/force-delete/:id', TrashController.forceDelete);

router.patch('/todos/restore/:id', TrashController.restore);

router.post('/todos/handle-action-form', TrashController.handleActionForm);


module.exports = router;