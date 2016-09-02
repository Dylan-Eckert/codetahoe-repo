# Introduction to Redux
Redux is a predictable state container for JavaScript apps.  It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. It is often used with React since React relies heavily on states, but it can be used with any other view library.

An interesting fact about Redux is that it is very tiny (2KB), in fact, without sanity checks and comments, it is only [99 lines of code](https://gist.github.com/gaearon/ffd88b0e4f00b22c3159).

There is also a great [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) that allows us to view action history, undo and replay.

## Installation
As with any JavaScript library, we can install redux via `npm`:

```bash
npm i redux --save
```

Since we'll be using Redux with React, we also need to install its React bindings:

```bash
npm i react-redux --save
```

## Three Principles

- The entire state of your app is stored in an object tree inside a single *store*.
- The only way to change the state tree is to emit an *action*, an object describing what happened.
- To specify how the actions transform the state tree, you write pure *reducers*.

Working example:

To start using this working example and the exercises in this lecture, clone [Redux Starter](https://github.com/CodeTahoe/redux-starter)

```JavaScript
import { createStore } from 'redux';

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  default:
    return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter);

// You can use subscribe() to update the UI in response to state changes.
// Normally you’d use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() =>
  console.log(store.getState())
);

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1
```

## First Redux App
Let's create a simple Todo app using Redux to understand the concepts.

### Actions
First thing we want to do is define actions.  Actions are payloads of information that send data from our application to our store. They are the only source of information for the store. We send them to the store using `store.dispatch()`.

Let's create an `actions.jsx` file and add the following code:

```JavaScript
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
```

These are our *action types*.

`ADD_TODO` is the action type for the action that is dispatched when a new item is added.  In this case, our action object would look something like this:

```JavaScript
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

Here we'd want to pass the todo item text as our action data.

`TOGGLE_TODO` is the action type for the checking on/off action.  The action object for this action type should look like this:

```JavaScript
{
  type: TOGGLE_TODO,
  index: 5
}
```

In this case, we'd want to pass in the index of the item we want to check on/off our list.

`SET_VISIBILITY_FILTER` is the action type for showing all, completed or active todos.  The action object for this would look like this:

```JavaScript
{
  type: SET_VISIBILITY_FILTER,
  filter: SHOW_COMPLETED
}
```

Note that we pass in a filter in this case.  It'd be ideal to define these filter via another const:

```JavaScript
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
```

Next thing we'd want to do is define our *action creators*.  These are simply functions that return actions, so in our case we need to add the following action creators:

```JavaScript
export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
```

Note that these return exactly the actions we defined above.  We can then dispatch these like so:

```JavaScript
store.dispatch(addTodo(text));
```

### Reducers
Actions describe the fact that something happened, but don’t specify how the application’s state changes in response. This is the job of a *reducer*.

#### State Object Design
In Redux, all application state is stored as a single object. It’s a good idea to think of its shape before writing any code. What’s the minimal representation of your app’s state as an object?

For our todo app, we want to store two different things:

- The currently selected visibility filter;
- The actual list of todos.

So our state would look something like this:

```JavaScript
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
```

#### Handling Actions
Now that we know what our state looks like, let's define our reducers.  The reducer is a pure function that takes the previous state and an action, and returns the next state:

```
(previousState, action) => newState
```

It’s called a reducer because it’s the type of function you would pass to [Array.prototype.reduce(reducer, ?initialValue)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

It's also important that the reducer must be pure. Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.

Now let's define our reducer in `reducers.jsx`:

```JavaScript
import { VisibilityFilters } from './actions'

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
}

function todoApp(state = initialState, action) {
  // For now, don’t handle any actions
  // and just return the state given to us.
  return state
}
```

Note that our initial state has no todo items and its `visibilityFilter` is set to `SHOW_ALL`.

Let's now add some code to set our `visibilityFilter` accordingly:

```JavaScript
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}
```

Note that:

- We don’t mutate the `state`. We create a copy with `Object.assign()`. `Object.assign(state, { visibilityFilter: action.filter })` is also wrong: it will mutate the first argument. You must supply an empty object as the first parameter.
- We return the previous `state` in the default case. It’s important to return the previous `state` for any unknown action.

Now let's handle the rest of our actions:

```JavaScript
let i = 1;

