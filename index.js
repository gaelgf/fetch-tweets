const express    = require('express');
const mongoose   = require('mongoose');
const helmet     = require('helmet');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const bluebird   = require('bluebird');

const config = require('./config');
const routes = require('./routes');

const app  = express();

const Twit = require('twit');
const Tweet = require('./model/tweet/schema');

mongoose.Promise = bluebird;
mongoose.connect(config.mongo.url);

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/', routes);


var T = new Twit({
  access_token:         '717838511139848196-s3A1fO13qFN7cqmiXgHatYiwfz0pVgl',
  access_token_secret:  '1u0lmho4a8pK3QXCCB07mJQNNh4vbXW7XYRdVB4X7iPTG',
  consumer_key:         'p2bVsvxpNCnYb7WXYfZMm1MLj',
  consumer_secret:      '853vrisGEZVbu8TmzehaUQA26Jb2QdccKxd6NMzu9CDUZ2HCu7',
});

var count = 0,

    maxId;

getTweets();

function getTweets() {
  if(maxId === undefined) {
    T.get('search/tweets', { q: '#GOT', count: 50 })
    .catch(function (err) {
      console.log('caught error', err.stack);
    })
    .then(saveTweets);
  } else {
    T.get('search/tweets', { q: '#GOT max_id:' + maxId, count: 51 })
    .catch(function (err) {
      console.log('caught error', err.stack);
    })
    .then(saveTweets);
  }
}


function saveTweets(res) {
  var tweet;
  var data = res.data;
  if(data.statuses === undefined) {
    console.log(data);
  }
  for (var i = 0; i < data.statuses.length; i++) {
    tweet = new Tweet({
      created_at: data.statuses[i].created_at,
      id_str: data.statuses[i].id_str,
      entities: data.statuses[i].entities,
      lang: data.statuses[i].lang,
      text: data.statuses[i].text
    });
    if(i === 0 && maxId !== undefined) {
      continue;
    }
    maxId = data.statuses[i].id_str;
    tweet.save(function (err, Tweet) {
      if (err) return console.error(err);
    });
  }
  count++;
  if(count < 40) {
    getTweets();
  }
}

app.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`);
});

module.exports = app;
