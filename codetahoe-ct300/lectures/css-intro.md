# Cascading Style Sheets (CSS)
Cascading Style Sheets (CSS) is a language used to describe the presentation of HTML or XML (including XML dialects like SVG or XHTML) documents.  Essentially, CSS describes how elements should be rendered on screen.

## Using CSS
There are three ways to add CSS to your site:
- External style sheets (Recommended)
- Internal style sheets
- Inline style

### External Style Sheets
External style sheets are files with a `.css` extension that you will your link your HTML document to by placing a `link` element in your document's `head` section.

```
<head>
  <link rel="stylesheet" type="text/css" href="my-external-style-sheet.css">
</head>
```

Content of `my-external-style-sheet.css`:
```
article {
  color: blue;
  margin: 5px;
}

section {
  border: 2px solid red;
}
```

### Internal Style Sheets
Internal styles are defined within the `<style>` element, inside the `<head>` section of an HTML document:

```
<head>
  <style>
    article {
      color: blue;
      margin: 5px;
    }

    section {
      border: 2px solid red;
    }
  </style>
</head>
```

### Inline Style
An inline style may be used to apply a unique style for a single element.  To use inline styles, add the `style` attribute to the relevant element.

```
<article style="color: blue; margin: 5px;">
</article>
```

### Cascading Order
What style will be used when you have multiple styles applied to an element via any of the methods above?

The styles will be applied in the following priority:

1. Inline style
2. Internal or External style
3. Browser default styles

So an inline style will have the highest priority, followed by an internal or external style and finally the browser default style.

## CSS Rule Syntax
A CSS rule consists of a selector and a declaration block.

![](images/css-rule.gif)

### Selectors
CSS selectors point to (or select) HTML elements based on certain criteria.

There are different kinds of selectors, for now, let's focus on basic selectors and a subset of combinators.

#### Basic Selectors

```
<span id="fuzzy-kitty" class="framework" lang="en-US">Fuzzy Kitty Framework</span>
```

Using the above element as reference, the basic selectors are:

- Type selector: select element by name `span`
- Class selector: select element by class name `.framework`, the `.` indicates that what follows is a class.
- ID selector: select element by id `#fuzzy-kitty`, the `#` indicates that what follows is an ID.
- Universal selector: select a single element of any type `*`, in coding the `*` is known as a wild card character.
- Attribute selector: select element by attribute `[lang="en-US"]` or `[class="framework"]`

You can use a `,` to group selectors:

```
span, .framework, [lang="en-US"] {...}
```

Translates to apply this CSS rule to
- Any element type of `span`
- Any element that has a class named `framework`
- Any element that has an attribute `lang` with value `en-US`

#### Combinators
Combinators allow us to select precisely the element we want our CSS rule to apply to.

```
<body>
  <h1>Selected JavaScript Articles</h1>
  <p>
    A curated list of daily JavaScript articles.
  </p>
  <article>
    <h1>Shiny New JavaScript Framework</h1>
    <p>
      Fuzzy Kitty is in! Run and download before it goes out of style.
      <a class="btn-get-it" href="get-it.html">Get it now!</a>
    </p>
  </article>
</body>
```

- Child selector: select direct children of a particular element  `article > h1` or `article > p > .btn-get-it`
- Descendent selector: select an element that is a descendent (direct or indirect) of another element `article a`

### Declaration Block
The declaration block contains one or more **declarations** separated by semicolons.

- A **declaration block** will always be surrounded by curly braces.
- Each **declaration** contains a **CSS property name** and a **value** separated by a colon.
- A **declaration** will always end with a semicolon.

Let's play around with selectors a little: [CodePen](http://codepen.io/rushtehrani/pen/rLLQVe)

## Units Of Measure
There are two types of length units: relative and absolute.

### Relative Units
- em: Relative to the font-size of the element (2em means 2 times the size of the current font)
- rem: Relative to font-size of the root element
- vw: Viewport width, relative to 1% of the width of the viewport
- vh: Viewport height, relative to 1% of the height of the viewport
- %:  Relative to its inherit value or it is set in a percentage based on the same property of the parent element

