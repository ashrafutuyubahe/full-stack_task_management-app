
const mongoose= require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/taskmanager';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
 }).then(() => {
    console.log( 'Connected to MongoDB');
  }).catch(err => {
    console.error('Could not connect to MongoDB', err);
  });
  