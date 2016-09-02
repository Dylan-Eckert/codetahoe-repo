# Node.js Introduction
Node.js (Node) is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node's package manager, npm, is the largest ecosystem of open source libraries in the world.

Node is similar to Document Object Model (DOM) in the browser in that it provides APIs for you to interact with its operating environment, which in case of Node, is the operating system (the DOM's operating environment is the browser).  Also just like DOM, it provides its own version of Event Loop to ensure that your code doesn't block since JavaScript is single threaded.  And just like DOM API, Node's APIs use callbacks to respond back to the caller when an operation completes.

You can use Node's built-in modules (libraries) to interact with the file system, automate certain tasks and even build an HTTP server.

## Install Node
On the Mac, you can use Homebrew to install node by running the following command in the terminal:

```sh
$ brew update && brew install node
```

On Windows, you can install it using the latest [Node installer](https://nodejs.org/en/download/current/).

## Using Node
Now that you have Node installed, you have access to the `node` command in the terminal.  You can use node three ways:

- Single command
- JavaScript file
- REPL (Read-Eval-Print-Loop)

### Single Command
You can use a single Node command in CLI:

```sh
$ node -e "console.log('Hello World')"
```

### JavaScript File
Another way to run Node is through a JavaScript file.  All you need to do here is a create a file with a `.js` extension and then execute it using the `node` command:

```sh
$ echo "console.log('Hello World')" > hello-world.js
$ node hello-world.js
```

### REPL (Read-Eval-Print-Loop)
Node allows you to use an interactive shell through it's `repl` module.  To launch Node's REPL, you simply type `node` without any arguments.

```sh
$ node
> console.log('Hello World');
Hello World
undefined
>
```

Notice that we get two outputs, "Hello World" and `undefined`.  The second output is the return value of the `console.log` method.

Much like the Chrome's browser console, the REPL environment allows you to execute JavaScript and have access to all of Node's built-in modules (libraries).

You can exit Node's REPL by typing in `.exit`.

## Node Modules
In Node, modules encapsulate related code, generally in one file.  Node has built-in modules, external modules (third party libraries) or we can define our own modules.

### Importing Modules
You can import modules in Node using the `require` keyword:

```JavaScript
var fs = require('fs');  // include Node's filesystem module

// Read the contents of the file into memory.
fs.readFile('nodejs.md', function (err, data) {

  // If an error occurred, throwing it will
  // display the exception and end our app.
  if (err) throw err;

  // data is a Buffer, convert to string.
  var text = data.toString();

  console.log(text);
});
```

Notice that `fs.readFile` method takes in a callback function which is called after `fs.readFile` is done reading the content of the file.

### Creating Modules
We can easily create our own modules that we can import in other code.  To do this, we will need to create a `.js` file and then use the `exports` keyword on any method in the module we want to expose outside of the module:

hello-world.js
```JavaScript
'use strict';

function printHelloWorld() {
  console.log('Hello World');
}

exports.printHelloWorld = printHelloWorld;
```

```sh
$ node
> var hw = require('./hello-world');
undefined
> hw.printHelloWorld()
Hello World
undefined
```

## NPM
You can also use modules or collection of modules written by other developers in your application.  These are called packages and can be managed via `npm`, which is the package manager for JavaScript also written in Node.  

Syntax
```sh
$ npm install <package name>
```

Example
```sh
$ npm install express
```

In this example, Express is a web framework for Node.  

The above syntax works ok if you only have a few dependencies and aren't concerned about versioning.  However if you are building a real world application, that will not suffice.  This is where `npm` makes use of `package.json` to give you a full-featured package and dependency management system.

package.json
```json
{
  "name" : "My Application",
  "version" : "0.0.1",
  "dependencies" : {
    "express" : "4.14.x"
  }
}
```

Here's a description of a few version ranges in `package.json`:

- `version` Must match version exactly
- `>version` Must be greater than version
- `~version` Approximately equivalent to version
- `^version` Compatible with version
- `1.2.x` Matches 1.2.0, 1.2.1, etc., but not 1.3.0
- `*` Matches any version

For more information on versions, see [semver](https://docs.npmjs.com/misc/semver), the semantic versioner for npm.

When you create a new Node application, you would want to create a directory for your application, then use `npm init` to initialize your `package.json` file.  You can then add dependencies to `package.json` by installing them and then adding a `--save` to your `npm install` command:

```sh
$ npm install express --save
```

This will automatically add the latest version of Express to your dependencies in your `package.json` and also add all the Express files to the `node_modules` directory in your application's directory.

## Events
Most of Node's core API is built around an event-driven architecture in which certain kinds of objects (called "emitters") periodically emit named events that cause Function objects ("listeners") to be called.

For instance, `fs.ReadStream` emits an event when the file is opened.

All objects that emit events are instances of the `EventEmitter` class. These objects expose an `eventEmitter.on()` function that allows one or more functions to be attached to named events emitted by the object. Typically, event names are camel-cased strings but any valid JavaScript property key can be used.

Example
```JavaScript
// Import EventEmitter class
var EventEmitter = require('events');

// Create an instance of the EventEmitter class
var eventEmitter = new EventEmitter();

// Attach a function(a, b) to the named event 'event'
eventEmitter.on('event', function(a, b) {
  console.log('Event "event" fired with arguments ' + a + ', ' + b);
});

// Emit `event`
eventEmitter.emit('event', 'arg1', 'arg2');
```

## Streams
A stream is an abstract interface for working with streaming data (continuously flowing) data.  

There are five types of streams in Node:
- Readable - streams from which data can be read (for example `fs.createReadStream()`).
- Writable - streams to which data can be written (for example `fs.createWriteStream()`).
- Duplex - streams that are both Readable and Writable (for example `net.Socket`).
- Transform - Duplex streams that can modify or transform the data as it is written and read (for example `zlib.createDeflate()`).

Let's look at an example stream that compresses data and writes the compressed data out to a new file:

Example
```JavaScript
var fs = require('fs');
var zlib = require('zlib');

var deflate = zlib.createDeflate(); //  create a transform stream
var readStream = fs.createReadStream('./data.text'); // create a readable stream
var writeStream = fs.createWriteStream('./data.gz'); // create a writable stream

readStream   // read the file
  .pipe(deflate)  // compress its data
  .pipe(writeStream)  // write the file to the write stream
  .on('finish', function () {  // all done
    console.log('done');
  });
```

The `pipe()` method attaches a writable stream to the readable stream, causing it to switch automatically into flowing mode and push all of its data to the attached Writable. The flow of data will be automatically managed so that the destination writable stream is not overwhelmed by a faster Readable stream.

Note the `finish` event?  All streams are also instances of `EventEmitter` and therefore emit events, in this case, the `finish` event is emitted when `writeStream` writes all its data and closes the file.

## HTTP Server
You can build a very simple HTTP server in Node using the `http` built-in module:

```JavaScript
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(8080);
```

Now if you navigate to http://localhost:8080 in your browser and you'll see "Hello World".

This is obviously not very useful as a web server, in order to have a full blown web server, you can use Node's `http` module and then build add functionality to handle routes, check what was requested and then respond with HTML, JSON, plain text, etc.  You can build all of this yourself or use Express to do all of this work for you.

## Express
Express is a "fast, unopinionated, minimalist web framework for Node.js".  It provides routing and other HTTP utilities that simplify web and mobile application development.

### Routing
Routing refers to the definition of application end points (URIs) and how they respond to client requests.  

Example
```JavaScript
var express = require('express');
var app = express();

// respond with "Hello World" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('Hello World');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```
#### Route Methods
A route method is derived from one of the HTTP methods (GET, POST, PATCH, PUT, DELETE, HEAD), and is attached to an instance of the `express` class.

Example:
```JavaScript
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the root path');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the root path');
});
```

#### Route Paths
Route paths, in combination with a route method, define the endpoints at which requests can be made. Route paths can be strings, string patterns, or regular expressions

Example
```JavaScript
app.get('/', function (req, res) {
  res.send('home');
});

app.get('/about', function (req, res) {
  res.send('about');
});
```

#### Route Parameters
Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the `req.params` object, with the name of the route parameter specified in the path as their respective keys.

```JavaScript
app.get('/posts/:postId/comments/:commentId', function(req, res) {
  res.send(req.params);
});
```

### Response Methods
These are the methods available on the response object (`res`):

<table>
<thead>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>res.download()</td>
<td>Prompt a file to be downloaded.</td>
</tr>
<tr>
<td>res.end()</td>
<td>End the response process.</td>
</tr>
<tr>
<td>res.json()</td>
<td>Send a JSON response.  It will automatically stringify a JavaScript object.</td>
</tr>
<tr>
<td>res.jsonp()</td>
<td>Send a JSON response with JSONP support.</td>
</tr>
<tr>
<td>res.redirect()</td>
<td>Redirect a request.</td>
</tr>
<tr>
<td>res.render()</td>
<td>Render a view template.</td>
</tr>
<tr>
<td>res.send()</td>
<td>Send a response of various types.</td>
</tr>
<tr>
<td>res.sendFile()</td>
<td>Send a file as an octet stream.</td>
</tr>
<tr>
<td>res.sendStatus()</td>
<td>Set the response status code and send its string representation as the response body.</td>
</tr>
</tbody>
</table>

Example
```JavaScript
// GET method route
app.get('/posts/:postId/', function (req, res) {
  var post = {
    title: 'Hello',
    Body: 'World'
  };

  res.json(post);
});
```

### Request Properties
The `req` object contains a few properties that makes it easier for you to handle requests.  

We are going to cover three of them here but there are [many more](https://expressjs.com/en/4x/api.html#req).

#### `req.params`
This property is an object containing properties mapped to the named route “parameters”. For example, if you have the route `/user/:name`, then the “name” property is available as `req.params.name`. This object defaults to {}.

```JavaScript
// GET /user/john
req.params.name
// => "john"
```

#### `req.query`
This property is an object containing a property for each query string parameter in the route. If there is no query string, it is the empty object, {}.

```JavaScript
// GET /search?q=my+adventure
req.query.q
// => "my adventure"
```

#### `req.body`
Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as `body-parser`.

```JavaScript
app.post('/posts', function(req, res) {
    var post = {
      title: req.body.title,
      body: req.body.body
    };

    res.json(post);
});
```

## Express Middleware
Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named `next`.

Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

If the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.

An Express application can use any or all of these types of middleware:

- Application-level middleware
- Router-level middleware
- Error-handling middleware
- Built-in middleware
- Third-party middleware

### Application-level Middleware
Bind application-level middleware to an instance of the `app` object by using the `app.use()` and `app.METHOD()` functions, where METHOD is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST) in lowercase.

This example shows a middleware function with no mount path. The function is executed every time the app receives a request.
```JavaScript
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
```

This example shows a middleware function mounted on the `/post/:id` path. The function is executed for any type of HTTP request on the `/post/:id` path.
```JavaScript
app.use('/posts/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

### Router-level Middleware
Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of `express.Router()`.

This example shows a middleware function with no mount path. The function is executed every time the router receives a request.
```JavaScript
var router = express.Router();

router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
```

This example shows a middleware function mounted on the `/post/:id` path. The function is executed for any type of HTTP request on the `/post/:id` path.
```JavaScript
var router = express.Router();

router.use('/posts/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

### Error-handling Middleware
Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three, specifically with the signature (`err`, `req`, `res`, `next`)):

```JavaScript
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

### Built-in Middleware
The only built-in middleware function in Express is `express.static`. This function is responsible for serving static assets such as HTML files, images, and so on.

```JavaScript
app.use(express.static('public', options));
```

### Third-party middleware
Use third-party middleware to add functionality to Express apps.  You would have to first install the middleware package and then import it in your app.

Example
```JavaScript
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
```
