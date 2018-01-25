const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String
  },
  // category: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Category' // Category starts with a capital "C" meaning it's a model
  // },
  description: {
    type: String
  }
  // image: String
});

module.exports = mongoose.model('Post', PostSchema);
