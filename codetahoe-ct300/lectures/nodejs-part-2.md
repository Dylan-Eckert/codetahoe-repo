# Node.js - Continued

## Using Mongoose to Connect to MongoDB
Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

### Setting up a MongoDB Connection
To start using Mongoose we first need to install it:

```sh
npm install mongoose --save
```

Next, we need to setup express to use Mongoose to connect to our database.  In our `app.js` file, let's add:

```JavaScript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/node-blogger');

// Have Mongoose use the ES6's built in promises
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', function(err) {
  console.error('There was an error: ' + err);
});
db.once('open', function() {
  console.log('Connected to node-blogger database!');
});
```

Now if we run our Express app, we should get message that we are connected to our database.

### Defining Schemas and Models
Even though MongoDB is schema-less, Mongoose allows to define schemas for our models so that we can do things like validations and build our own custom methods.

Everything in Mongoose is derived from Schemas, so we first need to define a Schema for our model.  Let's add a Schema to `models/post.rb`:

```JavaScript
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, trim: true, default : '' },
  body: { type: String, trim: true, default : '' },
  comments: [{
    body: { type : String, default : '' },
    createdAt: { type : Date, default : Date.now }
  }],
  createdAt: Date,
  updatedAt: Date
});
```

The allowed SchemaTypes are:

- `String`
- `Number`
- `Date`
- `Buffer`
- `Boolean`
- `Mixed`
- `ObjectId`
- `Array`

