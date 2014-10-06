var Twitter = require('node-tweet-stream');
var fs = require('fs');
var rateLimit = require('function-rate-limit');
var entities = require("entities");

var twitterConfig = JSON.parse(fs.readFileSync(__dirname + '/twitter-config.json', 'utf8'));

var arguments = process.argv.slice(2);
if (arguments.length == 0) {
  console.log('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' <keyword 1> [<keyword 2> ...]');
  process.exit(1);
}

var t = new Twitter(twitterConfig);

var count = 0;
var minCharacters;
var minText;
var maxCharacters;
var maxText;
var totalCharacters = 0;

// using rateLimit, display statistics at most once per second
var onUpdate = rateLimit(1, 1000, function() {
  console.log('min text: ' + minText);
  console.log('max text: ' + maxText);
  console.log('characters used: min=' + minCharacters + ', max=' + maxCharacters + ', avg=' +
      (totalCharacters / count) + ', total=' + totalCharacters + ', count=' + count);
});

t.on('tweet', function(tweet) {
  // decode entities like &amp;
  var text = entities.decodeHTML(tweet.text);
  if (count == 0) {
    console.log('first tweet received: ' + text + ' (' + text.length + ')');
  }
  var length = text.length;
  if ((count == 0) || (length < minCharacters)) {
    minCharacters = length;
    minText = text;
  }
  if ((count == 0) || (length > maxCharacters)) {
    maxCharacters = length;
    maxText = text;
  }
  totalCharacters += length;
  count++;
  onUpdate();
});

t.on('error', function(err) {
  console.log('error: ' + err);
})

arguments.forEach(function(keyword) {
  t.track(keyword);
});
console.log('tracking: ' + arguments);
