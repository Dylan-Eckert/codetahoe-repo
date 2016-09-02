# Your Development Environment

## The Command Line Interface (CLI)
Unlike a Graphical User Interface (GUI), the Command Line Interface (CLI) is a way of interacting with your computer by using words instead of clicking buttons and links.

On Mac you would access the CLI via Terminal and on Windows you'd use Command Prompt.

With the CLI you can:

- Get your environment set up.
- Navigate between your projects.
- Switch between different versions of your projects.
- Push and pull your code for collaboration.

And much more that we will touch on in the very near future.

### Navigating The CLI

1. Open Terminal or Command Prompt:
  - On Mac: `cmd` + `space` key, then type in terminal
  - On Windows: Start > Run Command Prompt
2. Get your current directory:
  - On Mac: type `pwd`
  - On Windows: type `cd`
3. List the content of your current directory:
  - On Mac: type `ls`
  - On Windows: type `dir`
4. Make a new directory named "hello-world": type `mkdir hello-world`
5. Change into the "hello-world" directory: type `cd hello-world`
6. Create a new file called "README.md" in "hello-world": type `echo Hello World > README.md`

## Git and GitHub

### What is Git?
Git is version control software, which means it manages changes to a project without overwriting any part of that project.  It basically means it allows developers to work on new features without worrying about ruining the code that was previously working or overwrite other developers' code.

### What is GitHub
GitHub is a web-based Git repository hosting service. It offers all of the functionality of Git as well as adding its own features such as pull requests and forks.  The fact that it is web-based, it makes it even easier for developers to collaborate and share code.

Now that we know a little bit about Git and GitHub, let's now [dig in and get set up](/labs/environment.md)

## Browser
A browser is a software application for retrieving, presenting, and traversing information resources on the World Wide Web. An information resource is identified by a Uniform Resource Identifier (URI/URL) and may be a web page, image, video or other piece of content.

For a developer, the browser is also used for debugging and testing their web application.  This is done by using the browser's developer tools which allow you to look at your application's code to see what is working and what is not.

Most modern browsers now have built in developer tools but for this course, we'll be using [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html)

### Setting Up Chrome
1. Download [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html)
2. Install it with all the default settings
3. Open Chrome

### Using Chrome's Developer Tools
Overall, there are eight main groups of tools available in Developer Tools (DevTools for short). Let's take a quick look at some of the most commonly used tools:

- Elements - Lets you see all the elements on you web page, and allows inspection and on-the-fly editing of elements.  Note that these are Document Object Model (DOM) elements, more on what this exactly means later.
- JavaScript Console - Serves two purposes:
  - Log diagnostics information
  - A command prompt to interact with the document and its elements.
- Sources - Allows you to see the sources that make up your web page.  It will also allow you to debug your JavaScript code which will be very handy when you are dealing with more complex applications.  
- Network - See information about the requests you send to a server and responses you get back from that server.

Of course, we will dig into these in much more detail as the course progresses.

## Atom Editor
Atom is a "hackable" text editor built on the same technologies used for web development.  Which means you can tweak the look and feel of your UI with CSS/Less and add major features with HTML and JavaScript.

