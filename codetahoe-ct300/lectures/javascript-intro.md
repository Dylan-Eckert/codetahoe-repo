# Introduction to JavaScript

## What is JavaScript?
JavaScript is a programming language that started as a browser based language and then was made available for backend development through the Node.js runtime.

We will first learn about JavaScript as a language, then look at using it for browser based development.  We will then look at using JavaScript for backend development through the Node.js runtime.

The easiest way to play with JavaScript is to use the JavaScript console in Chrome (or any other modern browser).  You can launch the console by going to Chrome DevTools and selecting the "console" tab.  

## JavaScript Syntax and Basics
Just like other programming languages, a JavaScript program contains a set of instructions to be executed by the computer.  These instructions are called **statements**.  JavaScript statements are separated by semicolons.

Example
```JavaScript
var a = 1;      // Set variable a to 1
var b = 2;      // Set variable b to 2

var c = a + b;  // Add a and b, store the result in the c variable.
```

JavaScript is case-sensitive and used the Unicode character set.

### JavaScript Statements
JavaScript statements consist of: comments, literals, variables, operators, expressions, keywords and identifiers.

#### Comments
We use `//` for single line comments and `/*` and `*/` to open and close multi-line comments respectively.

Example
```JavaScript
// Single line comments

/*
  Multi-line comment line 1
  Multi-line comment line 2
*/
```

#### Literals
Literals are fixed values in your application. For now, remember the following rules for literals:

**Numbers** are written with or without decimals.

```JavaScript
1.0
202
```

**Strings** are written in single or double quotes.  

```JavaScript
"I am a string"
'I am also a string'
```

#### Variables
Variables are used to store values in your application.  These can can be accessed and changed in different statements throughout your application.  

You **declare** variables using the `var` keyword.  In the latest JavaScript spec, you can also use the `let` keyword to declare variables.  We will discuss `let` when we discuss JavaScript scopes.  

You can declare variables with or without assigning values. A variable that is declared using the `var` statement but no value assigned has the value `undefined`;

Example
```JavaScript
var a;        // No value assigned
var b = 1;    // Value of 1 assigned
```

#### Operators
JavaScript uses `=` to assign values to variables.  This is called the **assignment** operator.

JavaScript also uses **arithmetic** `+`, `-`, `*`, `/` operators to **evaluate** (compute) values.

#### Expressions
An expression consists of values, variables and operators:

```JavaScript
var a = 1 + 2;  // evaluates to 3 then stores it in the variable a
var b = a * 8;
var c = 'John is ' + b + ' years old.';  // evaluates to 'John is 24 years old.'
```

#### Keywords
Keywords are used to indicate actions to be performed.

As mentioned earlier `var` is a keyword that tells the browser to create a new variable.

#### Identifiers
Identifiers are names used to identify variables and functions in JavaScript and other programing languages.

In JavaScript, identifiers are case-sensitive and use the "lower camel case" naming convention.

```JavaScript
var thisIsLowerCamelCase;
```

## Built-in Methods
These are built-in blocks of code that execute a task.  We will talk about these and functions in more detail later.

`alert` is a method that allows the developer to put a popup on screen to notify the user of something.

```JavaScript
alert('Hello John');
```

`prompt` is similar to alert in that it notifies the user of something but it also requests information and returns it to the developer. The returned information can be saved as a variable.

```JavaScript
var name = prompt('What is your name?');
alert(name);
```

`console.log` is a method used by developers to help with the creation and debugging of JavaScript. Its parameters are literally written out to the browser's console. You would never use this to give the user information.

```JavaScript
console.log('my name is John');
```

## Data Types
There are seven data types in JavaScript:

- Primitive data types:
  - Boolean: `true` or `false`
  - `undefined`: special keyword denoting that a value has not been defined.
  - `null`: special keyword denoting a null value.
  - Number: any number with or without decimals.
  - String: any value enclosed in single (`'`) or double quotes (`"`).
- Object data type (note that an Array is a special object type in JavaScript)


JavaScript literals would be of one of the types described above.

