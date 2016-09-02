# Introduction to React
React is a JavaScript library to build user interfaces.  It was developed by Facebook and Instagram teams with to solve one problem: building large applications with data that changes over time.

## Principles

- Component-based: Allows you to build encapsulated components that manage their own state, then compose them to make complex UIs.
- Declarative: It will efficiently update and render just the right components when your data changes.
- Learn once, write anywhere:  You can develop new features in React without rewriting existing code. React can render on the server using Node and power mobile apps using React Native.

## Getting Started
To understand React, we will be using our `node-blogger` API to build a simple comments box.

We will be using a Node server that serves a static `index.html` page.  Let's get started by [cloning the react start repository](https://github.com/CodeTahoe/react-starter) and then cloning the [node-blogger repository](https://github.com/CodeTahoe/node-blogger) to serve as our API.

Note that for `nod-blogger`, we want to use a slightly modified API at the `no-auth` branch, so after cloning:

```sh
git checkout -b no-auth origin/no-auth
```

Once you have the repositories, go ahead and run each using:

```sh
nodemon app
```

`react-starter` will run on port `3001` and `node-blogger` will be running on port `3000`.

Let's take a look at `public/index.html` in `react-starter` and break it down in inline comments:

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React Tutorial</title>
    <!-- Basic css stylesheet -->
    <link rel="stylesheet" href="css/index.css" />
    <!-- Script reference to react core -->
    <script src="https://npmcdn.com/react@15.3.0/dist/react.js"></script>
    <!-- Script reference to react-dom for DOM manipulation -->
    <script src="https://npmcdn.com/react-dom@15.3.0/dist/react-dom.js"></script>
    <!-- Babel is used to compile JSX to plaing JavaScript -->
    <script src="https://npmcdn.com/babel-core@5.8.38/browser.min.js"></script>
    <!-- jQuery is included to make AJAX calls simple -->
    <script src="https://npmcdn.com/jquery@3.1.0/dist/jquery.min.js"></script>
  </head>
  <body>
    <!-- Element that ReactDOM will append our components to -->
    <div id="content"></div>
    <!-- Reference to index.js where you will be writing your React code -->
    <script type="text/babel" src="js/index.js"></script>
  </body>
</html>
```

Babel is a compiler that allows you to write next generation JavaScript today, before any browser support is implemented.  It does this by compiling everything to plain JavaScript that is supported by current browsers.  We will see why we need this in the following section.

Before we go any further, let's download the [React Developer Tool Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).  We will use this to explore the properties and methods of our React components.

## First Component
React is all about modular, composable components. For our comment box example, we'll have the following component structure:

```
- CommentBox
  - CommentList
    - Comment
  - CommentForm
