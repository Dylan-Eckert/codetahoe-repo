
# Rails - Expansion on Concepts

## Routing
The Rails router recognizes URL patterns and dispatches them to the appropriate controller.

Rails routes are defined in `config/routes.rb` files.

### Resources
In Rails, a resourceful route provides a mapping between HTTP verbs and URLs to controller actions. By convention, each action also maps to a specific CRUD operation in a database. So an entry in the routing file, such as:

```Ruby
resources :blogs
```

Creates seven different routes in your application, all mapping to the `Blogs` controller:

<table>
<thead>
<tr>
<th>HTTP Verb</th>
<th>Path</th>
<th>Controller#Action</th>
<th>Used for</th>
</tr>
</thead>
<tbody>
<tr>
<td>GET</td>
<td>/blogs</td>
<td>blogs#index</td>
<td>display a list of all blogs</td>
</tr>
<tr>
<td>GET</td>
<td>/blogs/new</td>
<td>blogs#new</td>
<td>return an HTML form for creating a new blog</td>
</tr>
<tr>
<td>POST</td>
<td>/blogs</td>
<td>blogs#create</td>
<td>create a new blog</td>
</tr>
<tr>
<td>GET</td>
<td>/blogs/:id</td>
<td>blogs#show</td>
<td>display a specific blog</td>
</tr>
<tr>
<td>GET</td>
<td>/blogs/:id/edit</td>
<td>blogs#edit</td>
<td>return an HTML form for editing a blog</td>
</tr>
<tr>
<td>PATCH/PUT</td>
<td>/blogs/:id</td>
<td>blogs#update</td>
<td>update a specific blog</td>
</tr>
<tr>
<td>DELETE</td>
<td>/blogs/:id</td>
<td>blogs#destroy</td>
<td>delete a specific blog</td>
</tr>
</tbody>
</table>

### Path and URL Helpers

Creating a resourceful route exposes a number of helpers to the controllers in your application.

In the case of `resources :blogs`:

- `blogs_path` returns `/blogs`
- `new_blog_path` returns `/blogs/new`
- `edit_blog_path(:id)` returns `/blogs/:id/edit`
- `blog_path(:id)` returns `/blogs/:id`

Each of these helpers has a corresponding `_url` helper which returns the same path prefixed with the current host, port and path prefix.

### Defining Multiple Resources
You can define multiple resources in one line:

```Ruby
resources :products, :carts, :orders
```

### Namespaces
You can organize groups of controllers under a namespace. For example, you may want to group a number of administrative controllers under an `Admin::` namespace.  You can group them together in the `config\routes.rb`:

```Ruby
namespace :admin do
  resources :products, :users
end
```

Then you would place these controllers in the `app/controllers/admin` directory:

```Ruby
# app/controllers/admin/products_controller.b
class Admin::ProductsController < ApplicationController
end

# app/controllers/admin/users_controller.b
class Admin::UsersController < ApplicationController
end
```

### Nested Resources
It's common to have resources that are logically children of other resources. For example, if your application has these models:

```Ruby
class Blogs < ApplicationRecord
  has_many :posts
end

class Post < ApplicationRecord
  belongs_to :blog
end
```

You can capture this relationship in your routing:

```Ruby
resources :blogs do
  resources :posts
end
```

You can also nest routes multiple times:

```Ruby
resources :blogs do
  resources :posts do
    resources :comments
  end
end
```

However, it is considered best practice to limit nesting to one-level deep:

```Ruby
resources :posts do
  resources :comments, only: [:index, :new, :create]
end
resources :comments, only: [:show, :edit, :update, :destroy]
```

This is called shallow nesting, and there is a shorthand for it in Rails:

```Ruby
resources :posts, shallow: true do
  resources :comments
end
```

The above will create shallow routes for all nested resources.

The idea of shallow nesting is that you only nest routes if there is no id associated to the resource, which only applies to `:index`, `:new` and `:create` actions.

### Concerns
Routing concerns allow you to declare common routes that can be reused inside other resources and routes:

```Ruby
concern :commentable do
  resources :comments
end
```

Now we can reuse `:commentable` in other resources without duplication:

```Ruby
resources :posts, concerns: :commentable

resources :messages, concerns: :commentable
```

### Additional RESTful Routes
You are not limited to the seven routes that `resources` creates by default. You can add additional routes that apply to the collection or individual members of the collection.

