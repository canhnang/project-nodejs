const todoRoute = require('./todo');
const successRoute = require('./success');
const trashRoute = require('./trash');
const loginRoute = require('./login');


module.exports = route = (app) => {

    app.use('/todos', todoRoute);

    app.use('/success', successRoute);

    app.use('/trash', trashRoute);

    app.use('/login', loginRoute);

}