```

Let's build the CommentBox component, which is just a simple `<div>`:

```JavaScript
class CommentBox extends React.Component {
  render() {
    return (
      <div className="comment-box">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
};
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
```

Note that native HTML element names start with a lowercase letter, while custom React class names follow the JavaScript naming convention for class names.

### JSX Syntax
The XML syntax inside of JavaScript is called JSX.  In order to translate it to vanilla JavaScript we use `<script type="text/babel">` and include Babel to actually perform the transformation in the browser.

JSX is syntactic sugar to this plain JavaScript:

```JavaScript
class CommentBox extends React.Component {
  render() {
    return (
      React.createElement('div', {className: "comment-box"},
        "Hello, world! I am a CommentBox."
      )
    );
  }
};
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
```

Use of JSX is optional, however it is much easier to write JSX than it is to write plain JavaScript when it comes to rendering components.

### Component Breakdown
We pass some methods in a JavaScript object to `React.createClass()` to create a new React component. The most important of these methods is called `render` which returns a tree of React components that will eventually render to HTML.

The `<div>` tags are not actual DOM nodes; they are instantiations of React `div` components. You can think of these as markers or pieces of data that React knows how to handle.

Note that in addition to basic HTML components, you can return a tree of custom components that you or someone else has built.  This is what makes React composable.

`ReactDOM.render()` instantiates the root component (`CommentBox`), starts the framework, and injects the markup into a raw DOM element, provided as the second argument (`document.getElementById('content')`).

The `ReactDOM` module exposes DOM-specific methods, while `React` has the core tools shared by React on different platforms (e.g., React Native).

## Composing Components
Let's now add the skeleton for the `CommentList` and `CommentForm` components:

```JavaScript
class CommentList extends React.Component {
  render() {
    return (
      <div className="comment-list">
        Hello, world! I am a CommentList.
      </div>
    );
  }
};

class CommentForm extends React.Component {
  render() {
    return (
      <div className="comment-form">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
}
```

And then update our `CommentBox` component to use the new components:

```JavaScript
class CommentBox extends React.Component {
  render() {
    return (
      <div className="comment-box">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
}
```

We are now mixing HTML tags and custom components. HTML components are regular React components, just like the ones you define, with one difference. The JSX compiler will automatically rewrite HTML tags to `React.createElement(tagName)` expressions and leave the components we defined alone.

### Using `props`
Next, we're going to create the `Comment` component, which will depend on data passed in from its parent. In React, data passed in from a parent component is available as a 'property' on the child component. These 'properties' are accessed through `this.props`. Using props, we will be able to read the data passed to the `Comment` from the `CommentList`, and render some markup:

```JavaScript
class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <h2 className="comment-user">
          {this.props.user.username}
        </h2>
        {this.props.children}
      </div>
    );
  }
}
```

By surrounding a JavaScript expression in braces inside JSX (as either an attribute or child), you can drop text or React components into the tree. We access named attributes passed to the component as keys on `this.props` and any nested elements as `this.props.children`.

### Component Properties
Now that we have defined the `Comment` component, we will want to pass it the username and comment body. This allows us to reuse the same code for each unique comment. Now let's add some comments within our `CommentList`:

```JavaScript
class CommentList extends React.Component {
  render() {
    return (
      <div className="comment-list">
        <Comment user={ { username: 'jsmith' } }>This is one comment</Comment>
        <Comment user={ { username: 'jdoe' } }>This is another comment</Comment>
      </div>
    );
  }
}
```

Here, we have passed data from the parent `CommentList` component to the child `Comment` components. As noted above, the `Comment` component will access these 'properties' through `this.props.author`, and `this.props.children`.

## Data Model
Let's now quickly mock the data we are expecting from the server so we can further build our comment box:

```JavaScript
var data =  {
  title: 'My Post Title',
  body: 'My post body',
  comments: [
    { _id: 1, user: { username: 'jsmith' }, body: "This is one comment"},
    { _id: 2, user: { username: 'jdoe' }, body: "This is another comment"}
  ]
};
```

We then need to get this data into `CommentList` in a modular way. Modify `CommentBox` and the `ReactDOM.render()` call to pass this data into the `CommentList` via props:

```JavaScript
class CommentBox extends React.Component {
  render() {
    return (
      <div className="comment-box">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
}

ReactDOM.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);
```

Now that the data is available in the `CommentList`, let's render the comments dynamically:

```JavaScript
class CommentList extends React.Component {
  render() {
    var commentNodes = this.props.data.comments.map(function(comment) {
      return (
        <Comment user={comment.user} key={comment._id}>
          {comment.body}
        </Comment>
      );
    });
    return (
      <div className="comment-list">
        {commentNodes}
      </div>
    );
  }
}
```

The [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) takes an existing array and creates a new array with the return results of the callback function.

## Getting Data from API
Let's remove the `data` prop and replace it with `url`, which is the URL of our API:

```JavaScript
ReactDOM.render(
  <CommentBox url="http://localhost:3000/posts/57a4a225be1c7c47182aa51a" />,
  document.getElementById('content')
);
```

This component is different from the prior components because it will have to re-render itself, meaning at first it won't have any data until the request from the server comes back, at which point the component may need to render some new comments.

## Reactive State
So far, based on its `props`, each component has rendered itself once. `props` are immutable: they are passed from the parent and are "owned" by the parent. To implement interactions, we introduce mutable state to the component. `this.state` is private to the component and can be changed by calling `this.setState()`. When the state updates, the component re-renders itself.

### Initializing State
Since we will be making an AJAX call to get the data now, we should set the initial state of our component, which is the state that it is waiting for data to come back from the API:

```JavaScript
class CommentBox extends React.Component {
  constructor(props) {
   super(props);

   this.state = { data: { comments: [] } };
  }

  render() {
    return (
      <div className="comment-box">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
}

ReactDOM.render(
  <CommentBox url="http://localhost:3000/posts/57a4a225be1c7c47182aa51a"  />,
  document.getElementById('content')
);
```

Notice that we set `this.state.data` to an empty array in the class constructor, which is executed only once.  This is how we initialize state for any component.

### Updating State
When the component is first created, we want to GET our data from the API and update the state to reflect the latest data. We're going to use jQuery to make an AJAX GET request to the API:

```JavaScript
class CommentBox extends React.Component {
  constructor(props) {
   super(props);

   this.state = { data: { comments: [] } };
  }

  componentDidMount() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false
    })
    .done(function(post) {
      this.setState({ data: post });
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error(err);
    }.bind(this));
  }

  render() {
    return (
      <div className="comment-box">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
}

ReactDOM.render(
  <CommentBox url="http://localhost:3000/posts/57a4a225be1c7c47182aa51a"  />,
  document.getElementById('content')
);
```

Here, `componentDidMount` is a method called automatically by React after a component is rendered for the first time. The key to dynamic updates is the call to `this.setState()`. We replace the old array of comments with the new one from the server and the UI automatically updates itself. Because of this reactivity, it is only a minor change to add live updates. We will use simple polling here but you could easily use WebSockets or other technologies.

```JavaScript
class CommentBox extends React.Component {
  constructor(props) {
   super(props);

   this.state = { data: { comments: [] } };

   this.getComments = this.getComments.bind(this);
  }

  getComments() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false
    })
    .done(function(post) {
      this.setState({ data: post });
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error(err);
    }.bind(this));
  }

  componentDidMount() {
    this.getComments();
    setInterval(this.getComments, this.props.pollInterval)
  }

  render() {
    return (
      <div className="comment-box">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
}

ReactDOM.render(
  <CommentBox url="http://localhost:3000/posts/57a4a225be1c7c47182aa51a" pollInterval={2000} />,
  document.getElementById('content')
);
```

All we have done here is move the AJAX call to a separate method and call it when the component is first loaded and every 2 seconds after that.

Note that methods do not autobind in ES6, meaning that they don't automatically bind `this` to the instance. You'll have to explicitly use `.bind(this)`.  The best way to bind `this` is to do it in constructor like we have done above with `this.getComments = this.getComments.bind(this)`.  This way, it will be bound once and only when the component is created.

## Updating Data
Now we should update our `CommentForm` component to take a username and comment body:

```JavaScript
class CommentForm extends React.Component {
  render() {
    return (
      <form className="comment-form">
        <input type="text" placeholder="Your username" />
        <input type="text" placeholder="Say something..." />
        <input type="submit" value="Post" />
      </form>
    );
  }
}
```

### Controlled Components
With the traditional DOM, `input` elements are rendered and the browser manages the state (its rendered value). As a result, the state of the actual DOM will differ from that of the component. This is not ideal as the state of the view will differ from that of the component. In React, components should always represent the state of the view and not only at the point of initialization.

Hence, we will be using `this.state` to save the user's input as it is entered. We define an initial `state` with two properties `user.username` and `body` and set them to be empty strings. In our `<input>` elements, we set the `value` prop to reflect the state of the component and attach `onChange` handlers to them. These `<input>` elements with a `value` set are called controlled components.

```JavaScript
class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: { username: '' }, body: '' };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ user: { username: e.target.value } });
  }

  handleBodyChange(e) {
    this.setState({ body: e.target.value });
  }

  render() {
    return (
      <form className="comment-form">
        <input
          type="text"
          placeholder="Your username"
          value={this.state.user.username}
          onChange={this.handleUsernameChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.body}
          onChange={this.handleBodyChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
}
```

### Events
React attaches event handlers to components using a camelCase naming convention. We attach `onChange` handlers to the two `<input>` elements. Now, as the user enters text into the `<input>` fields, the attached `onChange` callbacks are fired and the `state` of the component is modified. Subsequently, the rendered value of the `<input>` element will be updated to reflect the current component `state`.

### Form Submissions
When the user submits the form, we should clear it, submit a request to the API, and refresh the list of comments. To start, let's listen for the form's submit event and clear it:

```JavaScript
class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: { username: '' }, body: '' };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ user: { username: e.target.value } });
  }

  handleBodyChange(e) {
    this.setState({ body: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    var username = this.state.user.username.trim();
    var body = this.state.body.trim();

    if (!username || !body) {
      return;
    }

    // TODO: send request to the server

    this.setState({ user: { username: '' }, body: '' });
  }

  render() {
    return (
      <form className="comment-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your username"
          value={this.state.user.username}
          onChange={this.handleUsernameChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.body}
          onChange={this.handleBodyChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
}
```

We attach an `onSubmit` handler to the form that clears the form fields when the form is submitted with valid input.

We also call `preventDefault()` on the event to prevent the browser's default action of submitting the form.

### Callback `props`
When a user submits a comment, we will need to refresh the list of comments to include the new one. It makes sense to do all of this logic in `CommentBox` since `CommentBox` owns the state that represents the list of comments.

We need to pass data from the child component back up to its parent. We do this in our parent's `render` method by passing a new callback (`handleCommentSubmit`) into the child, binding it to the child's `onCommentSubmit` event. Whenever the event is triggered, the callback will be invoked:

```JavaScript
class CommentBox extends React.Component {
  constructor(props) {
   super(props);

   this.state = { data: { comments: [] } };

   this.getComments = this.getComments.bind(this);
   this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  getComments() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false
    })
    .done(function(post) {
      this.setState({ data: post });
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error(err);
    }.bind(this));
  }

  handleCommentSubmit(comment) {
    // TODO: submit to the server and refresh the list
  }

  componentDidMount() {
    this.getComments();
    setInterval(this.getComments, this.props.pollInterval)
  }

  render() {
    return (
      <div className="comment-box">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}

ReactDOM.render(
  <CommentBox url="http://localhost:3000/posts/57a4a225be1c7c47182aa51a" pollInterval={2000} />,
  document.getElementById('content')
);
```

Now that `CommentBox` has made the callback available to `CommentForm` via the `onCommentSubmit` prop, the `CommentForm` can call the callback when the user submits the form:

```JavaScript
class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: { username: '' }, body: '' };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ user: { username: e.target.value } });
  }

  handleBodyChange(e) {
    this.setState({ body: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    var username = this.state.user.username.trim();
    var body = this.state.body.trim();

    if (!username || !body) {
      return;
    }

    this.props.onCommentSubmit({ user: { username: username}, body: body });

    this.setState({ user: { username: '' }, body: '' });
  }

  render() {
    return (
      <form className="comment-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your username"
          value={this.state.user.username}
          onChange={this.handleUsernameChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.body}
          onChange={this.handleBodyChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
}
```

Now that the callbacks are in place, all we have to do is submit to the server and refresh the list:

```JavaScript
class CommentBox extends React.Component {
  constructor(props) {
   super(props);

   this.state = { data: { comments: [] } };

   this.getComments = this.getComments.bind(this);
   this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  getComments() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false
    })
    .done(function(post) {
      this.setState({ data: post });
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error(err);
    }.bind(this));
  }

  handleCommentSubmit(comment) {
    $.ajax({
      url: this.props.url + '/comments/',
      dataType: 'json',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(comment)
    })
    .done(function(post) {
      this.setState({data: post});
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error(err);
    }.bind(this));
  }

  componentDidMount() {
    this.getComments();
    setInterval(this.getComments, this.props.pollInterval)
  }

  render() {
    return (
      <div className="comment-box">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}

ReactDOM.render(
  <CommentBox url="http://localhost:3000/posts/57a4a225be1c7c47182aa51a" pollInterval={2000} />,
  document.getElementById('content')
);
```

## Code Organization
You'll notice that our file is starting to get pretty big, even though our application is a pretty simple one.  This will obviously be a much bigger issue with a larger application.

It is a React best practice to have one component per file, `export` the component and then `import` the component from in another file.  This and other React best practices are outline in [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react), which we should be using during our own React development going forward.

### Webpack
In order for us to be able to extract our code into module, we will be using [Webpack](http://webpack.github.io/docs/).  Webpack is a module bundler which takes modules with dependencies and generates static assets by bundling them together based on some configuration.

The support of [loaders](http://webpack.github.io/docs/using-loaders.html) in Webpack makes it a perfect fit for using it along with React.  Loaders are transformations that are applied on a resource file of your app. They are functions (running in node.js) that take the source of a resource file as the parameter and return the new source. For example, we can use the `babel-loader` to support ES6 and JSX.

#### Installation and Configuration
Since Webpack is a node.js package, we can install it using npm.  In our `react-starter` directory, we need to install Webpack as a dev dependency:

```bash
npm i webpack --save-dev
```

Next, we need to add a configuration file for Webpack in `webpack.config.js`:


```JavaScript
const webpack = require('webpack'),
      path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'app');

const config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR + '/js',
    filename: 'bundle.js'
  }
};

module.exports = config;
```

Next, we need to move our `public/js/index.js` to `app/index.jsx`, notice we changed the extension per React best practices.

It is recommended that you install the [Atom React Plugin](https://orktes.github.io/atom-react/) so that Atom can recognize `.jsx` files.  You may need to restart Atom after installation for the module's changes to take affect.

We should then update our `index.html` to point to `public/js/bundle.js`:

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React Starter</title>
    <!-- Not present in the tutorial. Just for basic styling. -->
    <link rel="stylesheet" href="css/index.css" />
    <script src="https://npmcdn.com/react@15.3.0/dist/react.js"></script>
    <script src="https://npmcdn.com/react-dom@15.3.0/dist/react-dom.js"></script>
    <script src="https://npmcdn.com/babel-core@5.8.38/browser.min.js"></script>
    <script src="https://npmcdn.com/jquery@3.1.0/dist/jquery.min.js"></script>
  </head>
  <body>
    <div id="content"></div>
    <!-- Changed our script to point to bundle.js -->
    <script src="js/bundle.js" type="text/javascript"></script>
  </body>
</html>
```

Next, we need add the appropriate loaders to handle React, JSX and our ES6 syntax:

```
npm i babel-loader babel-preset-es2015 babel-preset-react --save-dev
```

`babel-loader` is the Webpack loader that transforms ES6 and JSX to plain JavaScript that is supported by today's browsers.  It relies on `babel-preset-es2015` and `babel-preset-react` modules to make this transformation respectively.

Just like Webpack, Babel requires some configuration.  We need to add a `.babelrc` file to handle this configuration:

```JSON
{
  "presets" : ["es2015", "react"]
}
```

Now we need to tell Webpack to use `babel-loader`:

In `webpack.config.js`:
```JavaScript
const webpack = require('webpack'),
      path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'app');

const config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR + '/js',
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  }
};

module.exports = config;
```

The `loaders` property takes an array of loaders, here we are just using `babel-loader`. Each object in `loaders` specifies the file extensions it should process via the `test` property. Here we have configured it to process both `.js` and `.jsx` files using the regular expression. The include property specifies the directory to be used to look for these file extensions. The `loader` property represents the name of the loader.

Now that we have our code automatically being transformed via Babel, we can remove the Babel reference in our `index.html`:

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React Starter</title>
    <!-- Not present in the tutorial. Just for basic styling. -->
    <link rel="stylesheet" href="css/index.css" />
    <script src="https://npmcdn.com/react@15.3.0/dist/react.js"></script>
    <script src="https://npmcdn.com/react-dom@15.3.0/dist/react-dom.js"></script>
    <script src="https://npmcdn.com/jquery@3.1.0/dist/jquery.min.js"></script>
  </head>
  <body>
    <div id="content"></div>
    <!-- Changed our script to point to bundle.js -->
    <script src="js/bundle.js" type="text/javascript"></script>
  </body>
</html>
```

### Load React and React-Dom using `npm`
We can further clean up our code now that we have Webpack in place.  

First, let's install `react` and `react-dom` via `npm`:

```bash
npm i react react-dom --save
```

Then let's remove our references to these in our `index.html`:

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React Starter</title>
    <!-- Not present in the tutorial. Just for basic styling. -->
    <link rel="stylesheet" href="css/index.css" />
    <script src="https://npmcdn.com/jquery@3.1.0/dist/jquery.min.js"></script>
  </head>
  <body>
    <div id="content"></div>
    <!-- Change this to use bundle.js -->
    <script src="js/bundle.js" type="text/javascript"></script>
  </body>
</html>
```

Then let's `import` these on top of our `index.jsx` file:

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
```

Then run Webpack again to update our `bundle.js` accordingly:

```bash
./node_modules/.bin/webpack -d
```

Note that `import` works just like Node.js `require`, allowing us to import modules from files to be used in our code.

For better code organization, we should install `jquery` via `npm`:

```bash
npm install jquery --save
```

Remove it from our `index.html`:

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React Starter</title>
    <!-- Not present in the tutorial. Just for basic styling. -->
    <link rel="stylesheet" href="css/index.css" />
  </head>
  <body>
    <div id="content"></div>
    <!-- Change this to use bundle.js -->
    <script src="js/bundle.js" type="text/javascript"></script>
  </body>
</html>
```

And `import` it in our `index.jsx`:

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
```

Then run Webpack again to update our `bundle.js`:

```bash
./node_modules/.bin/webpack -d
```

### Simplifying Dev Flow
We can further simplify our development flow by having Webpack watch changes and automatically update `bundle.js`:

```bash
./node_modules/.bin/webpack -d --watch
```

We can also use `npm` as a tool runner to simplify things even more.  To do that, we update `package.json` to include a `"script"` property at the bottom:

```JSON
....
"scripts": {
  "dev": "webpack -d --watch"
}
```

Now we can now simply type `npm run dev` to run Webpack in development mode.

### Component Per File
Let's start organizing our components into their own files.  We'll start by moving a component that has no other embedded components and is the simplest, `Comment`:

Create a `components` folder under the `app` folder and a `Comment.jsx` file in that folder.  Then let's move the `Comment` component in there:

```JavaScript
import React from 'react';

export default class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <h2 className="comment-user">
          {this.props.user.username}
        </h2>
        {this.props.children}
      </div>
    );
  }
}
```

Notice that we have to import 'react' here again because we are extending `React.Component`.  Another thing to note is the `export default` keywords right before class.  This indicates that when including the file, the default export would be our React component.  This is very similar to `module.exports` in Node.js.

Now in our `app/index.jsx`, we remove the `Comment` component and import our new component:

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Comment from './components/Comment.jsx';

// Note that Comment component has been removed from here

class CommentList extends React.Component {
  render() {
    var commentNodes = this.props.data.comments.map(function(comment) {
      return (
        <Comment user={comment.user} key={comment._id}>
          {comment.body}
        </Comment>
      );
    });
    return (
      <div className="comment-list">
        {commentNodes}
      </div>
    );
  }
}
...
```

