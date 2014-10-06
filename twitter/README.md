Twitter examples
--------------

Simple Twitter examples:

* stream twitter tweets
* count characters per tweet

install
---------

```bash
npm install
```

Copy twitter-config.json.template to twitter-config.json and fill in your API keys.

Register API keys at: https://apps.twitter.com/

run
----

Track keywords and stream tweets:
```bash
node tweet-track.js <keyword 1> [<keyword 2> ...]
```

e.g.
```bash
node tweet-track.js london
```

Track keywords and display character count statistics:
```bash
node tweet-track-character-count.js <keyword 1> [<keyword 2> ...]
```

libraries used
--------------
* [node-tweet-stream](https://www.npmjs.org/package/node-tweet-stream) for the Twitter API
* [entities](https://www.npmjs.org/package/entities) to decode entities in the text messages
* [function-rate-limit](https://www.npmjs.org/package/function-rate-limit) to rate limit logging of the statistics