You can read more about them [here](http://mongoosejs.com/docs/schematypes.html).

One thing worth nothing is that we decided to make `comments` embedded documents in our `PostSchema`.  This decision was made based on MongoDB's [Data Model Design](https://docs.mongodb.com/manual/core/data-model-design/) recommendations.

Now that we have our `PostSchema`, we can then derive our Model from it and then export it, so at bottom of the same file:

```JavaScript
module.exports = mongoose.model('Post', PostSchema);
```

We can then require our model in our routes:

```JavaScript
const Post = require('../models/posts');
```

Before we start using it, we should make it a bit more useful by adding validations and some custom methods.

### Validations
We can also easily add validations to our Mongoose Schemas, this can be done either when we first declare our fields in the schema:

```JavaScript
title: { type: String, trim: true, required: true },
body: { type: String, trim: true, required: true },
```

Or after:

```JavaScript
PostSchema.path('title').required(true, 'Post title cannot be blank');
PostSchema.path('body').required(true, 'Post body cannot be blank');
```

The second option is best practice because it allows us to group our validations and therefore increases readability.

### Custom Methods
Mongoose allows us to define custom methods that act on instances of a Model.  Let's add method that allows us to add a comment to a particular post:

```JavaScript
PostSchema.methods.addComment = function(comment) {
  this.comments.push({
    body: comment.body
  });

  return this.save();
};
```

### Saving
Now that we have our `Post` model.  We can use it to save our posts to the database.  In `routes/posts.rb`:

```JavaScript
const Post = require('../models/posts');

router.post('/', function(req, res) {
  // create a new instance of Post model
  var post = new Post(req.body);

  // Call our model's save method to insert into MongoDB
  post.save()
    .then(function(post) {
      // Respond with our newly created post
      res.json(post);
    }).catch(function(err) {
      // If there is an error (i.e. validation), return the error
      res.status(422).json(err);
    });
});
```

### Querying
We can also use our `Post` model to query for a single or all posts:

Find a single post by `_id`:
```JavaScript
router.get('/:id', function(req, res) {
  Post.find({ _id: req.params.id }, function(err, post) {
    res.json(post);
  });
});
```

Return all posts:
```JavaScript
router.get('/', function(req, res) {
  Post.find({}, function(err, posts) {
    res.json(posts);
  });
});
```

### Updating
We can also update our post using our `Post` model:

Get a post and then update:
```JavaScript
router.patch('/:id', function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    // respond with updated post
    post.title = req.body.title;
    post.body = req.body.body;

    // Call our model's save method to update the document
    post.save()
      .then(function(post) {
        // Respond with our updated post
        res.json(post);
      }).catch(function(err) {
        // If there is an error (i.e. validation), return the error
        res.status(422).json(err);
      });
  });
});
```
Or

Find one and update:
```JavaScript
router.patch('/:id', function(req, res) {
  Post.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function(err, post) {
    // respond with updated post
    res.json(post);
  });
});
```

Or

Find by ID and update:
```JavaScript
router.patch('/:id', function(req, res) {
  Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, post) {
    // respond with updated post
    res.json(post);
  });
});
```

Note that for the last two variations, `{ new: true }` option tells Mongoose to return the updated document and not the original one we found.  

They last two variations are preferred to the first variation since you can pass on your entire `req.body` and have MongoDB figure out which fields to update.


### Removing
We can also remove our post using our `Post` model:

Get a post and then remove:
```JavaScript
router.delete('/:id', function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    post.remove(function(err) {
      res.json(true);
    });
  });
});
```

Find one and remove:
```JavaScript
router.delete('/:id', function(req, res) {
  Post.findOneAndRemove({ _id: req.params.id }, function(err, post) {
    res.json(true);
  });
});
```

Or

Find by ID and remove:
```JavaScript
router.delete('/:id', function(req, res) {
  Post.findByIdAndRemove(req.params.id, function(err, post) {
    res.json(true);
  });
});
```

### Embedded Documents
We added an `addComment` method previously to save comments, let's implement that functionality in our routes.

```JavaScript
router.post('/:postId/comments', function(req, res) {
  function onFind(err, post) {
    function onCommentAdded(post) {
      res.json(post);
    }

    function onError(err) {
      res.status(422).json(err);
    }

    post.addComment(req.body)
      .then(onCommentAdded)
      .catch(onError);
  }

  Post.findById(req.params.postId, onFind);
});
```

### References
We need to associate users to posts and comments, per [Data Model Design](https://docs.mongodb.com/manual/core/data-model-design/), this should be a separate collection.

#### Schemas
Let's start off by adding a `User` model that both posts and comments reference.

```JavaScript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  username: { type: String, default: '' }
});

// Validations
UserSchema.path('name').required(true, 'Name is required.');
UserSchema.path('email').required(true, 'Email is required.');
UserSchema.path('username').required(true, 'Username is required.');

module.exports = mongoose.model('User', UserSchema);
```

We also need to add the corresponding refs to our `PostSchema`:

```JavaScript
const PostSchema = new mongoose.Schema({
  title: { type: String, trim: true, default : '' },
  body: { type: String, trim: true, default : '' },
  user: { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
  comments: [{
    body: { type : String, default : '' },
    user: { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],
  createdAt: { type : Date, default : Date.now },
  updatedAt: Date
});
```

#### Routes
Let's also quickly add a routes to create users so that we can use them create posts and comments. In `routes/users.js`:

```JavaScript
const express = require('express'),
      User = require('../models/user');

const router = express.Router();

router.post('/', function(req, res) {
  var user = new User(req.body);

  user.save()
    .then(function(user) {
      res.json(user);
    }).catch(function(err) {
      res.status(422).json(err);
    });
});

module.exports = router;
```

We need to also add our new route to our `app.js` routes section:

```JavaScript
app.use('/users', require('./routes/users'));
```

#### Authorization
Next, we should add middleware to append the `user` based on an id that gets passed in `Authorization` header.  Normally this would be a token (i.e [JWT](https://jwt.io/)) and not a user ID (hint: terrible security practice).   

The format would be:

```
Authorization: <_id>
```

Let's add a middleware to handle our "authorization":

```JavaScript
const User = require('./models/user');

// Use this middleware for all routes except for the ones that start with /users
app.use(/^\/(?!users).*/, function(req, res, next) {
  User.findById(req.get('Authorization'), function(err, user) {
    // If user doesn't exist, respond with Unauthorized
    if (err || user === null) {
      res.send(401);
      return;
    }

    // Else add user to req.user and go to next route
    req.user = user;
    next();
  });
});
```

#### Saving
Now that we have a user for every request, we can reference this user when creating comments and posts:

`models/post.js`
```JavaScript
PostSchema.methods.addComment = function(user, comment) {
  this.comments.push({
    body: comment.body,
    user: user._id
  });

  return this.save();
};
```

`routes/posts.js`
```JavaScript
router.post('/', function(req, res) {
  var post = new Post(req.body);

  // Assign req.user._id to post.user
  post.user = req.user._id;

  post.save()
    .then(function(post) {
      // Respond with our newly created post
      res.json(post);
    }).catch(function(err) {
      // If there is an error (i.e. validation), return the error
      res.status(422).json(err);
    });
});

//... omitted for brevity

router.post('/:postId/comments', function(req, res) {
  function onFind(err, post) {
    function onCommentAdded(post) {
      res.json(post);
    }

    function onError(err) {
      res.status(422).json(err);
    }

    // Pass req.user as an argument
    post.addComment(req.user, req.body)
      .then(onCommentAdded)
      .catch(onError);
  }

  Post.findById(req.params.postId, onFind);
});
```

#### Populating References
Currently, when we query for a post, we only see the user ID, that's not really helpful if we want to display the user information, so let's make a change to get only the username for both the post and comments.

`routes/posts.js`
```JavaScript
router.get('/:id', function(req, res) {
  Post.findById(req.params.id)
      // Populate referenced user, but only grab the username
      .populate('user', 'username')
      // Populate embedded documents referenced user, but only grab the usernames
      .populate('comments.user', 'username')
      // Execute the query and then handle the results in a callback
      .exec(function(err, post) {
        res.json(post);
      });
});
```
