const Todo = require('../models/Todo');
const mongoose = require('../../util/mongoose');

function SuccessController() { }

SuccessController.prototype.index = (req, res, next) => {

    let todos = Todo.find({ isSuccess: true });
    if (req.query.hasOwnProperty('_sort')) {
        todos.sort({
            [req.query.column]: req.query.type
        })
    }
    todos
        .then(todos => res.render('success', {
            todos: mongoose.convertMongoosesToObject(todos)
        }))
        .catch(next)
}

module.exports = new SuccessController();