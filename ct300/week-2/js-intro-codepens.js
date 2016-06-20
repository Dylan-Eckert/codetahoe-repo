// ----- ----- Cars Exercise ----- -----
var cars = [
  {
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
  }
];

cars[3].color = prompt('What color would you like the Lamborghini Aventador to be?');

alert('The Lamborghini Aventador\'s color is '+cars[3].color);

cars[0].model = null;

// -----  ----- Garage Exercise ----- -----
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
    }],
    getThirdCarModel: function() {
        console.log(this.cars[2].model);
    },
    getFifthCarModelFirstCharacter: function() {
        return (this.cars[4].model[0]);
    }
};