In JavaScript types are dynamic, meaning that the same variable can be used as different types. Languages like JavaScript are known as `dynamically typed` languages.

```JavaScript
var a = 1;  // variable a is a number.
var a = 'hello';  // now a is a string.
```

### Boolean
A boolean type has two literal values: `true` and `false`

```JavaScript
var a = true;
var b = false;
```

### undefined
When a variable is declared by no value is assigned to it, JavaScript will default its value to undefined which means nothing.

```JavaScript
var a;
console.log(a); // prints undefined in console.
```

### null
Just like `undefined`, `null` means nothing as well.  However, `null` is explicitly assigned, meaning the developer has to set it.

```JavaScript
var a = null;
console.log(a); // prints null in console.
```

### Number
A literal of type number can be an integer or a floating-point.

Integers can be expressed in decimal (base 10), hexadecimal (base 16), octal (base 8) and binary (base 2) and can be signed (have a leading `+` or `-`).

```JavaScript
0, 117 and -345 (decimal, base 10)
015, 0001 and -0o77 (octal, base 8)
0x1123, 0x00111 and -0xF1A7 (hexadecimal, "hex" or base 16)
0b11, 0b0011 and -0b11 (binary, base 2)
```

Floating-point literals consist of integers with a decimal point or an exponent (`e` or `E`):

```JavaScript
3.1415926
-.123456789
-3.1E+12
.1e-23
```

### String
A literal of type string must be enclosed in double (`"`) or single (`'`) quotes.

Single or double quotes can be escaped in string by using the `\` character.

```JavaScript
"hello"
'world'
'I\'m escaping single quotes.'
```

You can access a character in a string by index number like so:

```JavaScript
var name = 'John';
var firstNameInitial =  name[0];  // 'J'
```

Indexes in all programming languages start at 0, not 1.  Meaning the first element starts at index 0.

You can also get the length of an string by using the `length` property of the string:

```JavaScript
console.log(name.length);
```

### Object
An object refers to a data structure containing data and instructions for working with the data.  Objects most often refer to real world things, for example in a car racing game, `car` and `track` are objects.

Objects are variables that can contain many values:

```JavaScript
var car = {
  make: 'Ferrari',
  model: 'Enzo',
  color: 'Red'
};
```

Objects in JavaScript can contain **properties** and **methods**.  

Properties are **name:value** pairs.  Values can be of any data types available in JavaScript, including another object.

```JavaScript
var forest = {
  trees: [
    {
      type: 'Fir',
      info: {
        height: 20,
        age: 100
      }
    },
    {
      type: 'Spruce',
      info: {
        height: 10,
        age: 120
      }
    }
  ]
}
```

Methods are functions stored in an object property.  We will discuss these in the functions section.

You can access a property of an object like so:

```JavaScript
console.log(car.make);  // prints 'Ferrari'
```

#### Array
Arrays are a special built-in object used to store a list of values in a single variable.

Easiest way to define arrays is via array literals:

Syntax
```JavaScript
var <array-identifier> = [<item-1>, <item-2>, ...];
```

Example
```JavaScript
var cars = ['Ferrari', 'Lamborghini', 'Pagani'];
```

You can access any element in an by index number like so:

```JavaScript
var name = cars[0];  // grabs the first element of the cars array
```

You can also get the length of an array by using the `length` property of the array:

```JavaScript
console.log(cars.length);
```

You can also define an array via the `new` operator:

```JavaScript
var cars = new Array();
```

##### Some Array Methods

- `push`: inserts an element to the end of an array.
- `pop`: removes and returns the last element of an array.
- `unshift`: adds one or more elements to the beginning of an array.
- `shift`: removes and returns the first element of an array.

#### Other Built-In Objects
In JavaScript, some basic types like string get automatically converted to a corresponding built-in object, that's how string gets the `length` property and its characters are accessible via indexes.

#### JavaScript Object Notation (JSON)
JavaScript Object Notation (JSON) structure is based on JavaScript object literals. It is used for transporting data to and from the server, as well as storing data in a database.

JSON data is written as name/value pairs just like JavaScript object literals.  The only difference is that properties need to be enclosed in double quotes (`"`):

