const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect('mongodb://localhost/dbTodo');
    try {
        console.log('connect successfully');
    } catch (error) {
        console.log('connect failure. Error: ' + error);
    }
}

module.exports = { connect };