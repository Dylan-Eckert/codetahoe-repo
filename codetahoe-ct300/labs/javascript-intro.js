// JavaScript Intro

// 1.  Given the following object, log the name of the student with id 3.

var students = [
  {
  id: 1,
    name: 'Aaron',
    row: 1,
    usesMac: true
  },
  {
    id: 2,
    name: 'Mike',
    row: 2,
    usesMac: false
  },
  {
    id: 3,
    name: 'Markham',
    row: 3,
    usesMac: true
  },
  {
    id: 4,
    name: 'Blaze',
    row: 2,
    usesMac: true
  }
]

console.log(students[2].name);

// 2.  Write a function to add students to the list of students, then print the
//     new student object from the object.  Execute the function for 3 new students.
//  Hint:  You add to an array like this:  myArray.push(object)
//  Hint:  You can get the number of objects in an array by using myArray.length

// Create a student object constructor
function student(id, name, row, usesMac) {
  this.id = id;
  this.name = name;
  this.row = row;
  this.usesMac = usesMac;
}

// Declare a function to add students to the students array
function addStudent(array, name, row, usesMac) {
  id = array.length + 1;
  newStudent = new student(id, name, row, usesMac);
  array.push(newStudent);
}

// Invoke the function for each new student
addStudent(students, "Markus", 1, true);
console.log(students[students.length-1]);

addStudent(students, "Liam", 2, true);
console.log(students[students.length-1]);

addStudent(students, "Svyatoslav", 3, true);
console.log(students[students.length-1]);

console.log(students);


// 3.  Write a function that adds 5 to a number, then multiplies the result by 50.
//     Log the result.

function addNum(num) {
  var added = num + 5;
  return added * 50;
}

console.log(addNum(22));

console.log(addNum(111));

// 4.  Show an example of function scope by logging variables in different scopes.

var dog = "Schnauser";

function buyDog(newDog) {
  var dog = newDog;
  console.log(dog);
  return dog;
}

console.log(dog);

buyDog("Great Dane");

console.log(dog);

dog = buyDog("Chia Pet");

console.log(dog);