Example car JSON:
```
{
  "make": "Ferrari",
  "model": "Enzo",
  "color": "Red"
}
```

Note that you cannot have methods in JSON objects since they are "serialized" (basically turn into strings) when they are being transported.

### Checking Types
JavaScript has a the `typeof` keyword that allows you to get the type of any value:

```JavaScript
typeof 2 // "number"
typeof "John" // "string"
typeof true // "boolean"
typeof undefined // "undefined"
```

## Exercise: Built-In Functions and Data Types
- Write an array of 5 car objects.  The car object should have a make, model and color.
  - Print the model of 3rd car object in console.
  - Print the first character of the 5th car object model.
  - Ask the user for a car color, and replace the 4th car object's color with what the user inputted.
  - Write the length of the array of cars to JavaScript console.
  - Write the length of the 1st car object's make.
  - Get the type of the second car object's model.
  - Pop up a notification of 3rd car object's color.
  - Set the first car object's model to nothing.

## Functions
In JavaScript, functions are a block of code defined to perform a particular task.

A function is defined by the `function` keyword, followed by an identifier (name), followed by `()` and finally followed by the code to be executed enclosed in a code block or curly braces `{}`.

The parentheses may include parameter names separated by commas: `parameter1, parameter2, parameter3,...`.  Parameters are used to pass values from other parts of the application into functions.

Syntax
```JavaScript
function <identifier>(<parameter1>,<parameter2>,...) {
  // code to be executed
}
```

The above syntax is a **function declaration**.

A function can be invoked (called) by typing its name and passing any parameters.  The value you pass into a function parameter is called an **argument**.

Example
```JavaScript
// Define the function
function writeHelloToConsole(name) {
  console.log('Hello ' + name);
}

// Invoke (call) the function
writeHelloToConsole('John');  // Pass 'John' as an argument. Writes 'Hello John' in JavaScript console.
```

### Function Return
When JavaScript reaches a return statement, the function will stop executing, and return the **return value** back to the caller:

```JavaScript
function getFirstName() {
  var first = 'John';
  var last = 'Smith';

  return first;
}

var firstName = getFirstName(); //Invoke function and store its return value in firstName
```

### Function Expression
When a function is assigned to a variable, we have a function expression.

Example
```JavaScript
var getFirstName = function() {
  var first = 'John';
  var last = 'Smith';

  return first;
}

var firstName = getFirstName(); //Invoke function and store its return value in firstName
```

The main difference between function expressions and function declarations is that function declarations can be called both after and before the definition.

Works
```JavaScript
getFirstName();
function getFirstName() { ... }
```

Does not work
```JavaScript
getFirstName(); // returns an error
var getFirstName = function() { ... }
```

### Methods
A JavaScript method is an object property that is assigned a **function definition**.  Methods are actions that can be performed on an object and its properties.

Example
```JavaScript
var forest = {
  trees: [
    {
      type: 'Fir',
      info: {
        height: 20,
        age: 100
      }
    },
    {
      type: 'Spruce',
      info: {
        height: 10,
        age: 120
      }
    }
  ],
  getFirstTreeType: function() {
    return this.trees[0].type;
  }
}
```

The `this` keyword generally refers to the parent of the method in objects.  However it is more complex than this and we will discuss it some more when we talk about scopes.

## Exercise: Methods and Functions
- Take the same array of car objects and place it into a garage object.
- Using only methods:
  - Create a method that prints the model of 3rd car object in console.
  - Create a method that returns the first character of the 5th car object model.

## JavaScript Scope
Scope is context in which values and expressions are "visible," or can be referenced.  This basically a set of variables, functions and objects you have access to.

In JavaScript, functions create a **closure** that will prevent variables declared within that function to be accessible outside of it.  However a function will have access to its parent variables.

```JavaScript
var outside = 1;

myFunction();

// Code here has access to outside variable
// Code here DOES NOT have access to inside variable

function myFunction() {
  var inside = 2;
  // Code here has access to both inside and outside variables
}
```

