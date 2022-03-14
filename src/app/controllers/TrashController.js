const Todo = require('../models/Todo');
const mongoose = require('../../util/mongoose');

function TrashController() { }

TrashController.prototype.index = (req, res, next) => {
    let todos = Todo.findDeleted({})
    if (req.query.hasOwnProperty('_sort')) {
        todos.sort({
            [req.query.column]: req.query.type
        })
    }
    todos
        .then(todos => res.render('trash', {
            todos: mongoose.convertMongoosesToObject(todos)
        }))
        .catch(next)
}

TrashController.prototype.restore = (req, res, next) => {
    Todo.restore({ _id: req.params.id })
        .then(() => res.redirect('/trash/todos'))
        .catch(next)
}

TrashController.prototype.forceDelete = (req, res, next) => {
    Todo.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('/trash/todos'))
        .catch(next)
}

TrashController.prototype.handleActionForm = (req, res, next) => {
    switch (req.body.action) {
        case 'delete':
            Todo.deleteMany({ _id: { $in: req.body.workIds } })
                .then(() => res.redirect('/trash/todos'))
                .catch(next)
            break;
        case 'restore':
            Todo.restore({ _id: { $in: req.body.workIds } })
                .then(() => res.redirect('back'))
                .catch(next)
            break;
        default:
            res.json({ msg: 'error' })
            break;
    }
}

module.exports = new TrashController();