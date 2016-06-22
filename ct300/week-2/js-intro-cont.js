//----- ----- Garage Conditional and Loop Exercise ----- -----
var garage = {
    cars: [{
        make: 'Ferrari',
        model: 'Enzo',
        color: 'Red'
    }, {
        make: 'Jeep',
        model: 'Grand Cherokee',
        color: 'White'
    }, {
        make: 'Toyota',
        model: 'Supra',
        color: 'Orange'
    }, {
        make: 'Lamborghini',
        model: 'Aventador',
        color: 'Yellow'
    }, {
        make: 'GMC',
        model: 'Denali',
        color: 'Black'
    }, ],
    addNewCar: function() {
        var make = prompt('What car brand do you like?');
        var model = prompt('From the car brand you chose, what is your favorite model?');
        var color = prompt('What color would you like the car to be?');
        var newCar = {
            make: make,
            model: model,
            color: color,
        }
        this.cars.push(newCar);
    },
    selectCar: function() {
        var select = prompt('What car stats would you like to view?')
        for (var i = 0; i < this.cars.length; i++) {
            if (this.cars[i].make === select) {
                return this.cars[i];
            }
        }
    }
};

var Garage = function(cars) {
  this.cars = cars;
}

var Car = function(make, model, color) {
  this.make = make;
  this.model = model;
  this.color = color;
};
//adding prototypes
var car1 = new Car('Toyota', 'Supra', 'Black');
var car2 = new Car('Jeep', 'Grand Cherokee', 'Blue');
var car3 = new Car('Jeep', 'Grand Cherokee', 'Red');
var car4 = new Car('Jeep', 'Grand Cherokee', 'Purple and Green');

var myGarage = new Garage([car1, car2, car3, car4]);
