const Router = require('express').Router;
const router = new Router();

const tweet = require('./model/tweet/router');

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to fetchtweets API!' });
});

router.use('/tweet', tweet);

module.exports = router;
