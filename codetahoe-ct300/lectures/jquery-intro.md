# Introduction to jQuery
jQuery is a fast and small JavaScript library that essentially wraps a higher level API over the DOM API. It makes things like DOM traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multiple browsers.

## Getting Started
To start using jQuery in your web page, you need to first include it just like you would any other JavaScript script.  

There are multiple ways to include jQuery:

Via jQuery CDN
```html
<head>
  <script src="https://code.jquery.com/jquery-3.0.0.min.js"></script>
</head>
```

[Download](https://code.jquery.com/jquery-3.0.0.min.js) and include:
```html
<head>
  <script src="<your local path>/jquery-3.0.0.min.js"></script>
</head>
```

The way you include it, depends on your needs and the type of the application you're making.  Generally the CDN way is more advantageous, especially if you are not using your own CDN.

## jQuery Syntax and Basics
jQuery syntax is all about selecting DOM elements and then performing an action on those elements.

Syntax
```JavaScript
$(selector).action();
```

- `$`: a reference to the jQuery object (function) which takes selectors as an argument.
- `selectors`: can be DOM object or [CSS selectors](css-intro.md#selectors).
- `action()`: a method to perform an action on the selected DOM element.

Basic Examples
```html
<span id="my-text">Hello</span>
```

```JavaScript
// Using CSS selectors
$('#my-text').hide();
$('span').hide();

// Using the DOM object
var elem = document.getElementById('my-text');
$(elem).hide();
```

Above code in plain JavaScript is equivalent to:
```JavaScript
document.getElementById('my-text').style.display = 'none';
```

Another important note is that just like the regular JavaScript selectors, you will need make sure that DOM is fully loaded before you try to select its elements.  This is where the jQuery `ready` method comes into play:

```JavaScript
$(document).ready(function(){
   // jQuery methods go here...
});
```

This is equivalent to
```JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // JavaScript selectors go here...
});
```

There is also a short hand for the jQuery `ready` method:

```JavaScript
$(function(){
   // jQuery methods go here...
});
```

## jQuery Selectors
jQuery selectors, can select one or more DOM elements, unlike the DOM's built-in selector methods, which require you to explicitly call a method for selecting one element (`querySelector`) and another one (`querySelectorAll`) for returning multiple elements.

Examples

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
$('.blog-article').hide();  // hide all article elements
$('#article-1, #article-2, #article-3').hide(); // also hides all article elements
```

Notice that you can assign the same action to multiple DOM elements without having to loop through each element.  That is because jQuery is internally looping through these elements and adding the action to each one.

Also worth noting is that the actual object returned by the selector is a jQuery object or collection (array-like object) which references and extends the browser DOM object.

## Manipulating DOM Elements
jQuery has a lot of methods that allow you to manipulate DOM elements.  We'll look at a few of them to get started but you look up the rest at [jQuery API Documentation - Manipulation](http://api.jquery.com/category/manipulation/)

### `css()`
Equivalent to `style`, gets or sets the style of a DOM element:

```JavaScript
$('#element-id').css('font-size', '12px')
$('#element-id').css('color', 'blue');
```

### `addClass`, `removeClass`, `toggleClass`
- `addClass` adds a class to a selected DOM element.
- `removeClass` removes a class from a selected DOM element.
- `toggleClass` adds a class if it doesn't exist or removes it if it does.

### `append`
Insert content, specified by the parameter, to the end of each element in the set of matched elements.

Starting HTML:
```html
<div class="outer">
  <div class="inner">Inner 1</div>
  <div class="inner">Inner 2</div>
</div>
```

JavaScript:
```JavaScript
$('.outer').append('<div class="inner">Inner 3</div>')
```

Resulting HTML:
```html
<div class="outer">
  <div class="inner">Inner 1</div>
  <div class="inner">Inner 2</div>
  <div class="inner">Inner 3</div>
</div>
```

### `appendTo`
Insert every element in the set of matched elements to the end of the target specified by the parameter.

Starting HTML:
```html
<div class="outer">
  <div class="inner">Inner 1</div>
  <div class="inner">Inner 2</div>
</div>
```

JavaScript:
```JavaScript
$('<div class="inner">Inner 3</div>').appendTo('.outer')
```

Resulting HTML:
```html
<div class="outer">
  <div class="inner">Inner 1</div>
  <div class="inner">Inner 2</div>
  <div class="inner">Inner 3</div>
</div>
```

### `attr`
Get or sets the attribute value of every matched element.

```html
<img src="my-image.png" alt="My Image"></img>
```

```JavaScript
$('input').attr('alt'); // returns 'My Image'
$('input').attr('src', 'another-image.png'); // changes to a different image
```

## Traversing DOM Elements
In addition to selectors, you can further traverse DOM elements using jQuery built-in methods.  [jQuery API Documentation - Traversing](https://api.jquery.com/category/traversing/) has a comprehensive list of these methods.

### `each()`
The `each()` method iterates through each selected DOM element.  You can then access each element using `this` inside the `each` method.

```JavaScript
$('li').each(function() {
  $(this).addClass('foo');
});
```

Note that as mentioned earlier, most jQuery methods return a collection (also known as implicit iteration) and can act on collections, so the above code is unnecessary in this case.

```JavaScript
// The .each() method is unnecessary here:
$('li').each(function() {
  $(this).addClass('foo');
});

// Instead, you should rely on implicit iteration:
$('li').addClass('foo');
```

However, if you want to perform different actions depending on an element's attribute, then using the `each()` method will make sense:

```css
.red {
  color: red;
}

.blue {
  color: blue;
}
```

```html
<ul>
  <li class="red">Red</li>
  <li class="blue">Blue</li>
</ul>
```

```JavaScript
$('li').each(function() {
  if(this.style.color === 'blue') {
    this.style.color = 'red';
  }
});
```

### `find()`
Get the descendants of each element in the current set of matched elements, which need to be filtered by selectors.

Example

HTML
```html
<div class="outer">
  <div id="inner-1" class="inner">
    Inner 1
    <div id="inner-inner-1" class="inner">
      Inner 1 1
    </div>
  </div>
  <div id="inner-2" class="inner">Inner 2</div>
</div>
```

JavaScript
```JavaScript
$('.outer').find('#inner-1'); // returns inner-1 and inner-1-1
```

### `parent()`
Gets the parent of the each element in the current set of matched elements, optionally filtered by a selector.

## Events
jQuery can also listen to JavaScript event types and perform an action.

### `on()`
The `on()` method attaches event handlers (listeners) to the currently selected set of elements.  This works very similar to `addEventListener` in JavaScript.

HTML
```html
<button id="btn-say-hello"></button>
```

JavaScript
```JavaScript
$('#btn-say-hello').on('click', function() {
  // do something
});
```

Multiple events can also trigger the same function:

JavaScript
```JavaScript
$('#btn-say-hello').on('click mouseover mouseout', function() {
  // do something
});
```

You can also trigger multiple functions on multiple evens using the same selected elements (instead of chaining):

```JavaScript
$('#btn-say-hello').on({
  click: function() {
    // do something  
  }, mouseenter: function() {
    // do something else
  }, mouseleave: function() {
    // do another thing
  }
});
```

### Chaining Actions
Another very useful aspect of jQuery is that it allows you to chain actions on the same selector.

```JavaScript
$('.blog-article')
   .hide()
   .show()
   .css('font-size', '12px')
   .css('color', 'blue');
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
- Append another `p` element to `article-1`.  Do this in two ways.
- Change the color of all `h1` elements to `red`.
- Add a button that adds a new article on `click` and `mouseenter`.  It can add the same article over and over again for now.  Do this 3 ways.

## `jQuery.ajax()`
jQuery's `ajax()` method performs an Ajax (asynchronous HTTP) request.  Internally it uses the `XMLHttpRequest` object just like we learned earlier.

Basic Syntax
```JavaScript
$.ajax(url, {
    method: 'GET'|'POST'|'PUT'|'DELETE'|'HEAD'|'OPTIONS',
    data: Object|String|Array
  })
  .done(function(data, textStatus, jqXHR) {
    // handle success response from the server
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    // handle error responses from the server
  })
  .always(function(data|jqXHR, textStatus, jqXHR|errorThrown) {
    // code is always executed
  });
```
Where:

- `url` the url to send the request to.
- `method` the HTTP method to use for the request.
- `data` data to be sent to the server.

Note that `done`, `fail` and `always` are `Promise` methods which work very similar to callback functions.  You can read about promises [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and the jQuery's version of promise known as `deferred` [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) but we will cover them later in the course.

These methods all take a callback function with the following parameters:

- `data` data returned by the server, it can be an Object, String or Array.  Note that jQuery will automatically call `JSON.parse` internally and conver JSON strings to JavaScript objects.
- `textStatus` is an error string returned by the server.
- `errorThrown` is the actual HTTP status error text, for example "Not found".
- `jqXHR` is a superset of the `XMLHttpRequest` object and contains the following properties:
  - `readyState` value range of 0 to 4 as described in [XMLHttpRequest](document-object-model.md#xmlhttprequest).
  - `status` HTTP status codes described in [XMLHttpRequest](document-object-model.md#xmlhttprequest).
  - `statusText` HTTP status text described in [XMLHttpRequest](document-object-model.md#xmlhttprequest).

Note that in jQuery versions prior to 3.0, `success`, `error` and `complete` are used instead of `done`, `fail` and `always` respectively.

For more information on `jQuery.ajax()` see [jQuery's API documentation](http://api.jquery.com/jquery.ajax/)

Examples

GET Request
```JavaScript
$.ajax('http://jsonplaceholder.typicode.com/users', {
    method: 'GET'
  })
  .done(function(users) {
    console.log(users);
  })
  .fail(function(err) {
    console.log('error');
  })
  .always(function() {
    console.log('complete');;
  });
```

POST Request
```JavaScript
$.ajax('http://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    data: {
      name: 'John Smith',
      username: 'jsmith'
    }
  })
  .done(function(user) {
    console.log(user);
  })
  .fail(function() {
    console.log('error');
  })
  .always(function() {
    console.log('complete');;
  });
```

## Exercise: jQuery Ajax
- Using the http://jsonplaceholder.typicode.com/posts endpoint for your data:
  - Make an AJAX call to the endpoint by clicking a `Get Posts` button.
  - Once you receive the response, convert each post to an instance of a `Post` object.
  - Display the list of posts in the browser.
- Using the http://jsonplaceholder.typicode.com/posts endpoint:
  - Make an AJAX call to send the title and body of a post.  
  - Once you have confirmed the post is added, append this post to the end of the list.
