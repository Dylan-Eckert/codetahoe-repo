### Setting up Git

1. Download Git:
  - Mac: [Download and install the latest version of Git.](https://git-scm.com/downloads)
  - Windows: [Download GitHub Desktop](https://desktop.github.com/)
2. Open Terminal or Command Prompt.
3. Tell Git your name and email so your commits will be properly labeled.

```
  git config --global user.name "YOUR NAME"
  git config --global user.email "YOUR EMAIL ADDRESS"
```

### Authenticating with GitHub

1. Open Terminal (Mac) or Git Bash (Windows)
2. Paste the following text, use the same email address you used above: `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`
3. When you're prompted to "Enter a file in which to save the key," press Enter. This accepts the default file location.
4. At the prompt, type a secure passphrase.
5. [Add this SSH key to your GitHub account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)

### Create a Repository

- In the upper-right corner of any page, click +, and then click "New repository".
- For the purpose of this lab, call it "hello-world".
- Create a new directory for your project on your computer:
```
mkdir hello-world
cd hello-world
echo "Hello World" >> README.md
```
- Inititalize this directory to use Git:
```
git init
```
- Stage "README.md" to be included in your commit, note that you can stage muliple files:
```
git add README.md
```
- See what file(s) have been staged:
```
git status
```
- If you decide you don't want to include a file in your commmit, unstage it:
```
git reset README.md
```
- Go ahead and add it back in so we can test code commits.
- Then commit it to your local repository:  
```
git commit -m "adding README.md"
```
- You have now basically created a snapshot of the file(s) you staged.
- See the id/hash of your commit:
```
git log --oneline
```
- Now "push" your snapshot to GitHub:
```
git remote add origin git@github.com:<your username>/hello-world.git
git push -u origin master
```

### Issue Tracking and Comments

#### Create a new issue

1. In your new GitHub repository, click the "Issues" tab.
2. Click "New Issue".
3. Type in a title and description.
4. Click "Submit new issue".

#### Adding Comments with Markdown
1. Under the same issue, add a comment with code snippets and code snippet blocks, see: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#code-and-syntax-highlighting
2. Add another comment with images, see: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#images

#### Closing Issues via Commit Messages
This allows you to map commits to actual issues, we will see why this is important as the course progresses.

1. Go back to Terminal or Git Bash
2. Type `echo "Hello World - Closing an Issue" >> README.md`
3. Follow the instructions above up starting from staging a file and including 'git add README.md'
4. Then type: `git commit -m "closes #1"`.
5. Then push your commit to GitHub as outlined above.
6. If you go back to your issue, you should see that it is closed and the hash of the commit that closes your issue is referenced.  