### Automatically Global
A variable that has not been declared but is assigned, becomes global automatically, no matter where it's assigned:

```JavaScript
myFunction();

function myFunction() {
  inside = 2;  // inside is now a global variable
}
```

In JavaScript, the global scope is the JavaScript environment.  In JavaScript that is included an HTML file, the global scope is the `window` object.

### Function Arguments
Function arguments are local variables inside of the function.

### Lifetime of JavaScript Variables
The lifetime of JavaScript variables starts when they are declared.  

Local variables are destroyed when the function returns.

Global variables are destroyed when the an HTML page is closed or JavaScript environment/console exits.

## More Operators
Let's look at some additional JavaScript operators.

### Comparison Operators
A comparison operator compares its operands and returns a logical value based on whether the comparison is true.

<table>
 <thead>
  <tr>
   <th>Operator</th>
   <th>Description</th>
   <th>Examples returning true</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td>Equal (<code>==</code>)</td>
   <td>Returns true if the operands are equal.</td>
   <td><code>3 == var1</code>
    <p><code>"3" == var1</code></p>
    <code>3 == '3'</code></td>
  </tr>
  <tr>
   <td>Not equal (<code>!=</code>)</td>
   <td>Returns true if the operands are not equal.</td>
   <td><code>var1 != 4<br>
    var2 != "3"</code></td>
  </tr>
  <tr>
   <td>Strict equal (<code>===</code>)</td>
   <td>Returns true if the operands are equal and of the same type.</td>
   <td><code>3 === var1</code></td>
  </tr>
  <tr>
   <td>Strict not equal (<code>!==</code>)</td>
   <td>Returns true if the operands are of the same type but not equal, or are of different type.</td>
   <td><code>var1 !== "3"<br>
    3 !== '3'</code></td>
  </tr>
  <tr>
   <td>Greater than (<code>&gt;</code>)</td>
   <td>Returns true if the left operand is greater than the right operand.</td>
   <td><code>var2 &gt; var1<br>
    "12" &gt; 2</code></td>
  </tr>
  <tr>
   <td>Greater than or equal (<code>&gt;=</code>)</td>
   <td>Returns true if the left operand is greater than or equal to the right operand.</td>
   <td><code>var2 &gt;= var1<br>
    var1 &gt;= 3</code></td>
  </tr>
  <tr>
   <td>Less than (<code>&lt;</code>)</td>
   <td>Returns true if the left operand is less than the right operand.</td>
   <td><code>var1 &lt; var2<br>
    "2" &lt; 12</code></td>
  </tr>
  <tr>
   <td>Less than or equal (<code>&lt;=</code>)</td>
   <td>Returns true if the left operand is less than or equal to the right operand.</td>
   <td><code>var1 &lt;= var2<br>
    var2 &lt;= 5</code></td>
  </tr>
 </tbody>
</table>

### Logical Operators
Logical operators are typically used with Boolean (logical) values and return a Boolean value.

<table class="fullwidth-table">
 <thead>
  <tr>
   <th>Operator</th>
   <th>Usage</th>
   <th>Description</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td>Logical AND (<code>&amp;&amp;</code>)</td>
   <td><code>expr1 &amp;&amp; expr2</code></td>
   <td>Returns <code>expr1</code> if it can be converted to <code>false</code>; otherwise, returns <code>expr2</code>. Thus, when used with Boolean values, <code>&amp;&amp;</code> returns <code>true</code> if both operands are true; otherwise, returns <code>false</code>.</td>
  </tr>
  <tr>
   <td>Logical OR (<code>||</code>)</td>
   <td><code>expr1 || expr2</code></td>
   <td>Returns <code>expr1</code> if it can be converted to <code>true</code>; otherwise, returns <code>expr2</code>. Thus, when used with Boolean values, <code>||</code> returns <code>true</code> if either operand is true; if both are false, returns <code>false</code>.</td>
  </tr>
  <tr>
   <td>Logical NOT (<code>!</code>)</td>
   <td><code>!expr</code></td>
   <td>Returns <code>false</code> if its single operand can be converted to <code>true</code>; otherwise, returns <code>true</code>.</td>
  </tr>
 </tbody>
