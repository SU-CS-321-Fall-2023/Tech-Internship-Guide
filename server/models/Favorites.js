const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    blockData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blockDatas',
        required: true
    }
});

module.exports = mongoose.model('Favorite', FavoriteSchema);