### Absolute Units
- px: pixels (1px = 1/96th of 1in)
- pt: points (1pt = 1/72 of 1in)

## Properties

### Color
Colors in CSS are specified by:
- name: "red", "blue", "green"
- an RGB value: rgb(255,0,0), rgb(0,255,0), rgb(0,0,255)
- an RGB value in HEX: #FF0000, #00FF00, #0000FF

HEX to DEC mapping:
<table border="1">
<tbody><tr align="center">
<td>HEX</td>
<td>0</td>
<td>1</td>
<td>2</td>
<td>3</td>
<td>4</td>
<td>5</td>
<td>6</td>
<td>7</td>
<td>8</td>
<td>9</td>
<td>A</td>
<td>B</td>
<td>C</td>
<td>D</td>
<td>E</td>
<td>F</td>
</tr>
<tr align="center">
<td>DEC</td>
<td>0</td>
<td>1</td>
<td>2</td>
<td>3</td>
<td>4</td>
<td>5</td>
<td>6</td>
<td>7</td>
<td>8</td>
<td>9</td>
<td>10</td>
<td>11</td>
<td>12</td>
<td>13</td>
<td>14</td>
<td>15</td>
</tr>
</tbody></table>


So FF = (15 x 16<sup>1</sup>) + (15 x 16<sup>0</sup>) = 255

### Background
CSS background properties are used to define background effects for HTML elements.  They are:
- background-color: possible values are colors from above
- background-image: url("&lt;url of your image&gt;")
- background-repeat: no-repeat, repeat-x or repeat-y
- background-attachment: if set to `fixed`, the background will not scroll with the rest of the page.
- background-position: left top, left center, left bottom, right top, right center, right bottom, center top, center center, center bottom

```
body {
  background-color: #000;
  background-image: url("images/img_tree.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: right top;
}
```

