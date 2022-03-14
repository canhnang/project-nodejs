const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Todo = new Schema({
    name: String,
    desc: String,
    time: { type: String, max: 4, default: null },
    isSuccess: { type: Boolean, default: false },
    slug: { type: String, slug: 'name', unique: true },
    successedAt: { type: Date, default: null }
}, {
    timestamps: true,
});

mongoose.plugin(slug);
Todo.plugin(mongoose_delete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Todo', Todo);