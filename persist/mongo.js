//pull in mongoose
const mongoose = require('mongoose');
// rename mongoose connection
const db = mongoose.connection;

const connectionString = `mongodb://{};{}@{host}:{port}/{database}`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