We can now move `CommentList` out of `index.jsx` and into its own file the same way:

In `CommentList.jsx`:

```JavaScript
import React from 'react';

import Comment from './Comment.jsx';

export default class CommentList extends React.Component {
  render() {
    var commentNodes = this.props.data.comments.map(function(comment) {
      return (
        <Comment user={comment.user} key={comment._id}>
          {comment.body}
        </Comment>
      );
    });
    return (
      <div className="comment-list">
        {commentNodes}
      </div>
    );
  }
}
```

And update our `index.jsx` accordingly:

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import CommentList from './components/CommentList.jsx';

// Note that CommentList component has been removed from here
...
```

Following the same process, we can extract the `CommentForm` and `CommentBox` components into their own files leaving only the following in `index.jsx`:

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';

import CommentBox from './components/CommentBox.jsx';

ReactDOM.render(
  <CommentBox url="http://localhost:3000/posts/57ae4a8bff6fe83b0cb3f05d" pollInterval={2000} />,
  document.getElementById('content')
);
```

## React Router
[React Router](https://github.com/reactjs/react-router) is a complete routing library for React.

React Router keeps our UI in sync with the URL. It has a simple API with powerful features like lazy code loading, dynamic route matching, and location transition handling built right in.

To get started with React Router, we will first clone and walk through the [React Router Tutorial](https://github.com/CodeTahoe/react-router-tutorial)

Then we are going to take what we have learned and apply it to create a simple blogging system using [node-blogger](https://github.com/CodeTahoe/node-blogger) as our API.
