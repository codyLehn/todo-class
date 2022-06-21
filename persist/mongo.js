//pull in mongoose
const mongoose = require('mongoose');
// rename mongoose connection
const db = mongoose.connection;

function connect(user, password, host, port, db) {
  const connectionString = `mongodb+srv://user:password@cluster0.kygdq0t.mongodb.net/?retryWrites=true&w=majority`;

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
//what should happen when start connecting
function setUpConnectionHandlers(callback) {
  db.once('connecting', () => {
    console.log('connecting to MongoDB');
  });
  //what should happen when connected
  db.once('connected', () => {
    console.log('connected to MongoDB');
  });
  //what should happen when opens
  db.once('open', () => {
    console.log('open connection to MongoDB');
    callback();
  });
  //what should happen when error
  db.once('error', () => {
    console.log('Error connecting to MongoDB');
  });
}
//export the functions
module.exports = {
  connect: connect,
  setUpConnectionHandlers,
};