function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    case ADD_TODO:
      return [
        ...state,
        {
          id: i++, // increment ids by 1
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.todos.map(function(t) {
        if (t.id !== action.id) {
          return t;
        }

        return Object.assign({}, t, {
          completed: !t.completed
        })
      });
    default:
      return state
  }
}
```

#### Splitting Reducers
Let's see if we can further clean up our code. It seems like `todos` and `visibilityFilter` are updated completely independently. Sometimes state fields depend on one another and more consideration is required, but in our case we can easily split updating `todos` and `visibilityFilter` into separate functions.  This is called *reducer composition*, and it’s the fundamental pattern of building Redux apps.

```JavaScript
let i = 1;

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: i++, // increment ids by 1
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map(function(t) {
        if (t.id !== action.id) {
          return t;
        }

        return Object.assign({}, t, {
          completed: !t.completed
        })
      });
    default:
      return state;
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
```

This looks much better than what we had before, and when our app is larger, we can easily separate these reducers into their own files.

We can make one change to clean things up even more, Redux provides a utility called `combineReducers()` that does the same boilerplate logic that the todoApp above currently does. With its help, we can rewrite `todoApp` like this:

```JavaScript
import { combineReducers } from 'redux';
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions';
const { SHOW_ALL } = VisibilityFilters;

//...

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
```

All `combineReducers()` does is generate a function that calls your reducers with the slices of state selected according to their keys, and combining their results into a single object again, pretty much exactly like what we had originally written above.

### Store
The *Store* is the object that brings *actions* and *reducers* together. The store has the following responsibilities:

- Holds application state;
- Allows access to state via `getState()`;
- Allows state to be updated via `dispatch(action)`;
- Registers listeners via `subscribe(listener)`;
- Handles unregistering of listeners via the function returned by `subscribe(listener)`.

It’s important to note that you’ll only have a single store in a Redux application. When you want to split your data handling logic, you’ll use *reducer composition* instead of many stores.

To create a store in React, let's add this to our `index.jsx`:

```JavaScript
import { createStore } from 'redux';
import todoApp from './reducers';

let store = createStore(todoApp);
```

Next, let's test out what we have done so far, in the same `index.jsx` file:

```JavaScript
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './actions'

// Log the initial state
console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

// Dispatch some actions
store.dispatch(addTodo('Learn about actions'));
store.dispatch(addTodo('Learn about reducers'));
store.dispatch(addTodo('Learn about store'));
store.dispatch(toggleTodo(1));
store.dispatch(toggleTodo(2));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