To add a member route, just add a `member` block and add any of `get`, `patch`, `put`, `post`, or `delete` verbs within:

```Ruby
resources :posts do
  member do
    get 'summary'
  end
end
```

If you're adding only one member route, then you can just do this:

```Ruby
resources :posts do
  get 'summary', on: :member
end
```

To add a collection route, just add a `collection` block and add any of `get`, `patch`, `put`, `post`, or `delete` verbs within:

```Ruby
resources :posts do
  collection do
    get 'search'
  end
end
```

If you're adding only one collection route, then you can just do this:

```Ruby
resources :posts do
  get 'search', on: :collection
end
```

## Controllers
After routing has determined which controller to use for a request, the controller will receive the request (this is handled by rails and invisible to us), fetch or save data from a model and use a view to create HTML output.

### Naming Convention
The naming convention of controllers in Rails favors pluralization of the last word in the controller's name.  It is not required but following this convention will allow you to use the default route generators and will keep URL and path helpers' usage consistent across your application.

### Methods and Actions
Controllers are just classes that inherit from the `ApplicationController` class and the methods inside these controllers are just like any other methods in any class.  The Rails router determines which method in which controller to execute purely based on the class and method name.

Rails also knows by default to map the action method name to its corresponding view, so there is no need to explicitly specify a view name to render.

### Parameters
There are two types of parameters in web applications:

- Parameters that are sent as part of the URL, called query string parameters. They come after the `?` and are separated by `&`
- POST data that is sent as part of a post request.  They either come from an HTML form or a REST API call containing JSON.

Rails does not distinguish between these, so they are both available via the `params` hash.

Example
```Ruby
class PostsController < ApplicationController
  # /posts?status=archived
  def index
    if params[:status] == 'archived'
      @posts = Post.where(archived: true)
    else
      @posts = Post.where(archived: false)
    end
  end

  # This action uses POST parameters. They are most likely coming
  # from an HTML form which the user has submitted. The URL for
  # this RESTful request will be "/posts", and the data will be
  # sent as part of the request body.
  def create
    @post = Post.new(params[:post])
    if @post.save
      redirect_to @post
    else
      # This line overrides the default rendering behavior, which
      # would have been to render the "create" view.
      render :new
    end
  end
end
```

#### Hash and Array Parameters
The `params` hash is not limited to one-dimensional keys and values. It can contain nested arrays and hashes.

To send an array you add brackets to the key names:

```
GET /posts?ids[]=1&ids[]=2&ids[]=3
```

The value of `params[:ids]` will now be `["1", "2", "3"]`. Note that parameter values are always strings; Rails makes no attempt to guess or cast the type.

To send hashes, you include the key name inside of brackets:

```HTML
<form accept-charset="UTF-8" action="/clients" method="post">
  <input type="text" name="client[name]" value="John" />
  <input type="text" name="client[phone]" value="415-123-1234" />
  <input type="text" name="client[address][zipcode]" value="10000" />
  <input type="text" name="client[address][city]" value="NYC" />
</form>
```

When this form is submitted, the values of the `params[:client]` hash will be: `{ "name" => "John", "phone" => "415-123-1234", "address" => { "zipcode" => "10000", "city" => "NYC" } }`.  Note that `address` is a hash within the hash.

When you use `form_for`, Rails automatically takes care of this hash naming for you.  For nested objects (hashes), Rails provides additional helpers that we will discuss at a later time.

#### JSON Parameters
Rails automatically converts JSON parameters to a corresponding hash that is available in the `params` object, for example if you're sending:

```
{ "post": { "title": "Hello", "body": "World" } }
```

Your controller will receive `params[:post]` as `{ "title" => "Hello", "body" => "World" }`.

Also, if you've turned on `config.wrap_parameters` in your initializer or called `wrap_parameters` in your controller, you can safely omit the root element in the JSON parameter.  In this case, the parameters will be cloned and wrapped with a key chosen based on your controller's name.

So sending:

```
{ "title": "Hello", "body": "World" }
```

To the `PostsController`, will give you the same exact `params[:post]` as above.

#### Routing Parameters
The params hash will always contain the `:controller` and `:action` keys, but you should use the methods `controller_name` and `action_name` instead to access these values.  Any other parameter defined in `config/routes.rb` will also be available in the `params` hash.

