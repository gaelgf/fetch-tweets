const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tweetSchema = new Schema({
  created_at:{
    type: String,
    default: '',
    trim: true
  },
  id_str: {
    type: String,
    default: '',
    trim: true
  },
  entities: {
    hashtags: [{text:{ type: String, default: '', trim: true}}]
    },
  lang: {
    type: String,
    default: '',
    trim: true
  },
  text: {
    type: String,
    default: '',
    trim: true
  }
});


module.exports = mongoose.model('Tweet', tweetSchema);