// Stop listening to state updates
unsubscribe();
```

Also, to see this in React DevTools, we'll replace our store statement with this:

```JavaScript
let store = createStore(todoApp, window.devToolsExtension && window.devToolsExtension())
```

### Data Flow
Redux architecture revolves around a *strict unidirectional data flow*.

This means that all data in an application follows the same lifecycle pattern, making the logic of your app more predictable and easier to understand. It also encourages data normalization, so that you don't end up with multiple, independent copies of the same data that are unaware of one another.

The data lifecycle follows these 4 steps:

1. We call `store.dispatch(action)`.  This can be called anywhere in the application, for example in an AJAX callback.
2. The Redux *store* will then call the *reducer* we defined for that action.  Remember the reducer always takes *current state* (soon to be previous state) and an *action* as arguments, it then calculates the next *state* (soon to be current state).
3. The root reducer will combine the output of multiple reducers into a single state tree.  In our case, `combineReducers` will call both of our *reducers* `todos` and `visibleTodoFilter` and then combine both sets of results into a single state tree.
4. The Redux *store* saves the complete state tree returned by the root reducer.  This new tree is now the next state of your app. Every listener registered with `store.subscribe(listener)` will now be invoked; listeners may call `store.getState()` to get the current state. If we are using React Redux bindings, the listener that the binding registers will fire `component.setState(newState)` at this point.

### React and Redux
Redux works especially well with frameworks like React because they let you describe UI as a function of state, and Redux emits state updates in response to actions.

React Redux bindings are not included by default, so we need to install them via:

```bash
npm i react-redux --save
```

#### Presentational and Container Components
React bindings for Redux embrace the idea of separating *presentational* and *container* components.

The differences between these two types of components is as follows:

<table>
    <thead>
        <tr>
            <th></th>
            <th scope="col" style="text-align:left">Presentational Components</th>
            <th scope="col" style="text-align:left">Container Components</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <th scope="row" style="text-align:right">Purpose</th>
          <td>How things look (markup, styles)</td>
          <td>How things work (data fetching, state updates)</td>
        </tr>
        <tr>
          <th scope="row" style="text-align:right">Aware of Redux</th>
          <td>No
          </td><td>Yes
        </td></tr>
        <tr>
          <th scope="row" style="text-align:right">To read data</th>
          <td>Read data from props</td>
          <td>Subscribe to Redux state</td>
        </tr>
        <tr>
          <th scope="row" style="text-align:right">To change data</th>
          <td>Invoke callbacks from props</td>
          <td>Dispatch Redux actions</td>
        </tr>
        <tr>
          <th scope="row" style="text-align:right">Are written</th>
          <td>By hand</td>
          <td>Usually generated by React Redux</td>
        </tr>
    </tbody>
</table>

Technically we could write the container components by hand using `store.subscribe()`, but React Redux makes many performance optimizations that are hard to do by hand. For this reason, rather than write container components, we will generate them using the `connect()` function provided by React Redux.

#### Component Hierarchy
We should now design UI components to match our root store object.  

Our design brief is simple:

- Show a list of todo items.
- On click, a todo item is crossed out as completed.
- Show a field where the user may add a new todo.
- In the footer, show a toggle to show all, only completed, or only active todos.

#### Presentational Components
Based on our design brief, we should define these presentational components:

- **TodoList** is a list showing visible todos.
 - `todos`: `Array` is an array of todo objects in the form of `{ id, text, completed }`.
 - `onTodoClick(id: number)` is a callback to invoke when a todo is clicked.
- **Todo** is a single todo item.
 - `text`: `string` is the text to show.
 - `completed`: `boolean` is whether todo should appear crossed out.
 - `onClick()` is a callback to invoke when a todo is clicked.
- **Link** is a link with a callback.
 - `onClick()` is a callback to invoke when link is clicked.
- **Footer** is where we let the user change currently visible todos.
- **App** is the root component that renders all of our components.

These components describe the look but don't deal with data or know where it comes from.  The great thing about this design is that we can easily replace Redux with another library and keep these exactly the same.  They do not have any dependency on Redux.

#### Container Components
We will also need some container components to connect the presentational components to Redux. For example, the presentational `TodoList` component needs a container like `VisibleTodoList` that subscribes to the Redux store and knows how to apply the current visibility filter. To change the visibility filter, we will provide a `FilterLink` container component that renders a `Link` that dispatches an appropriate action on click:

- **VisibleTodoList** filters the todos according to the current visibility filter and renders a `TodoList`.
- **FilterLink** gets the current visibility filter and renders a `Link`.
 - `filter`: `string` is the visibility filter it represents.

#### Other Components
Sometimes it’s hard to tell if some component should be a presentational component or a container. For example, sometimes form and function are really coupled together, such as in case of this component:

- **AddTodo** is an input field with an “Add” button

Technically we could split it into two components but it might be too early at this stage. It’s fine to mix presentation and logic in a component that is very small.

#### Implementing Components
Let's start by implementing our presentational components.

It is recommended to write functional stateless components unless we need to use local state. If and when we need to add local state, we can convert them to classes.

Before we go any further, we will be using ES6 arrow functions to describe our stateless components:

```JavaScript
const MyFunction = (arg1, arg2) => {
  return arg1 + arg2;
}
```

Is the same as:

```JavaScript
const MyFunction = function(arg1, arg2) {
  return arg1 + arg2;
}
```

Ok, let's continue with our component implementations:

`components/Todo.jsx`

```JavaScript
import React, { PropTypes } from 'react';

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Todo;
```

Note that `Todo.propTypes` is a React concept and it is defining the types of props that are valid in our component.  `React.PropTypes` exposes validators that can be used to make sure the data you receive is valid. When an invalid value is provided for a prop, a warning will be shown in the JavaScript console.  These are only checked in development mode for performance reasons.

`components/TodoList.jsx`

```JavaScript
import React, { PropTypes } from 'react';
import Todo from './Todo';

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
};

