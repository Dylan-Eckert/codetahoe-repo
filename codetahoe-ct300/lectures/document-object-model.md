# Document Object Model (DOM)
The Document Object Model (DOM) is a programming interface for HTML and XML documents. It provides a structured representation of the document and it defines a way that the structure can be accessed from programs so that they can change the document structure, style and content. The DOM provides a representation of the document as a structured group of nodes and objects that have properties and methods. Essentially, it connects web pages to scripts or programming languages.

Although the DOM is often accessed using JavaScript, **it is not a part of the JavaScript language.** It can also be accessed by other languages.

This HTML document:
```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Title</title>
  </head>
  <body>
    <h1>My Header</h1>
    <a href="#">My Link</a>
  </body>
</html>
```

Produces (at a very high level) this DOM data structure:

![](images/dom-tree-example.gif)


## Locating DOM Elements
You can locate DOM elements using the following `document` object methods:

```
document.getElementById()
document.getElementsByClassName()
document.getElementsByTagName()
document.querySelector()
document.querySelectorAll()
```

### `document.getElementById()`
The `document.getElementById()` returns the element that matches that element's `id` attribute.

HTML:
```html
<article id="article-1" class="blog-article">
</article>
<article id="article-2" class="blog-article">
</article>
```

JavaScript:
```JavaScript
// return a reference the second article element
document.getElementById('article-2');  
```

### `document.getElementsByClassName()`
The `document.getElementsByClassName()` returns an array-like object of all child elements which have all of the given class names.

HTML:
```html
<article id="article-1" class="blog-article">
</article>
<article id="article-2" class="blog-article">
</article>
<article id="article-3" class="blog-article special-article">
</article>
```

JavaScript:
```JavaScript
// return an array of elements that have the class blog-article
document.getElementsByClassName('blog-article');  // returns an array with first and second article elements
// return an array of elements that have both blog-article and special-article class names
document.getElementsByClassName('blog-article special-article');  // returns a single element array with the third article element
```

### `document.getElementsByTagName()`
The `document.getElementsByTagName()` returns an array-like object of all child elements which have match the tag name argument.

HTML
```html
<article id="article-1" class="blog-article">
</article>
<article id="article-2" class="blog-article">
</article>
<article id="article-3" class="blog-article special-article">
</article>
```

JavaScript
```JavaScript
// return an array of elements that have the class blog-article
document.getElementsByTagName('article');  // returns an array of all the article elements
```