See [CodePen](http://codepen.io/rushtehrani/pen/Eyyeqz)


There is also a shorthand property that combines all of the above into one line in the same order:

```
body {
  background: #000 url("images/img_tree.png") no-repeat fixed right top;
}
```
See [CodePen](http://codepen.io/rushtehrani/pen/ZOOqEV)

### Border
The CSS border properties allow you to specify the style, width, and color of an element's border.  The properties are:

- border-width: use any of the units of measures above. Format: `top-border-width, right-border-width, bottom-border-width, left-border-width`
- border-style: dotted, dashed, solid and a few more.
- border-color: any color formats defined above.  Format: `top-border-color, right-border-color, bottom-border-color, left-border-color`

```
article {
  border-width: 1px 2px 1px 2px;
  border-style: solid;
  border-color: red blue green red;
}
```

Shorthand:

```
article {
  border: 5px solid #000;
}
```

Note that with shorthand you can only specify one `border-width` and one `border-color`

See [CodePen](http://codepen.io/rushtehrani/pen/pbbxxm)

### Margin
The margin properties generate space around elements or outside element borders.  They are:
- margin-top
- margin-right
- margin-bottom
- margin-left

You can use any unit of measure for these properties.

```
article {
 margin-top: 5px;
 margin-right: 2px;
 margin-bottom: 5px;
 margin-left: 2px;
}
```

Shorthand:
```
article {
  margin: 5px 2px 5px 2px;
}
```

See [CodePen](http://codepen.io/rushtehrani/pen/aZZRMZ)

### Padding
The padding properties generate space around content or inside element borders. They are:
- padding-top
- padding-right
- padding-bottom
- padding-left

You can use any unit of measure for these properties.

```
article {
 padding-top: 5px;
 padding-right: 2px;
 padding-bottom: 5px;
 padding-left: 2px;
}
```

Shorthand:
```
article {
  padding: 5px 2px 5px 2px;
}
```

See [CodePen](http://codepen.io/rushtehrani/pen/jrreJR)

Note about shorthands that apply to `border`, `margin` and `padding`, if the property has:
- four values, then: `top, right, bottom, left`
- three values, then: `top, right and bottom, left`
- two values, then: `top and bottom, right and left`
- one value, then that one value applies to all four

### Position
The position property specifies the type of positioning method used for an element.

There are four position values:
- static: all elements are positioned static by default.
- relative: the element is positioned relative to its normal position.
- fixed: element is positioned relative to the viewport.  Meaning it will always stay in the same position.
- absolute: element is positioned relative to its nearest position ancestor.

See [CodePen](http://codepen.io/rushtehrani/pen/yJJQON)

### Float
The float property specifies whether or not an element should float.  

In its simplest form it can be used to wrap text around an image:
```
img {
    float: right;
    margin: 0 0 10px 10px;
}
```

See [CodePen](http://codepen.io/rushtehrani/pen/QEKLQZ)

However, it is most commonly used to build entire web layouts:

```
div {
    border: 2px solid green;
}

nav {
    float: left;
    width: 200px;
    border: 2px solid blue;
}

section {
    margin-left: 206px;
    border: 2px solid red;
}
```

See [CodePen](http://codepen.io/rushtehrani/pen/zBKOLx)

### Clear
The clear property specifies on which sides of an element floating elements are **not** allowed to float.

The common values are:
- `none`: Default value, allows floating elements on both sides.
- `left`: No floating element on the left side.
- `right`: No floating element on the right side.
- `both`: No floating elements on either side.
- `initial`: Set the property back to its default value.
- `inherit`: Inherit the property from its parent element.

See: [CodePen](http://codepen.io/rushtehrani/pen/GqjRJG)

### Display
The display property specifies the type of rendering box used for an element.  The most common display values are `none`, `block`, `inline` and `inline-block`.  Most elements default to `block` or `inline`.

- `none`: Specialized elements like `<script>` are have a default display value of `none`.  You can also take any other element and set its display property to `none`, removing that element from being rendered in the browser.
- `block`: Elements like `<div>`, `<article>`, `<section>`, `<header>` and `<footer>` are by default `block` elements.  They start on a new line and stretch across the screen on both sides.
- `inline`
Elements like `<span>` and `<a>` are by default `inline` elements.  They can be placed inside of a paragraph and not disrupt the flow of that paragraph.
- `inline-block`: These elements are like `inline` elements but they can have a width and a height. It is common to use `inline-block` (and probably better) to use these instead of `float` to position elements.  This way you don't have to specify a `clear` property.  

See [CodePen](http://codepen.io/rushtehrani/pen/pbEzwQ)

## CSS Box Model
The CSS box model is essentially a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content.

![](images/box-model.png)

```
article {
  width: 400px;
  height: 100px;
  border: 6px solid blue;
  padding: 20px;
  margin: 20px;
}
```

See [CodePen](http://codepen.io/rushtehrani/pen/qNNQWm)

Total element width = width + left padding + right padding + left border + right border + left margin + right margin<br>
Total element height = height + top padding + bottom padding + top border + bottom border + top margin + bottom margin

This is important to remember when you're styling your elements, because a lot of times you want to make sure your elements are a certain width and height and you need to consider `border`, `padding` and `margin` in that width and height calculation.

## CSS Layout
You can use `position`, `float` or `inline-block` or a combination to add layout to your pages.

An example using only `position`: [CodePen](http://codepen.io/rushtehrani/pen/dXXxqb)

Note that in the example above (and the exercises below), we are not really considering responsive design, which in today's world is an essential part of web development.  We will cover responsive design as the course progresses.

### Exercises
Using the above CodePen:

1. Add a fixed footer to the bottom of the layout.
2. Rewrite it to use only the `float` property. No need for fixed position `<header>`.
3. Use only `inline-block`, no `float` or `position`. Again, no need for fixed position `<header>`.