For example, if you have this in our routes file:

```Ruby
resources :posts
```

And a `GET posts/1` request is made, then you can access the `1` or post id via `params[:id]`.

#### Strong Parameters
With strong parameters, Action Controller parameters are forbidden to be used in Active Model mass assignments until they have been whitelisted. This means that you'll have to make a conscious decision about which attributes to allow for mass update. This is a better security practice to help prevent accidentally allowing users to update sensitive model attributes.

```Ruby
class PeopleController < ActionController::Base
  # This will raise an ActiveModel::ForbiddenAttributes exception
  # because it's using mass assignment without an explicit permit
  # step.
  def create
    Person.create(params[:person])
  end

  # This will pass with flying colors as long as there's a person key
  # in the parameters, otherwise it'll raise a
  # ActionController::ParameterMissing exception, which will get
  # caught by ActionController::Base and turned into that 400 Bad
  # Request reply.
  def update
    person = current_account.people.find(params[:id])
    person.update!(person_params)
    redirect_to person
  end

  private
    # Using a private method to encapsulate the permissible parameters
    # is just a good pattern since you'll be able to reuse the same
    # permit list between create and update. Also, you can specialize
    # this method with per-user checking of permissible attributes.
    def person_params
      params.require(:person).permit(:name, :age)
    end
end
```

## Active Record
Active Record is the layer of the system responsible for representing business data and logic. Active Record facilitates the creation and use of business objects whose data requires persistent storage to a database. It is an implementation of the Active Record pattern which itself is a description of an Object Relational Mapping (ORM) system.

### Conditions
The `where` method allows you to specify conditions to limit the records returned. Conditions can either be specified as a string, array, or hash.

```Ruby
Post.where(archived: true)
```

The above code will get all posts that have been archived.

This can also be written as:

```Ruby
Post.where("archived = ?", true)
```

You can also find posts that match a query like this:

```Ruby
Post.where("title like ?", "%#{params[:query]}%")
```

Note the `%` in SQL means 0 or many characters, and `params[:query]` is just a query string parameter.  This syntax will allow for basic searching in an application.

### Ordering
To retrieve records from the database in a specific order, you can use the `order` method.

```Ruby
Post.order(:created_at)
# OR
Post.order("created_at")
```

You could also order by ascending or descending order as well:

```Ruby
Post.order(created_at: :desc)
# OR
Post.order(created_at: :asc)
# OR
Post.order("created_at DESC")
# OR
Post.order("created_at ASC")
```

Or order by multiple fields:

```Ruby
Post.order(id: :asc, created_at: :desc)
# OR
Post.order(:id, created_at: :desc)
# OR
Post.order("id ASC, created_at DESC")
# OR
Post.order("id ASC", "created_at DESC")
```

## Blogging Application Improvements
Let's extend our blogging application to add search functionality and order posts by ascending and descending.

First we need to update `config/routes.rb`:

```Ruby
resources :blogs, shallow: true do
  collection do
    get :search
    get :search_results
  end

  resources :posts do
    resources :comments
  end
end
```

Now `rails routes` should now give you new routes and corresponding `path` and `url` helpers.

Note that these are both `collection` routes.

Then we need to add the corresponding actions in the `BlogsController`:

```Ruby
def search

end

def search_results
    @blogs = Blog.where("name like ?", "%#{params[:query]}%")
end
```

Then we simply add the corresponding views:

search.html.erb
```HTML
<%= form_tag search_results_blogs_path, :method => 'get' do %>
  <p>
    <%= text_field_tag :query %>
    <%= submit_tag "Search", :name => nil %>
  </p>
<% end %>
```

Note that we are now using `search_results_blogs_path` which is a new helper.

search_results.html.erb
```HTML
<h1>Search Blogs</h1>

<table>
  <tr>
    <th>Id</th>
    <th>Name</th>
    <th>Description</th>
  </tr>

  <% @blogs.each do |blog| %>
    <tr>
      <td><%= blog.id %></td>
      <td><%= blog.name %></td>
      <td><%= blog.description %></td>
      <td><%= link_to 'Show', blog %></td>
    </tr>
  <% end %>
</table>
```

Next, we should allow ordering by post creation date, either descending or ascending:

Let's add the following in the `show` method in our  `BlogsController`:

```Ruby
def show
  @blog = Blog.find(params[:id])

  # check if :order_by param is nil
  if params[:order_by].nil?
    # if it's nil, default to descending order
    @posts = @blog.posts.order(created_at: :desc)
  else
    # if there is a params[:order_by], then use its value
    @posts = @blog.posts.order("created_at " + params[:order_by])
  end
end
```

Note that we added a `@posts` instance variable, this is is so that we can order the posts before using them in our view.

Next, in our posts' `show.html.erb`:

```HTML
<p>
  <strong>Name</strong>
  <%= @blog.name %>
</p>
<p>
  <strong>Description</strong>
  <%= @blog.description %>
</p>
<h2>Posts</h2>
<!-- Add links to append the relevant order_by parameter -->
Order by: <%= link_to "asc", "?order_by=asc"%> <%= link_to "desc", "?order_by=desc"%>

<table>
  <tr>
    <th>Id</th>
    <th>Title</th>
    <th>Body</th>
  </tr>

  <!-- We are now rendering @posts instead of @blog.posts -->
  <%= render @posts %>
</table>

<%= link_to 'New Post', new_blog_post_path(@blog) %>
```

Note that we are now using `@posts` instead of `@blog.posts` to render our partial and we have added two links to appending `?order_by=asc` or `order_by=desc` query string parameters to the current route.

## Action View
Action View is the component in Rails that takes care of views and view rendering.  We learned that by default, Rails renders views that match their controller names.  However, we can instruct Rails to not only render other Embedded Ruby (ERB) templates, we can also instruct it to render JSON or XML.

### Templates, Partials and Layouts
The final HTML output from Rails is a composition of three Rails elements: `Templates`, `Partials` and `Layouts`.

#### Templates
We have already used templates many times building our blogging application. By default, Rails supports ERB templates when rendering HTML output.  These are files with the `.erb` extension, that contain Ruby code embedded in HTML, that we place in the `views` folder.

Example ERB Template:

```HTML
<h1>Posts</h1>

<table>
  <tr>
    <th>Title</th>
    <th>Body</th>
  </tr>

  <% @posts.each do |post| %>
    <tr>
      <td><%= post.title %></td>
      <td><%= post.body %></td>
      <td><%= link_to 'Show', post %></td>
    </tr>
  <% end %>
</table>
```

In ERB templates, the `<% %>` tags are used to execute Ruby code that does not return anything, such as conditions, loops or blocks, and the `<%= %>` tags are used when you want output.

#### Partials
Partials allow you to extract pieces of code from your templates to separate files and then reuse them throughout your templates.  

To embed partials, you use the `render` method:

Example:

```HTML
<%= render 'form' %>
```

This will look in the current directory for that partial and then render it in ERB.  If you want to render a partial from a different directory in the `views` folder, you'd have to explicitly indicate it in the render method:

```HTML
<%= render 'posts/form' %>
```

##### Rendering Collections
It is very common that a template will need to iterate over a collection and render a sub-template for each of the elements. his pattern has been implemented as a single method that accepts an array and renders a partial for each one of the elements in the array.  We previously learned the shorthand for this method:

```HTML
<%= render @post.comments %>
```

Rails determines the name of the partial to use by looking at the model name in the collection, `Comment` in this case.

If for some reason you want to use your own partial name for collections, you can do so:

```HTML
<%= render partial: "comments/single_comment", collection: @post.comments %>
```

#### Layouts
Layouts can be used to render a common view template around the results of Rails controller actions.

In our blogging application we have one layout, which was generated by Rails when we did `rails new blogger`:

```HTML
<!DOCTYPE html>
<html>
  <head>
    <title>Blogger</title>
    <%= csrf_meta_tags %>

    <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track': 'reload' %>
    <%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
  </head>

  <body>
    <%= yield %>
  </body>
</html>
```

The `<%= yield %>` line is telling Rails to render our views into this part of the blog, which in this case is in between our `<body>` tag.

## `render` and `respond_to`
We can use `render` in our controllers as well, to tell Rails to render certain templates that are not the defaults that match the action name.

We already used `render` to render a template that doesn't match our action name:

```Ruby
def create
  @post = Post.new(post_params)

  if @post.save
    redirect_to @post.blog
  else
    render :new
  end
end
```