</table>

## Conditional Statements
A conditional statement is a set of commands that execute if a specified condition is true. JavaScript supports two conditional statements: `if...else` and `switch`.

### `if...else` Statement
The `if` statement is executed when a logical condition is `true`, and `else` is executed if the logical condition is `false`.

```JavaScript
if (condition) {
  // Execute code when condition is true
} else {
  // Execute code when condition is false
}
```

You can also compound the statements using `else if` to have multiple conditions tested in sequence:

```JavaScript
if (condition) {
  // Execute code when first condition is true
} else if (another-condition) {
  // Execute if second condition is true
} else {
  // Execute code when neither of conditions above are true
}
```

### `switch` Statement
A switch statement evaluates an expression and attempts to match the expression's value to a case label. If a match is found, the program executes the corresponding statement.

```JavaScript
switch (expression) {
  case label_1:
    statements_1
    [break;]
  case label_2:
    statements_2
    [break;]
    ...
  default:
    statements_def
    [break;]
}
```

Note that if the `break` keyword isn't used, the program will continue to the remaining case statements and execute matching ones up to and including the default case.

## Loops and Iteration
Loops let programs execute statements repeatedly.  They are useful if you are trying to execute statements with different values or walk through an array of objects to look for a particular value.

### `for` Statement
A `for` loop repeats until a condition evaluates to false.

Syntax
```JavaScript
for ([initialExpression]; [condition]; [incrementExpression]) {
  statement
}
```

- The `initialExpression` usually initializes one or more loop counters but can be used for any complex expression.  This expression can also declare variables.
- The `condition` is evaluated at each iteration, if the continue evaluates to `false`, the loop terminates.
- The `statement` is executed at each iteration, there can be one or more statements in a `for` loop code block.
- The `incrementExpression` is the update expression, it usually increments the loop counter.

Example
```JavaScript
var cars = ['Ferrari', 'Pagani', 'Lamborghini'];

for (var i = 0; i < cars.length; i++) {
  console.log(cars[i]);
}
```

### `do...while` Statement
The `do...while` statement repeats until a condition evaluates to `false`.

Syntax
```JavaScript
do {
  statement
} while (condition);
```

The statement executes once before the condition is checked and will repeat until the condition evaluates to `false`.

Example
```JavaScript
var i = 0;

do {
  i++;
  console.log('We have iterated ' + i + ' times');
} while (i < 5);
```

### `while` Statement
The `while` statement repeats until a condition evaluates to `false`.

Syntax
```JavaScript
while (condition) {
  statement
}
```

Unlike `do...while`, the condition is checked before the statement is executed and will repeat until the condition evaluates to `false`.

Example
```JavaScript
var i = 0;

while (i < 5) {
  i++;
  console.log('We have iterated ' + i + ' times');
}
```

## Exercise: Conditional Statements and Loop
- Using the same `garage` object from the previous exercises:
  - Create a method that prompts the user for a car make, then car model, then car color and then adds the car object to the `cars` array.
  - Create a method that prompts the user for a car model and then searches the `cars` array, returning the corresponding car object.

## Prototypes
You can think of a prototype as an object that serves as a template or blueprint for your objects.  All JavaScript objects inherit from their properties and methods from the `Object.prototype`.

This will allow us to reuse properties and methods for objects of the same type.

## Function Constructors
There are multiple ways to define classes in JavaScript.

Let's first look at the ES5 and prior versions as they are currently supported by all browsers which is via `function` constructors:

```JavaScript
var Tree = function() {};
```

This creates a new object called `Tree` with an empty constructor. `Tree` is function object that is both a constructor function and an object to use as the prototype of new objects.

Note that by convention, you will always capitalize the first letter of function constructors, this makes it easier to distinguish them from regular function declarations and expressions.  

### New Object Instance
To create a new instance of an object, we use the `new` keyword, assigning the result which is an object to a variable so we can access it later.

