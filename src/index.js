const express = require('express');
const handlebars = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const sortMiddleware = require('./app/middlewares/SortMiddleware');

const path = require('path');
const app = express();
const port = 3001

//static file
app.use(express.static(path.join(__dirname, 'public')));

// query string parameter
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//overide method
app.use(methodOverride('_method'));

//middleware
app.use(sortMiddleware);

//express-handlebars
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers: {
        slice: (a, b, c) => {
            if (a === null) {
                return;
            }
            return a.slice(b, c);
        },
        sortable: (field, sort) => {
            const sortType = field == sort.column ? sort.type : 'default';

            const icons = {
                default: 'oi oi-elevator',
                asc: 'oi oi-chevron-bottom',
                desc: 'oi oi-chevron-top'
            }

            const types = {
                default: 'asc',
                asc: 'desc',
                desc: 'asc'
            }

            const icon = icons[sortType];
            const type = types[sortType]

            return `<a href="?_sort&column=${field}&type=${type}">
            <span class="${icon}"></span>
        </a>`
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// router
route(app);

//connect db
db.connect();

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})