Here, we rendered the `new.html.erb` template again if `@post` validation did not pass.  If for some reason the template was in another folder (let's say `comments`), then we could've done this:

```Ruby
def create
  @post = Post.new(post_params)

  if @post.save
    redirect_to @post.blog
  else
    render "comments/new"
  end
end
```

### Rendering Plain Text
You can also render text by:

```Ruby
render plain: "OK"
```

### Rendering JSON
Rails has built-in support for converting objects to JSON and rendering that JSON back to the browser:

```Ruby
render json: @post
```

You can also render errors the same way:

```Ruby
render json: { errors: @event.errors }, status: :unprocessable_entity
```

The `status:` option is one of the several options for the `render` method.  In this case, our JSON response will also return a `422` HTTP status code.

Rails, depending on your action, generally generates the correct response code, but in case of errors, you will have to explicitly set this.

Below are a list of the status code symbols and their corresponding status codes in Rails:

<table>
<thead>
<tr>
<th>Response Class</th>
<th>HTTP Status Code</th>
<th>Symbol</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Informational</strong></td>
<td>100</td>
<td>:continue</td>
</tr>
<tr>
<td></td>
<td>101</td>
<td>:switching_protocols</td>
</tr>
<tr>
<td></td>
<td>102</td>
<td>:processing</td>
</tr>
<tr>
<td><strong>Success</strong></td>
<td>200</td>
<td>:ok</td>
</tr>
<tr>
<td></td>
<td>201</td>
<td>:created</td>
</tr>
<tr>
<td></td>
<td>202</td>
<td>:accepted</td>
</tr>
<tr>
<td></td>
<td>203</td>
<td>:non_authoritative_information</td>
</tr>
<tr>
<td></td>
<td>204</td>
<td>:no_content</td>
</tr>
<tr>
<td></td>
<td>205</td>
<td>:reset_content</td>
</tr>
<tr>
<td></td>
<td>206</td>
<td>:partial_content</td>
</tr>
<tr>
<td></td>
<td>207</td>
<td>:multi_status</td>
</tr>
<tr>
<td></td>
<td>208</td>
<td>:already_reported</td>
</tr>
<tr>
<td></td>
<td>226</td>
<td>:im_used</td>
</tr>
<tr>
<td><strong>Redirection</strong></td>
<td>300</td>
<td>:multiple_choices</td>
</tr>
<tr>
<td></td>
<td>301</td>
<td>:moved_permanently</td>
</tr>
<tr>
<td></td>
<td>302</td>
<td>:found</td>
</tr>
<tr>
<td></td>
<td>303</td>
<td>:see_other</td>
</tr>
<tr>
<td></td>
<td>304</td>
<td>:not_modified</td>
</tr>
<tr>
<td></td>
<td>305</td>
<td>:use_proxy</td>
</tr>
<tr>
<td></td>
<td>307</td>
<td>:temporary_redirect</td>
</tr>
<tr>
<td></td>
<td>308</td>
<td>:permanent_redirect</td>
</tr>
<tr>
<td><strong>Client Error</strong></td>
<td>400</td>
<td>:bad_request</td>
</tr>
<tr>
<td></td>
<td>401</td>
<td>:unauthorized</td>
</tr>
<tr>
<td></td>
<td>402</td>
<td>:payment_required</td>
</tr>
<tr>
<td></td>
<td>403</td>
<td>:forbidden</td>
</tr>
<tr>
<td></td>
<td>404</td>
<td>:not_found</td>
</tr>
<tr>
<td></td>
<td>405</td>
<td>:method_not_allowed</td>
</tr>
<tr>
<td></td>
<td>406</td>
<td>:not_acceptable</td>
</tr>
<tr>
<td></td>
<td>407</td>
<td>:proxy_authentication_required</td>
</tr>
<tr>
<td></td>
<td>408</td>
<td>:request_timeout</td>
</tr>
<tr>
<td></td>
<td>409</td>
<td>:conflict</td>
</tr>
<tr>
<td></td>
<td>410</td>
<td>:gone</td>
</tr>
<tr>
<td></td>
<td>411</td>
<td>:length_required</td>
</tr>
<tr>
<td></td>
<td>412</td>
<td>:precondition_failed</td>
</tr>
<tr>
<td></td>
<td>413</td>
<td>:payload_too_large</td>
</tr>
<tr>
<td></td>
<td>414</td>
<td>:uri_too_long</td>
</tr>
<tr>
<td></td>
<td>415</td>
<td>:unsupported_media_type</td>
</tr>
<tr>
<td></td>
<td>416</td>
<td>:range_not_satisfiable</td>
</tr>
<tr>
<td></td>
<td>417</td>
<td>:expectation_failed</td>
</tr>
<tr>
<td></td>
<td>422</td>
<td>:unprocessable_entity</td>
</tr>
<tr>
<td></td>
<td>423</td>
<td>:locked</td>
</tr>
<tr>
<td></td>
<td>424</td>
<td>:failed_dependency</td>
</tr>
<tr>
<td></td>
<td>426</td>
<td>:upgrade_required</td>
</tr>
<tr>
<td></td>
<td>428</td>
<td>:precondition_required</td>
</tr>
<tr>
<td></td>
<td>429</td>
<td>:too_many_requests</td>
</tr>
<tr>
<td></td>
<td>431</td>
<td>:request_header_fields_too_large</td>
</tr>
<tr>
<td><strong>Server Error</strong></td>
<td>500</td>
<td>:internal_server_error</td>
</tr>
<tr>
<td></td>
<td>501</td>
<td>:not_implemented</td>
</tr>
<tr>
<td></td>
<td>502</td>
<td>:bad_gateway</td>
</tr>
<tr>
<td></td>
<td>503</td>
<td>:service_unavailable</td>
</tr>
<tr>
<td></td>
<td>504</td>
<td>:gateway_timeout</td>
</tr>
<tr>
<td></td>
<td>505</td>
<td>:http_version_not_supported</td>
</tr>
<tr>
<td></td>
<td>506</td>
<td>:variant_also_negotiates</td>
</tr>
<tr>
<td></td>
<td>507</td>
<td>:insufficient_storage</td>
</tr>
<tr>
<td></td>
<td>508</td>
<td>:loop_detected</td>
</tr>
<tr>
<td></td>
<td>510</td>
<td>:not_extended</td>
</tr>
<tr>
<td></td>
<td>511</td>
<td>:network_authentication_required</td>
</tr>
</tbody>
</table>

### Rendering Based on Type of Request
Rails can respond to requests for different formats using the `respond_to` method.  For example, I can respond to JSON and HTML requests in the same controller:

```Ruby
def index
  @posts = Post.all

  respond_to do |format|
    format.html # will render the default view for this action
    format.json { render json: @posts } # will render JSON or index.json.builder if the Jbuilder gem is installed
  end
end
```

Note that the format is determined by whether we include `.json` at the end of our URL or not.

### Jbuilder

By default, when using `render json`, Rails will render all your object attributes.  If you want greater control over your JSON creation, then you can use the `Jbuilder` gem which is maintained by the Rails team.

In order to use `Jbuilder`, you would first have to install the gem by adding it to your `Gemfile`:

```Ruby
gem 'jbuilder'
```

Then you would have a to create the `json.jbuilder` file that is named the same as your action, in the views folder that corresponds to your controller.  So in case of post show:

In `app/views/posts/show.json.jbuilder`:

```Ruby
json.title @post.title
json.body @post.body
```

Now, we don't even have to have the `respond_to` method and its corresponding block, Rails will automatically decide to use Jbuilder or ERB based on our format.  Now only post `title` and `body` are shown.

## Blogging Application: Expose JSON API
Let's change our blogging application to respond with JSON when we request a list of posts or want to see post details.

Note that the `Jbuilder` gem is already included in our `Gemfile`.

In `app\controllers\posts_controller.rb`
```Ruby
def index
  @blog = Blog.find(params[:blog_id])
  @posts = @blog.posts

  respond_to do |format|
    format.html # render index.html.erb
    format.json { render json: @posts } # render index.json.builder
  end
end
```

Now if we go to http://localhost:3000/blogs/1/posts.json, we should see a JSON array that contains our posts.

But what if we don't want to include certain attributes in the JSON, let's say `created_at` and `updated_at`.  This is where `Jbuilder` comes into play:

In `app\views\posts\index.json.jbuilder`:
```Ruby
json.array! @posts do |post|
  json.title post.title
  json.body post.body
end
```

Then we can remove the `respond_to` block from our `app\controllers\posts_controller.rb` and we are good to go.
