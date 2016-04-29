console.log('js-practice-4-18-16.js loaded')
 // 1. Ask the user for their name
function getName () {
  var nameResult = prompt('Please enter your name to continue.')
  return nameResult
}

function welcome (name) {
 // 2. Log that name in the console
 // 3. Alert the user with a welcome message
  alert('Welcome ' + name)
}

var someName = getName()
welcome(someName)
