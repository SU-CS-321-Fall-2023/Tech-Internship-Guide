const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  content: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }], 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  content: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }], // Array of user IDs who liked the post
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  replies: [replySchema],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };
