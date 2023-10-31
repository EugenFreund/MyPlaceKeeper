const mongoose = require('mongoose');

const pinCollectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pin'
    }]
});

const PinCollection = mongoose.model('PinCollection', pinCollectionSchema);

module.exports = PinCollection;
