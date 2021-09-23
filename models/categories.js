const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    number: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
    }
});

module.exports = mongoose.model('categories', categorySchema);
