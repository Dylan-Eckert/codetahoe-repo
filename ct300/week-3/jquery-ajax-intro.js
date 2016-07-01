var postArray = []

$.ajax('http://jsonplaceholder.typicode.com/posts', {
        method: 'GET'
    })
    .done(function(posts) {
        getPosts(posts)
            //console.log(posts);
    })
    .fail(function(err) {
        console.log('error');
    })
    .always(function(complete) {
        //console.log(complete);;
    });

var getPosts = function(posts) {
    $.each(posts, function() {
        var post = new Post(this.body, this.id, this.title, this.userId);
        postArray.push(post)
    })
    console.log(postArray)
};

var Post = function(body, id, title, userId) {
    this.body = body;
    this.id = id;
    this.title = title;
    this.userId = userId
};

//var displayPosts = function(getPosts)

///var postLists = $('<li></li>');
