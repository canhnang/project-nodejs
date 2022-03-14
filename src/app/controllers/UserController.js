const User = require('../models/User');
const mongoose = require('../../util/mongoose');
const bcrypt = require('bcryptjs');

function UserController() { }

UserController.prototype.index = (req, res, next) => {
    res.render('auth/login', { msg: 'hahaha' });
}

UserController.prototype.verify = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user.password !== req.body.password) {
                return res.status(442).send({ message: 'Password is incorect!' });
            }
            return res.status(200).send('login successfully');
        })
        .catch(() => {
            res.status(442).send({ message: 'Email does not exist' });
        })

}

module.exports = new UserController();