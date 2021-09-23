const mongoose = require('mongoose');

const systemSchema = mongoose.Schema({
    category: {
        type: String,
    },
    title: {
        type: String,
    },
    subtitle: {
        type: String,
    },
    sections: {
        type: Array,
    },
});

module.exports = mongoose.model('systems', systemSchema);