```JavaScript
var tree1 = new Tree();
var tree2 = new Tree();
```

The above creates two new objects `tree1` and `tree2` that are instances of the `Tree` object.

### The Constructor
A constructor is called at the moment an object is instantiated (an object instance is created).

```JavaScript
var Tree = function() {
  console.log('An instance of Tree was just created.');
};
```

### Properties
Properties are variables contained in the object; every instance of the object has those properties. Properties are set in the constructor (function) so that they are created on each instance.

The keyword `this` which refers to the current object, lets you work with properties within the object.

In the example below, we can pass the `type` as an argument, and set the new object instance's `type` in the constructor.

```JavaScript
var Tree = function(type) {
  this.type = type;
};
```

Now let's instantiate more trees:

```JavaScript
var spruceTree = new Tree('spruce');
var firTree = new Tree('fir');
```

### Methods
We learned earlier that methods are basically properties that have a **function definition** assigned.  If we want to make these methods reusable for all instances, then we add the methods to the `prototype` property.

```JavaScript
var Tree = function(type) {
  // type is shared only for that particular instance of Tree
  this.type = type;
};

// getType is shared across all instances of Tree
Tree.prototype.getType = function() {
  return this.type;
}
```

You can also define methods on `this`, in the constructor, but this is not recommended because the method is then defined for each instance of the object instead of being shared across all instances.  This could end up causing major memory issues when you have a large number of instances of a particular object.

## Exercise: Prototypes
- Take the same `garage` and `car` objects you defined earlier and make them reusable.
  - Make sure to include the properties and methods you defined in your earlier objects.


## Error Handling
It is important to gracefully handle and log your errors.

### `throw` Statement
The `throw` statement throws a user-defined exception.  When an exception is thrown, function execution will stop and control will be passed to the first `catch` block.  If there are no `catch` blocks, the program will terminate.

Syntax
```JavaScript
throw expression
```

Example
```JavaScript
throw 'a string'
throw 42
throw true
```

You can also `throw` an object. Best practice is to always throw an `Error` object or a user-defined object that inherits from the `Error` object prototype.

### `Error` Object
Instances of `Error` objects are thrown when runtime errors occur. The Error object can also be used as a base object for user-defined exceptions.

Syntax
```JavaScript
new Error([message])
```

Example
```JavaScript
throw new Error('Something broke!');
```

### `try...catch...finally` Statement
The `try...catch` statement marks a block of statements to try, and specifies a response, should an exception be thrown.  

The `finally` clause contains statements that will executed after the `try...catch` block and are always executed even if an exception is thrown.

Syntax
```JavaScript
try {
   try_statements
}
[catch (exception_var) {
   catch_statements
}]
[finally () {
   finally_statements
}]
```

Example
```JavaScript
try {
  console.log('try');
  throw new Error('doh!');
}
catch (ex) {
  console.error('catch', ex.message);
  throw ex;
}
finally {
  console.log('finally');
  return;
}
```

If the finally block returns a value, this value becomes the return value of the entire `try...catch...finally` statement, regardless of any return statements in the try and catch blocks.

## Debugging JavaScript
Debugging is basically searching for errors (or bugs) in your code.  

There are two common ways to debug JavaScript and you will most likely use a combination of both during your development career.

### Using `console.log()`
One way to debug your code is to use `console.log` to write your variables to the JavaScript console.

```JavaScript
var a = 1;

function changeValue() {
  a = 2;
}

changeValue();

console.log(a);  // write a to console to check its value
```

You have to be careful and make sure to remove these once you're done debugging.

### Setting Breakpoints
Another way to debug code is to set breakpoints.  These are points in your code that the debugger will stop and allow you to inspect your code.  The best way to do this is to use your browser's developer tools or in our case Chrome's DevTools.

#### Chrome JavaScript Debugger
In Chrome DevTools, the **Sources** panel allows you to debug your JavaScript code.

![](images/javascript-debugging-overview.jpg)

Want to learn more?  Check out [Chrome's Debug with Breakpoints](https://developers.google.com/web/tools/chrome-devtools/debug/breakpoints)
