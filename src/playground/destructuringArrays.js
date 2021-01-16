console.log('Destructuring Arrays')

// Just a simple array of 4 strings
const address = ['2 Broad Street', 'Sheffield', 'South Yorkshire', 'S2 8YT']

// Array destructuring is done by position
const [ street, town, county, postcode ] = address;

console.log(`The town is ${town} and the postcode is ${postcode}`) //The town is Sheffield and the postcode is S2 8YT

// If you don't need all of them, you can omit them
let [ , city, , zip ] = address;

console.log(`The town is ${city} and the postcode is ${zip}`)//The town is Sheffield and the postcode is S2 8YT

let blankAddress = [];
// You can set default values
[ , city = 'Milton Keynes', , zip ] = blankAddress;

console.log(`The town is ${city} and the postcode is ${zip}`)//The town is Milton Keynes and the postcode is undefined

// You can omit properties off the end if you don't need them
const beverage = ['Mocha', '£2.00', '£2.50', '£2.75']
const [ coffee, , medium ] = beverage;

console.log(`A nice medium cup of ${coffee} costs ${medium}`)

