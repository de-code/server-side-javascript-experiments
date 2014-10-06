var Twitter = require('node-tweet-stream');
var fs = require('fs');

var twitterConfig = JSON.parse(fs.readFileSync(__dirname + '/twitter-config.json', 'utf8'));

var arguments = process.argv.slice(2);
if (arguments.length == 0) {
  console.log('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' <keyword 1> [<keyword 2> ...]');
  process.exit(1);
}

var t = new Twitter(twitterConfig);

t.on('tweet', function(tweet) {
  console.log('tweet received: ' + tweet.text);
});

t.on('error', function(err) {
  console.log('error: ' + err);
})

arguments.forEach(function(keyword) {
  t.track(keyword);
});
