const Todo = require('../models/Todo');
const mongoose = require('../../util/mongoose');

function TodoController() { }

// [GET] /todos
TodoController.prototype.listTodo = (req, res, next) => {
    Todo.find({ isSuccess: false })
        .then((todos) => res.render('home', {
            todos: mongoose.convertMongoosesToObject(todos),
        }))
        .catch(next)
}

// [POST] /todos/add
TodoController.prototype.addWork = (req, res, next) => {
    const newWork = req.body;
    newWork.time = newWork.hours ? `${newWork.hours}:${newWork.minutes}` : '';
    const todo = new Todo(newWork);
    todo.save()
        .then(() => res.redirect('/todos'))
        .catch(next)

}

// [GET] /todos/add-work
TodoController.prototype.formAdd = (req, res, next) => {
    res.render('addWork');
}

// [PATCH] /todos/:id/check-work
TodoController.prototype.checkWork = (req, res, next) => {
    const now = new Date();
    Todo.updateOne({ _id: req.params.id },
        {
            isSuccess: true,
            successedAt: now
        })
        .then(() => res.redirect('/todos/'))
        .catch(next)
}

// [GET] /todos/:id/update
TodoController.prototype.showUpdate = (req, res, next) => {
    Todo.findById({ _id: req.params.id })
        .then((todo) => res.render('updateWork', {
            todo: mongoose.mongooseToObject(todo),
        }))
        .catch(next)
}

// [PUT] todos/:id
TodoController.prototype.update = (req, res, next) => {
    const todo = req.body;
    if (todo.hours !== null) {
        todo.time = `${todo.hours}:${todo.minutes}`;
    }
    Todo.updateOne({ _id: req.params.id }, todo)
        .then(() => res.redirect('/todos'))
        .catch(next)
}

// [GET] todos/:slug
TodoController.prototype.workDetail = (req, res, next) => {
    Todo.findOne({ slug: req.params.slug })
        .then(todo => res.render('workDetail', {
            todo: mongoose.mongooseToObject(todo)
        }))
        .catch(next)
}

// [DELETE] todos/:id/soft-delete
TodoController.prototype.destroy = (req, res, next) => {
    Todo.delete({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next)
}

// [POST] todos/handle-action-form
TodoController.prototype.handleActionForm = (req, res, next) => {
    switch (req.body.action) {
        case 'delete':
            Todo.delete({ _id: { $in: req.body.checkWorks } })
                .then(() => res.redirect('back'))
                .catch(next)
            break;
        case 'success':
            Todo.updateMany({ _id: { $in: req.body.checkWorks } },
                { isSuccess: true })
                .then(() => res.redirect('back'))
                .catch(next)
            break;
        default:
            res.json({ msg: 'error' })
            break;
    }
}

module.exports = new TodoController();