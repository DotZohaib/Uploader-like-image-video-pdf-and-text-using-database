const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
  date: { type: Date, default: Date.now },
  content: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Reference User model for likes
});

// Add a method to toggle a user's like for a post
postSchema.methods.toggleLike = async function(userId) {
  const liked = this.likes.some(like => like._id.toString() === userId);

  if (liked) {
    this.likes = this.likes.filter(like => like._id.toString() !== userId);
  } else {
    // Ensure only one like per user (optional)
    if (this.likes.length > 0 && this.likes.some(like => like._id.toString() === userId)) {
      return { success: false, error: 'User already liked the post' };
    }

    this.likes.push(userId);
  }

  await this.save();
  return { success: true, likesCount: this.likes.length };
};

module.exports = mongoose.model('Post', postSchema);
