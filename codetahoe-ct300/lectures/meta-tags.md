# HTML META TAGS

-------

## Basic Meta Tags

-------

HTML Meta Tags are tags that are placed in the HEAD section of your HTML (not to be confused with the < header > tag).  These tags are invisible to users, but they tell browsers, crawlers and other services about the content of your page, among other things.

Meta tags describe your site to search engines and users, and have effects on "previews" and social sharing.  The overall impact of meta tags on SEO is debatable (remember: nobody outside of a few supernerds knows Google's algorithm), but they certainly have a positive impact.  However, when meta tags are implemented incorrectly, the negative impact can be substantial and heartbreaking.

Let's look at a few of the most important/relevant meta tags:

### The Title Tag

While everyone calls this a meta tag, in actuality it is not.  According to W3C, the title tag is actually a *required* element in an HTML document.  You will find that many people implement the title improperly as a meta, but the correct implementation is:

```html
<title>The History of SpaceX</title>
```
The title tag is probably the most important SEO identifier you can control.  It shows up in the tabs on your browser, and if almost always the linked title of your page's result in a Google search.  Leaving the title blank is a *huge* no-no.  It should be unique for each page.

### The Description Tag

This tag tells search engine what your page is about.  It ideally should be unique for each page, and should not exceed 155 total characters.

Description is generally considered important to SEO.  It is the *default* description that appears below the link in Google search results.

> Note: If you write your description in a way that's spammy or Google doesn't like, Google will replace your description with something it deems relevant from your content.

The correct implementation of this tag is:

```html
<meta name="description" content="The history of SpaceX ranging from 2002 - 2016, including launches, rockets.">
```
### The Keywords Tag

In the late 90's, this was the king of meta tags.  Sadly, all good things must come to an end.  Since this tag is *never* seen by users, it was the first target for SEO spammers.  Now this tag is largely ignored.

If you are just totally jonezing to have some keywords, the limit is *possibly* 255 characters, and the implementation is as follows:

```html
<meta name="keywords" content="SpaceX, Space, Elon, Musk, Rockets, Work from Home, Buy Toasters Online, Donate to my Spring Break">
```
----------

## Other Meta Tags

----------

### The Viewport Tag

Tells the browser to zoom to the width of the device.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### The Content Type Tag

Describes the content/character set your site uses.

```html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
```

### The Author Tag

Describes the author of the document.

```html
<meta name="author" content="Aaron Martin">
```

### The Robots Tag

Tells (well meaning) spiders how to crawl/index your site.

```html
<meta name="robots" content="index, follow">
```

### The Revisit Tag

Let's (well meaning) spiders know when to return next.

```html
<meta name="revisit-after" content="100 days">
```
> Don't you wish you could use this with some of your friends?

### The Refresh Tag

Tells the page to refresh/or redirect after x number of seconds

```html
<meta http-equiv="refresh" content="10; url=http://www.elevate.blue">
```
--------

## Open Graph Tags

--------

The Open Graph protocol enables any web page to become a rich object in a social graph. For instance, this is used on Facebook to allow any web page to have the same functionality as any other object on Facebook.

<img src="http://static1.squarespace.com/static/51ac125ae4b0058e26d097db/t/532018a3e4b094aec2554a38/1394612388772/socialgraph1.png?format=750w" alt="The Social Graph"/>
> The Social Graph

These tags are very important, as they impact how your pages appears as it is shared across the graph.  For example, when shared a properly optimized graph object may appear as follows (depending on the "type"):

<img src="https://s3-us-west-1.amazonaws.com/codetahoe-public/lessons/social-graph.png" alt="Open Graph object"/>

The most relevant tags are:

### The Title Tag

```html
<meta property='og:title' content="The Martian (2015)" />
```

### The Description Tag

```html
<meta property="og:description" content="Directed by Ridley Scott.  With Matt Damon, Jessica Chastain, Kristen Wiig, Kate Mara. An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive." />
```

### The Type Tag

```html
<meta property='og:type' content="video.movie" />
```

### The URL Tag

```html
<meta property="og:url" content="http://www.imdb.com/title/tt3659388/" />
```

### The Image Tag

```html
<meta property='og:image' content="http://ia.media-imdb.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_UY1200_CR90,0,630,1200_AL_.jpg" />
```

### The App ID Tag

```html
<meta property='fb:app_id' content='YOUR_APP_ID' />
```

#### PRO TIP:

> If your open graph data is not updating for Facebook shares, visit the
> Facebook sharing debugger at the link below.  Simply typing in the link
> to your page will cause Facebook to clear it's cache and update the share.

https://developers.facebook.com/tools/debug/
