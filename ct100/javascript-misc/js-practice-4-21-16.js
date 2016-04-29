// ----- Functions -----
  // Life Stats Exercise
function getDaysFromYears (years) {
  var days

  if (years) {
    days = 365 * years
  }

  return days
}

function getSleepingHoursFromDays (days) {
  var sleepingHours

  if (days) {
    sleepingHours = days * 8
  }

  return sleepingHours
}

function getDaysAsleep (sleepingHours) {
  var daysSleeping

  if (sleepingHours) {
    daysSleeping = sleepingHours / 24
  }

  return daysSleeping
}

function getYearsAsleep (sleepingDays) {
  var yearsSleeping

  if (sleepingDays) {
    yearsSleeping = sleepingDays / 365
  }

  return yearsSleeping
}

var yearsAlive = prompt('How old are you?')

var daysAlive = getDaysFromYears(yearsAlive)
console.log('You have been alive for this many days.', daysAlive)

var hoursSleeping = getSleepingHoursFromDays(daysAlive)
console.log('You have been asleep for this many hours.', hoursSleeping)

var sleepingDays = getDaysAsleep(hoursSleeping)
console.log('You have been asleep for this many days.', sleepingDays)

var yearsSleeping = getYearsAsleep(sleepingDays)
console.log('You have been asleep for this many years.', yearsSleeping)

  // Temperature Conversion Exercise
function convertTemp (degrees, tempType) {
  var convertedTemp

  if (tempType === 'F' || tempType === 'f') {
  // do fahrenheit to celsius
    convertedTemp = (degrees - 32) * 1.8
  } else {
  // do celcius to fahrenheit
    convertedTemp = (degrees * 9) / 5 + 32
  }

  return convertedTemp
}

var degrees = prompt('Please enter the temperature number.')
var tempType = prompt('Please enter the type of temperature. F for Fahrenheit and C for Celsius')

var temp = convertTemp(degrees, tempType)
console.log(temp)