### `document.querySelector()`
The `document.querySelector()` returns the first element within the document that matches the specified group of [CSS selectors](css-intro.md#selectors).  

HTML
```html
<article id="article-1" class="blog-article">
</article>
<article id="article-2" class="blog-article">
</article>
<article id="article-3" class="blog-article special-article">
</article>
```

JavaScript
```JavaScript
document.querySelector('.blog-article, .special-article');  // returns the first element that matches the first or second class
document.querySelector('#article-1, #article-1');  // returns the first element that matches the first or second ID.
```

### `document.querySelectorAll()`
The `document.querySelectorAll()` returns an array-like object of elements that match the specified group of [CSS selectors](css-intro.md#selectors).  

HTML
```html
<article id="article-1" class="blog-article">
</article>
<article id="article-2" class="blog-article">
</article>
<article id="article-3" class="blog-article special-article">
</article>
```

JavaScript
```JavaScript
document.querySelectorAll('.blog-article, .special-article');  // returns all the article elements
document.querySelectorAll('#article-1, #article-1');  // returns the first and second article elements
```

### Chaining
You can chain all the selectors above just like you would with CSS combinators to match specific elements nested within other elements.

HTML:
```html
<h1>Selected JavaScript Articles</h1>
<p>
  A curated list of daily JavaScript articles.
</p>
<article id="article-1">
  <h1>Shiny New JavaScript Framework</h1>
  <p>
    Fuzzy Kitty is in! Run and download before it goes out of style.
    <a class="btn-get-it" href="get-it.html">Get it now!</a>
  </p>
</article>
```

JavaScript:
```JavaScript
// get element that has a class of 'btn-get-it', inside of an element that has the ID of 'article-1'
document.getElementById('article-1').querySelector('.btn-get-it');
```

Above works just like the following CSS combinators which essentially select the `a` element:

```CSS
#article-1 > .btn-get-it {...}
#article-1 .btn-get-it {...}
```

### Locator Method Choice
The decision on which locator method to use comes down to coding effort and performance. In general, unless your DOM is very big (which in itself would be an issue), the difference would be negligible.    

Here is a table that compares the performance of some of the methods above.  

<table>
  <thead>
    <tr>
      <th>Test</th>
      <th>Quickest</th>
      <th>Slowest</th>
      <th>Slowest as percentage of quickest</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Single by ID</td>
      <td><code>getElementById</code></td>
      <td><code>querySelector</code></td>
      <td>38%</td>
    </tr>
    <tr>
      <td>Single by class</td>
      <td><code>getElementsByClassName()[0]</code></td>
      <td><code>querySelector</code></td>
      <td>15%</td>
    </tr>
    <tr>
      <td>Multiple by class</td>
      <td><code>getElementsByClassName</code></td>
      <td><code>querySelectorAll</code></td>
      <td>1%</td>
    </tr>
    <tr>
      <td>Multiple grandchildren</td>
      <td>Chained (<code>getElementById().getElementsByTagName()</code>)</td>
      <td><code>querySelectorAll</code></td>
      <td>9%</td>
    </tr>
    <tr>
      <td>Single grandchild</td>
      <td>Chained (<code>getElementById().getElementsByClassName()[0]</code>)</td>
      <td><code>querySelector</code></td>
      <td>83%</td>
    </tr>
  </tbody>
</table>

## Manipulating DOM Elements
You can also change the content of DOM elements, some of the things we can change are:

- Change styles
- Add or remove classes
- Change attributes
- Change content

### `style`
You can change the style of a DOM element using the `style` property.  The styles used in JS (unlike CSS) use lower camel casing.

```JavaScript
var elem = document.getElementById('element-id');
elem.style.fontSize = '12px';
elem.style.color = 'blue';
```

### `classList`
You can add, remove or toggle classes to an element via its `classList` property.

```JavaScript
var elem = document.getElementById('element-id');
elem.classList.add('class-to-add');       // adds a class to the element
elem.classList.remove('class-to-remove'); // removes a class from the element
elem.classList.toggle('class-to-toggle'); // if the class exists, it removes it, otherwise it adds it
```

### `getAttribute` and `setAttribute`
The `getAttribute` and `setAttribute` properties allow you to get an element's attribute or set its value.

```JavaScript
var elem = document.getElementById('element-id');
elem.getAttribute('href');
elem.setAttribute('href', 'https://www.codetahoe.com')
```

### `textContent`
The `textContent` property replaces the content inside of an element with a string.

```JavaScript
var elem = document.getElementById('element-id');
elem.textContent = 'some string';
```

### `innerHTML`
The `innerHTML` property replaces the content inside of an element with a string.

```JavaScript
var elem = document.getElementById('element-id');
elem.innerHTML = '<p>html content</p>';
```

## Exercise: Locating and Manipulating DOM
Using the following HTML:

```html
<h1>Selected JavaScript Articles</h1>
<p>
  A curated list of daily JavaScript articles.
</p>
<article id="article-1">
  <h1>Shiny New JavaScript Framework</h1>
  <p>
    Fuzzy Kitty is in! Run and download before it goes out of style.
    <a class="btn-get-it" href="get-it.html">Get it now!</a>
  </p>
</article>
```

- Select only the `<h1>` in the `<article>` tag in 4 different ways.
- Change the content of the `<h1>` tag to say something else.
- Toggle the class `article-heading` on the `<h1>` tag.
- Get the `a` tag and change it to go to http://www.google.com

## DOM Events
DOM elements can also fire events, some are triggered by the browser and some are triggered by the user interacting with DOM elements.

### `addEventListener` Method
The `addEventListener()` method registers the specified listener on the EventTarget it's called on. The event target may be an Element in a document, the Document itself, a Window, or any other object that supports events (such as XMLHttpRequest).

Syntax
```JavaScript
target.addEventListener(type, listener);
```

- `type`: a string representing the event type to listen for.
- `listener`: a `function` or an object implementing the `EventListener` interface. We will only worry about `function` for now.

Example

HTML
```html
<button id="login">Login</button>
```

HTML
```JavaScript
var checkCredentials = function() {
  // execute some code.
};

document.getElementById('login').addEventListener('click', checkCredentials);
```

The code above is listening for a `click` event to be triggered, then executes the `checkCredentials` functions which could check whether the user's info is correct.

### Event Types
DOM object support many event types.  For now let's look at two

#### `DOMContentLoaded`
The `DOMContentLoaded` is a browser triggered event that is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.

This event is triggered on the `document` DOM element.

Example
```JavaScript
document.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOMContentLoaded event fired.');
});
```

#### `click`
The `click` event is fired when a user clicks a DOM element.

HTML
```html
<button id="login">Login</button>
```

HTML
```JavaScript
var checkCredentials = function() {
  console.log('login button click event is fired.')
};

document.getElementById('login').addEventListener('click', checkCredentials);
```

## Callback Functions
Callback functions are `function` objects (remember functions in JavaScript are also objects) that are passed as arguments to DOM methods or other asynchronous methods.  The methods that take a callback, execute the callback function at the right time and will not "block" the other statements in JavaScript from running.

Example
```JavaScript
var sayGoodBye = function () {
  console.log('Good Bye')
};

setTimeout(sayGoodBye, 2000); // count to 2 seconds and trigger sayGoodBye

console.log('Hello');
```

In the code example above, `sayGoodBye` is a callback function which will be triggered by `setTimeout` DOM method after 2 seconds. Even though JavaScript is single threaded, the 2 second delay will not block the JavaScript, but why? Let's watch the following [video](https://www.youtube.com/watch?v=8aGhZQkoFbQ) to really understand how this works.

## AJAX
AJAX stands for Asynchronous JavaScript and XML, despite its name, it can be used with any data transport type including JSON.

The basic idea behind AJAX is that you can update parts of a web page without having to reload the page.  This usually involves making a call to some backend or third party API.

### `XMLHttpRequest`
`XMLHttpRequest` is an API that provides client functionality for transferring data between a client and a server.  It is the main DOM API used for AJAX programming.

Syntax
```JavaScript
var req = new XMLHttpRequest();
```

The four most important properties of the `XMLHttpRequest` object are:

- `readyState`
- `status`
- `onreadystatechange`
- `responseText`


The two most important methods of `XMLHttpRequest` object are:

- `open`
- `send`

#### `readyState`
The `readyState` property holds the status of the `XMLHttpRequest` object.  It changes from 0 to 4:

- `0`: request not initialized
- `1`: server connection established
- `2`: request received
- `3`: processing request
- `4`: request finished and response is ready

#### `status`
This `status` property holds the HTTP status code of the response. See [list of HTTP status codes](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)

#### `onreadystatechange`
The `onreadystatechange` event is used to track the state of our AJAX request.  It is triggered every time the `readyState` property of our `XMLHttpRequest` object changes.

#### `responseText`
The `responseText` property contains the response from the API (server).  In case of REST APIs, this will most likely be a JSON string.

#### `open`
This method initializes the request, taking in the HTTP method and the URL the request is being sent to.

Syntax
```JavaScript
req.open(method, url)
```

#### `send`
This method sends the request to the URL provided in `open`.  It also takes an argument for the body of the request or data that you will be sending to the server (for example if you have POST request).

Syntax
```JavaScript
req.send(body)
```

Note that body in case of REST APIs can be a JSON string or a plain JavaScript object.  The `send` method automatically serializes (stringifies) JavaScript objects similar to calling `JSON.stringify()` on the object.

#### Making AJAX Calls

Basic example
```html
<button id="btn-get-posts" >Get posts</button>
```

```JavaScript
function getPosts() {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      console.log(this.responseText);
    }
  };

  req.open('GET', 'http://jsonplaceholder.typicode.com/posts');
  req.send();
}

document.getElementById('btn-get-posts').addEventListener('click', getPosts);
```

Using callback functions
```JavaScript
function getPosts(success, error) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        success(this.responseText);
      } else {
        error(this.status);
      }
    }
  };

  req.open('GET', 'http://jsonplaceholder.typicode.com/posts');
  req.send();
}



document.getElementById('btn-get-posts').addEventListener('click', function() {
  function onSuccess(responseText) {
    console.log(responseText);
  }

  function onError(status) {
    console.log(status);
  }

  getPosts(onSuccess, onError);
});
```

Notice that responses are strings in the examples above.  You can convert these strings to the base JavaScript object (or array) by using the JavaScript built-in `JSON` object and its `parse` method.  

Example
```JavaScript
var obj = JSON.parse(responseText);
```

## Exercise: AJAX
- Using the http://jsonplaceholder.typicode.com/users endpoint for your data:
  - Make an AJAX call to the endpoint by clicking a `Get Users` button.
  - Once you receive the response, convert each user to an instance of a `User` object. You can disregard the `address` and `company` properties.
  - Write the instances to the console to verify they are correct.
- Using the http://jsonplaceholder.typicode.com/posts endpoint:
  - Make an AJAX call to send the title and body of the post.  
  - Print the response to console.  Hint: If you receive a JSON string with an id property back, then you're good.
