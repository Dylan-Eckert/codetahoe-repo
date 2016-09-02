# HTML REFRESHER & INTRO TO SEMANTIC HTML

## HTML Document Structure

## Basic Structure
#### html

The html element represents the root of HTML and XHTML documents. Any subsequent elements are the children of this root element.

Authors are encouraged to specify a lang attribute on the root html element, giving the document's language.

#### head

The head element represents a collection of metadata for the Document.

#### body

The body element represents the content of the document.

In conforming documents, there is only one body element

## Basic Tags

#### h1...h6
These elements represent headings for their sections.

The semantics and meaning of these elements are defined in the section on headings and sections.

These elements have a rank given by the number in their name. The h1 element is said to have the highest rank, the h6 element has the lowest rank, and two elements with the same name have equal rank.

#### p

Used to denote paragraphs.  

#### a (href)

Creates a hyperlink to a document.

#### a (anchor)

Creates a hyperlink within a document.

#### img

Represents an image to display in the document.

#### ul/ol/li

Unordered or Ordered Lists, and their corresponding list items.

#### br

Creates a line break within the document.

#### hr

Creates a horizontal rule within the document.

#### span

The span element doesn't mean anything on its own, but can be useful when used together with the global attributes, e.g. class, lang, or dir. It represents its children

#### div..?

The div element has no special meaning at all.

## Document Outlines

Much like Word, you should layout your page as an outline before you start coding.

For example:

1. Forest elephants
  - 1.1 Habitat
  - 1.2 Diet
2. Mongolian gerbils

Could translate to:

```html
<h1>Forest elephants</h1>
  <p>In this section, we discuss the lesser known forest elephants.
    ...this section continues...
  <h2>Habitat</h2>
  <p>Forest elephants do not live in trees but among them.
    ...this subsection continues...
  <h2>Diet</h2>
<h1>Mongolian gerbils</h1>
```


## Semantic Tags

<img src="https://s3-us-west-1.amazonaws.com/codetahoe-public/lessons/html5-structure.png" width="50%">

### Disclaimer:  Older IE Versions will not recognize

Solution:

```html
<!--[if lt IE 9]>
<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script>
<![endif]-->
```

#### header

The header element represents introductory content for its nearest ancestor sectioning content or sectioning root element. A header typically contains a group of introductory or navigational aids.

#### nav

The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links.

#### footer

The footer element represents a footer for its nearest ancestor sectioning content or sectioning root element. A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and the like.

When the footer element contains entire sections, they represent appendices, indexes, long colophons, verbose license agreements, and other such content.

#### section

The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content. The theme of each section should be identified, typically by including a heading (h1-h6 element) as a child of the section element.

#### article

The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.

When article elements are nested, the inner article elements represent articles that are in principle related to the contents of the outer article. For instance, a blog entry on a site that accepts user-submitted comments could represent the comments as article elements nested within the article element for the blog entry.

#### aside

The aside element represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content. Such sections are often represented as sidebars in printed typography.

The element can be used for typographical effects like pull quotes or sidebars, for advertising, for groups of nav elements, and for other content that is considered separate from the main content of the page.

## &lt;figure&gt; and &lt;figcaption&gt;

The HTML `<figure>` element is a self-contained element (just like `<article>`), frequently with a caption `<figcaption>` element.  The element is usually related to the main flow but since it is self-contained, it can be moved to any page without affecting the main flow.  

The main purpose of these two tags is to define an image, illustration or a diagram with a caption.

In the future, we can reuse self-contained elements by defining their markup once and then including them in multiple places via **partials** in Ruby on Rails and **components** in React or Angular.

### Example

Code:

```
<figure>
  <img src="https://s3-us-west-1.amazonaws.com/codetahoe-public/lessons/html5-structure.png" alt="HTML5 Infrastructure">
  <figcaption>Fig1. HTML5 Infrastructure</figcaption>
</figure>
```
What the browser will show:
<figure>
  <img src="https://s3-us-west-1.amazonaws.com/codetahoe-public/lessons/html5-structure.png" alt="HTML5 Infrastructure">
  <figcaption>Figure 1. HTML5 Infrastructure</figcaption>
</figure>

## &lt;address&gt;
The `<address>` element supplies contact information for its nearest `<article>` or `<body>` ancestor.

### Example
Code:

```
<article>
  This cool article I wrote.
  <address>
    John ArticleDude<br>
    123 Some Rd.<br>
    Incline Village, NV 89451
  </address>
</article>
```
What the browser will show:

<article>
  This cool article I wrote.
  <address>
    John ArticleDude<br>
    123 Some Rd.<br>
    Incline Village, NV 89451
  </address>
</article>

## &lt;em&gt;
Simply put, this element is used to emphasize the content it wraps.  It can also be nested and each level of nesting indicates a greater degree of emphasis.

### Example
Code:

```
<em>important text and <em>more important text</em></em>
```
What the browser will show:

<em>important text and <em>more important text</em></em>

Visually these look exactly the same, however semantically the "more important text" has a higher emphasis, which is important for SEO.

## &lt;small&gt;

The `<small>` element makes the text font size one size smaller.  The main purpose of this element is to represent side-comments,  small print or caveats, including copyright and legal text.  Also, semantically, it has the opposite effect of the `<em>` element.

### Example
Code:

```
I'm very creative and came up with this. <small>© 2016 Creative Commons</small>
```
What the browser will show:

I'm very creative and came up with this. <small>(© 2016 Creative Commons)</small>

## &lt;video&gt;
The `<video>` element is used to embed video in a document.  

In its simplest form, it contains a `src` attribute or a nested `<source>` element:

Code:
```
<video src="http://techslides.com/demos/sample-videos/small.mp4">
</video>
```

Or

```
<video>
  <source src="http://techslides.com/demos/sample-videos/small.mp4"/>
</video>
```
Browser:
<video autoplay loop>
  <source src="http://techslides.com/demos/sample-videos/small.mp4"/>
</video>

You can also add a `controls` attribute to allow the user to control video playback, including volume, seeking, and pause/resume.

Code:
```
<video controls src="http://techslides.com/demos/sample-videos/small.mp4">
</video>
```

Browser:
<video controls src="http://techslides.com/demos/sample-videos/small.mp4">
</video>

### Attributes
In addition to `controls` and `src` and the standard global attributes, this element supports the following attributes:

`autoplay` Automatically start video playback<br>
`loop` Play video on a loop<br>
`poster` An image to display before the video is played.<br>
`muted` Start video with the audio muted.

## &lt;audio&gt;
The `<audio>` element is very similar to the `<video>` element.  It has an additional attribute `volume`, which has value range of 0.0(silent) to 1.0 (loudest).

## &lt;table&gt;
The `<table>` element is used to display tabular data: information expressed via two or more dimensions.

Tables are divided into rows marked by the `<tr>` element.  `<tr>` elements can be grouped into header, body and footer via `<thead>`, `<tbody>` and `<tfoot>` elements.

Table rows (`<tr>`) are divided into columns by `<td>` or in case of header columns `<th>` elements.

### Example
Code:
```
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Score</th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <td>Average</td>
      <td>75</td>
    </tr>
  </tfoot>
  <tbody>
    <tr>
      <td>John</td>
      <td>70</td>
    </tr>
    <tr>
      <td>Jane</td>
      <td>80</td>
    </tr>
  </tbody>
</table>
```
Browser:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Score</th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <td>Average</td>
      <td>75</td>
    </tr>
  </tfoot>
  <tbody>
    <tr>
      <td>John</td>
      <td>70</td>
    </tr>
    <tr>
      <td>Jane</td>
      <td>80</td>
    </tr>
  </tbody>
</table>

## &lt;form&gt;
The `<form>` element represents a document section that contains interactive controls to submit information to a web server or an API.

### Attributes
`action` The URI of a program that processes the form information.<br>
`method` The HTTP method that the browser will use to submit the form.  Possible values are:
- `post`: HTTP post method; form data are included in the body of the HTTP request.
- `get`: HTTP get method; form data are appended to the action attribute URI with a '?' as separator.  

### Example
See [CodePen](http://codepen.io/rushtehrani/full/oLLdbm/) for form examples.
See [RequestBin](http://requestb.in/1ikr3l31?inspect) to inspect the form request.

## &lt;input&gt;
The `<input>` element is used to create interactive controls for web-based forms in order to accept data from the user. How an `<input>` works varies depending on the value of its type attribute.

### Attributes
`type` The type of the control to display. We will look at these in the example section.<br>
`name` The name of the control which is submitted with the form data.<br>
`required` This attribute specifies that the user must fill in a value before submitting a form.

### Example
See  [Native form elements](http://nativeformelements.com/)

# HTML Comments
Comments are not rendered in the browser, you can use them to explain a section of your code or write yourself a reminder.

```
<!-- I am a comment -->
<!-- <p>I am also a comment, even with the HTML tags.</p> -->
<!-- TODO: Change the code below to use <article> instead of <div> -->
<div>
  My article
</div>
```

# Attributes
Attributes are additional values that configure HTML elements or adjust their behavior in various ways.

## Global Attributes
These are attributes that are available for all HTML5 elements.

For now, we'll focus on the `id`, `class` and `style` attributes and will learn about other global attributes as the course progresses.

### id
The `id` global attribute is an identifier for your element that should be unique to your document.  In fact, it is highly recommended that you keep this attribute unique across your website or web application.  This attribute cannot contain any whitespace and should only contain ASCII letters and digits, `_` and `-` and `.` to ensure full compatibility with all browsers.

Example:
```
<span id="fuzzy-kitty">Fuzzy Kitty Framework</span>
```

### class
The `class` attribute is a space separated list of classes.  Classes allows CSS and Javascript to select and access specific elements via the class selectors or functions like the DOM method `document.getElementsByClassName`.

Example:
```
<span id="fuzzy-kitty" class="framework js-framework shiny-new-framework">Fuzzy Kitty Framework</span>
```

### style
The `style` attribute contains CSS styling declarations.  It's recommended that you use a separate file or files for your styling.  This attribute should really only be used for testing purposes.

## WALK-THROUGH:  Layout "The Martian" IMDb page semantically

http://www.imdb.com/title/tt3659388/

## LAB:  Create an HTML Layout Using an Outline

#### Create a basic outline using the SpaceX Wikipedia page

https://en.wikipedia.org/wiki/SpaceX#History_2

#### Add a descriptive page header and footer

#### Add a navigation section to link to elements on the page

#### Add a "Comments" area for user Comments

#### Add an Ad Banner to the top and bottom of the page

#### Add some images to accompany the content

#### Add a section with a list of links to allow users to learn more
