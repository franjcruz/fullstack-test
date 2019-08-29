import mongoose from 'mongoose';

let item = mongoose.Schema({
  title: String
});

module.exports = mongoose.model('Item', item);