### Getting Started
[Download Atom](https://atom.io/)

Once you have Atom downloaded and open, let's look at some key features of Atom and then a few ways we can hack it.

### Panes
Atom's interface is divided into panes. When you first open Atom, you can see four Panes - the tab bar, the gutter (which has line numbers in it), the status bar at the bottom and finally the text editor.

If you open a directory, you will see a fifth Tree view pane.  The Tree view allows you to explore and modify the file and directory structure of your project. You can open, rename, delete and create new files from this view.

### Command Palette
This search-driven menu can do just about any major task that is possible in Atom. Instead of clicking around all the application menus to look for something, you can just hit `cmd-shift-P` and search for the command.  Note that this also shows the keybinding associated to the command if there is one.

### Packages
Atom itself is an application with very basic functionality that is extended by 70+ default packages, these include the many language packages that come preconfigured with language specific snippets.  

One of my favorite default packages is the markdown package.  You can just hit `ctrl+shift-M` to launch it and start previewing your markdown.

Another very useful package is [editorconfig](https://atom.io/packages/editorconfig), it helps developers define and maintain consistent coding styles between different editors and IDEs.  So you just have to agree on spaces vs tabs once and never worry about it again.

![](https://cdn.meme.am/instances/500x/68630555.jpg)

We'll talk about the `.editorconfig` file and its settings at a later time but for now, let's install the package to enable it in Atom.

#### Atom Package Manager
Atom Package Manager (apm) is a command line tool that you can use to quickly install packages from the CLI.

Note: If `apm` isn't installed for some reason go to Atom > Install Shell Commands and that should fix the issue.

With `apm` you can see a list of your packages:

```
apm ls
```

Or install packages. Let's install yet another useful Atom package [atom-beautify](https://atom.io/packages/atom-beautify) but this time using `apm`:

```
apm install atom-beautify
```

Beautify will basically clean up your messy code for you.  To run it, just right click and choose 'Beautify editor contents':

![](http://media02.hongkiat.com/useful-atom-packages/beautify.gif)

You can see a list of `apm` commands by typing `apm` at the CLI.  For the most part you'll be using `ls`, `install` and `uninstall`.

### Themes
You can also search and install themes just like you would packages via the command palette or `apm`

#### Customizing Atom's Look
You can also easily customize Atom's UI by using stylesheets, just like you would with any web page.

Open Atom > Preferences... and click **Open Config Folder**.

Then open `styles.less` and follow the instructions to make your changes.

### Keybindings
Keybindings map specific **keystroke patterns** to **commands**.

You can see a list of all the preconfigured keybinding by going into `Atom > Preferences...`

#### Keymaps
Keymaps allow you to change existing keybindings or add your own.

You can copy an existing keybinding and override it to use a different key.  For example you can copy the keybinding for `a` in Tree view and then change it to use `+` instead:

Open Atom > Preferences... and click **Open Config Folder**.

Then open `keymap.cson` and add the following:

```
'.tree-view':
  'a': 'unset!',
  '+': 'tree-view:add-file'
```

Keymaps use selectors just like stylesheets, in the block above `.tree-view` is the selector. Below the selector, the part before `:` is the key you want to map and then part after is the command:

```
'<selector>':
  '<key>': '<command>'
```

The `unset!` command removes an existing keybinding.

You can learn more about keymaps by visiting [Keymaps In-Depth](http://flight-manual.atom.io/behind-atom/sections/keymaps-in-depth/).

### Snippets
Snippets are an incredibly powerful way to quickly generate commonly needed code syntax from a shortcut.

Many of the packages come bundled with their own set of snippets.  
For example, the `language-html` package which is one of the 70+ default packages in Atom, comes with a snippet that lets you create HTML files quickly by typing `html` and then `tab`.

Snippets become active depending on the file type.

#### Creating Your Own Snippets
You can also add your own snippets to a language package.  For example, let's add a new snippet to the `lanaguage-javascript` package:

Open Atom > Preferences... and click **Open Config Folder**.

Then open `snippets.cson` and add the following:

```
'.source.js':
  'if, else if, else':
    'prefix': 'ieie'
    'body': """
      if (${1:true}) {
        $2
      } else if (${3:false}) {
        $4
      } else {
        $5
      }
    """
```

Let's break down the parts real quick:

```
'<selector>':
  '<snippet name>':
    'prefix': '<trigger>'
    'body': """
      if (${1:true}) {
        $2
      } else if (${3:false}) {
        $4
      } else {
        $5
      }
    """
```

You can grab the `selector` by from the language package.

Each `$` followed by a number is a tab stop.

### Want to Learn More?
Check out [Atom's Flight Manual](http://flight-manual.atom.io/)
