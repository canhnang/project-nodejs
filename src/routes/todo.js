const express = require('express');
const router = express.Router();

const TodoController = require('../app/controllers/TodoController');

router.get('/add-work', TodoController.formAdd);

router.post('/handle-action-form', TodoController.handleActionForm);

router.get('/:id/update', TodoController.showUpdate);

router.get('/:slug', TodoController.workDetail);

router.put('/:id', TodoController.update);

router.patch('/:id/check-work', TodoController.checkWork);

router.post('/add', TodoController.addWork);

router.get('/', TodoController.listTodo);

router.delete('/:id/soft-delete', TodoController.destroy)


module.exports = router;