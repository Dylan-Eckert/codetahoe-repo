# Final Project

Build a lite version of [Trello](https://www.youtube.com/watch?v=xky48zyL9iA) with the following functionality.

- Single board.
- Fixed set of lists: `To Do`, `Doing`, `Done`
- Add/edit/remove cards.
- Drag and drop cards between lists.
- Add/remove comments in a card.
- Admin can create users for the board.  Username/password can be communicated to the users offline.

Bonus:
- One checklist per card, user can add/edit/remove checklist items in this single checklist.
- Invite users to board via email.
- Multiple boards.
- Edit comments.
- Assign users.

Requirements:
- Use GitHub issues or Trello to break down what you'll be working on and track your progress.
- Backend, pick between:
  - Authentication built in Node, rest of APIs built in Rails.
  - Authentication built in Rails, rest of APIs built in Node.
- Frontend should be in React:
  - Ajax calls should be made via jQuery.
  - Use of Redux is highly recommended but optional.
  - Either Rails or Node should serve the React frontend.  You pick.
- You can work together to design the application and ask questions, but you cannot copy code or delegate.


References:
- Node authentication: https://github.com/jaredhanson/passport
- Rails authentication: https://github.com/plataformatec/devise
- Drag and drop in React: https://github.com/gaearon/react-dnd
- Calling external APIs in your backend code:
  - Node: HTTP request client library: https://github.com/request/request
  - Ruby: HTTP request client library: https://github.com/lostisland/faraday

Hints:
- You should have your backend code calling the authentication API since you will have to check and grab the user every time a request is made.
- Lecture notes, React and Redux exercises should come very handy here especially when it comes to comments and todo lists.

Good luck and have fun!
