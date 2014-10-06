Other examples
--------------

Other examples snippets that didn't fit in any other category.

install
---------

```bash
npm install -g coffee-script
```

square-range-example
----

The first version is written in JavaScript:
```bash
node square-range-example.js
```

The second version written using [CoffeeScript](http://coffeescript.org/)
```bash
npm install -g coffee-script
coffee --compile --output bin square-range-example.coffee
node bin/square-range-example.js
```
(the purpose of the second version is that one may choose to use a different language compiling to JavaScript while still benefiting from the JavaScript as a platform)

http server
--------------

```bash
node hello-world-http-server.js
```
