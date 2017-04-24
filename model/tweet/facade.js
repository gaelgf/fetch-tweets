const Facade = require('../../lib/facade');
const tweetSchema = require('./schema');

class TweetFacade extends Facade {}

module.exports = new TweetFacade(tweetSchema);