export default TodoList;
```

Notice the `{...todo}`?  It is a new ES6 operator called the spread operator and it "spreads" the properties in `todo` object to parameters that are then passed into the `Todo` component as props.

Also notice we don't have to worry about binding `this`?  That's another nice thing about functional stateless components.

Let's quickly define the rest of our UI components:

`components/Link.jsx`

```JavaScript
import React, { PropTypes } from 'react';

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Link;
```

`components/Footer.jsx`

```JavaScript
import React from 'react';
import FilterLink from '../containers/FilterLink';

const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">
      Completed
    </FilterLink>
  </p>
);

export default Footer;
```

`components/App.jsx`

```JavaScript
import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;
```

Note that we haven't yet defined our container components but are including them in our `App` component.  Let's now define those.

As stated earlier, we are going to use Redux's `connect()` function to build our container components. To use `connect()`, we need to define a special function called `mapStateToProps` that tells how to transform the current Redux store state into the props we want to pass to a presentational component we are wrapping. For example, `VisibleTodoList` needs to calculate `todos` to pass to the `TodoList`, so we define a function that filters the `state.todos` according to the `state.visibilityFilter`, and use it in its `mapStateToProps`:

`containers/VisibleTodoList.jsx`

```JavaScript
import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
  }
};

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};
```

Note that `filter` above is a JavaScript array method that only returns objects in the array that match a criteria.

In addition to reading the state, container components can dispatch actions. Just like above, we can then define a function called `mapDispatchToProps()` that receives the `dispatch()` method and returns callback props that we want to inject into the presentational component. For example, we want the `VisibleTodoList` to inject a prop called `onTodoClick` into the `TodoList` component, and we want `onTodoClick` to dispatch a `TOGGLE_TODO` action:

```JavaScript
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
};
```

Finally, we create `VisibleTodoList` by calling `connect()` and passing these two functions:

```JavaScript
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;
```

Notice how we pass in `TodoList` as an argument to connect?  Here, `connect()` is injecting what we return from `mapStateToProps` to `todos` in `TodoList` and `mapDispatchToProps` to `onTodoClick` in `TodoList`.

For example, when filter by `SHOW_COMPLETED`, the combined object that gets passed into `TodoList` looks like this:

```JavaScript
{
  todos: todos.filter(t => t.completed),
  onTodoClick: (id) => {
    dispatch(toggleTodo(id))
  }
}
```

We will define `FilterLink` in the same way:

`containers/FilterLink.jsx`

```JavaScript
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Link from '../components/Link';

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default FilterLink;
```

And `AddTodo`:

`containers/AddTodo.jsx`

```JavaScript
import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
};

AddTodo = connect()(AddTodo);

export default AddTodo;
```

#### Passing the Store
All container components need access to the Redux store so they can subscribe to it. One option would be to pass it as a prop to every container component. However it gets tedious, as we'd have to wire `store` even through presentational components just because they happen to render a container deep in the component tree.

This is where a React Redux component called `<Provider>` come in to play.  This component makes the store available to all container components in the application without passing it explicitly. We only need to use it once when we render the root component:

`index.jsx`

```JavaScript
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';

let store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
);
```

Let's now test our todo Redux app and use Redux DevTools to see what our application is doing.
