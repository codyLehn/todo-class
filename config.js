//put in env var
const dotenv = require('dotenv');

//put in command line flags
const flags = require('flags');
flags.defineNumber('port', 3000, 'Ports for the http server');
flags.parse();
const port = flags.get('port') || process.env.PORT || 3000;

module.exports = {
  port: port,
};
