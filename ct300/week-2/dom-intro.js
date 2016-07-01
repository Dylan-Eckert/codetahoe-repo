/*document.querySelector('#article-1').getElementsByTagName('h1')
document.getElementById('article-1').getElementsByTagName('h1')
document.querySelector('#article-1').querySelector('h1')
document.getElementById('article-1').querySelector('h1')*/

var h1Change = document.getElementById('article-1').getElementsByTagName('h1')[0];
h1Change.textContent = 'Not-so Shiny New JavaScript Framework'
h1Change.classList.toggle('article-heading');

var aChange = document.getElementsByClassName('btn-get-it')[0];

aChange.setAttribute('href', 'https://www.google.com')
