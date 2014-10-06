REST examples
--------------

Simple REST server:

* using node's [http api](http://nodejs.org/api/http.html)
* using [express](https://www.npmjs.org/package/express)

Simple REST client:

* using node's [http api](http://nodejs.org/api/http.html)

install
---------

```bash
npm install
```

run server
----

Server using node's http api:

```bash
node rest-server.js
```

Server using express:
```bash
node express-rest-server.js
```

run client
----------

```bash
node rest-client.js list | get <id> | add <id> <text> | delete <id>
```

e.g.:
```bash
node rest-client.js list
node rest-client.js get 1
node rest-client.js put 2 "test 2"
node rest-client.js delete 2
```

libraries used
--------------
* [express](https://www.npmjs.org/package/express)
