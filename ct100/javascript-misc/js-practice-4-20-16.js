// ----- Boolean Exercise -----
var age = 19
var time = 10

if (time >= 10) {
  if (age < '18') {
    console.log('You are too young!')
  } else if (age < '21') {
    console.log('No drinks for you!')
  } else {
    console.log('Drink responsibly!')
  }
} else {
  console.log('All are welcome!')
}
// ----- While Loop Exercises -----
  // Log all numbers between -10 and 19
var count1 = -10

while (count1 <= 19) {
  console.log(count1)
  count1++
}
  // Log all even numbers between 10 and 40
var count2 = 10

while (count2 <= 40) {
  console.log(count2)
  count2 = count2 + 2
}
  // Log all odd numbers between 300 and 333
var count3 = 300

while (count3 <= 333) {
  if (count3 % 2 === 1) {
    console.log(count3)
  }
  count3++
}
  // Log all divisible by 5 and 3 between 5 and 50
var count4 = 5

while (count4 <= 50) {
  if ((count4 % 5 === 0) && (count4 % 3 === 0)) {
    console.log(count4)
  }
  count4++
}
// ----- For Loop Exercises -----
  // Log all numbers between -10 and 19
var count5 = -10

while (count5 <= 19) {
  console.log(count5)
  count1++
}
  // Log all even numbers between 10 and 40
var count6 = 10

while (count6 <= 40) {
  console.log(count6)
  count2 = count6 + 2
}
  // Log all odd numbers between 300 and 333
var count7 = 300

while (count7 <= 333) {
  if (count7 % 2 === 1) {
    console.log(count3)
  }
  count7++
}
  // Log all divisible by 5 and 3 between 5 and 50
var count8 = 5

while (count8 <= 50) {
  if ((count8 % 5 === 0) && (count4 % 3 === 0)) {
    console.log(count8)
  }
  count4++
}
