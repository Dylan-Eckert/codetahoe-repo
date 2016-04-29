// ----- Exercises -----
  // ----- LIST EX -----
var student = {
  name: 'Jordan',
  id: 123456789,
  creditsEarned: 80,
  phone: '(123) 456-7890',
  address: '123 Sesame Street, Truckee, CA',
  currentClasses: ['CT100', 'CT200', 'CT300']
}

for (var key in student) {
  console.log('key', key)
  console.log('value', student[key])
}

  // ----- CIRCLE EX -----
function circle (radius) {
  this.radius = radius
  this.getArea = function () {
    return (3.14 * (this.radius * this.radius))
  }
}

var myCircle = new circle(10)

  // ----- MOVIE DATABASE EX -----
var movies = [
  {
    title: 'SW I',
    rating: '2',
    genre: 'Sci-Fi',
    actors: 'Liam Neeson, Natalie Portman, Ewan McGregor',
    watched:'Watched',
  },
  {
    title: 'SW II',
    rating: '4',
    genre: 'Sci-Fi',
    actors: 'Natalie Portman, Ewan McGregor, Hayden Christensen',
    watched: 'Watched',
  },
  {
    title: 'SW III',
    rating: '1.5',
    genre: 'Sci-Fi',
    actors: 'Natalie Portman, Ewan McGregor, Hayden Christensen',
    watched: 'Watched',
  },
  {
    title: 'SW IV',
    rating: '5',
    genre: 'Sci-Fi',
    actors: 'Mark Hamill, Harrison Ford, Carrie Fisher',
    watched: 'Not Watched',
  },
  {
    title: 'SW V',
    rating: '4',
    genre: 'Sci-Fi',
    actors: 'Mark Hamill, Harrison Ford, Carrie Fisher',
    watched: 'Not Watched',
  },
]

for (var key in movies) {
  console.log('key', key)
  console.log('value', movies[key])
}
