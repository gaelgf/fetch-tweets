const Controller = require('../../lib/controller');
const tweetFacade = require('./facade');

class TweetController extends Controller {}

module.exports = new TweetController(tweetFacade);
