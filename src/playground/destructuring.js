console.log('Destructuring')

const person = {
    name: 'Gillian',
    age: 55,
    shoeSize: 6,
    location: {
        address: 'Stoke Hammond',
        houseNumber: 2,
        room: 'upstairs office',
        contact: {
            telno: '181818'
        }
    }
}
// Simple destructuring
const { name, age } = person;
console.log(` I am ${name} and my age is ${age}`)

//Deeper destructuring
const { address , room } = person.location;
console.log(` I live in ${address} and I am working from my ${room}`)  //I live in Stoke Hammond and I am working from my upstairs office

//Renaming a destructured property - we rename address as village
const { houseNumber, address: village } = person.location;
console.log(` My village is ${village} and my house number is ${houseNumber}`) //My village is Stoke Hammond and my house number is 2

// Providing a default.  There is no haircolour in my person object.  This would also work for haircolour: undefined, but
// not for haircolour: false, haircolour: null etc
const { haircolour = 'brown' } = person;
console.log(` My hair colour is ${haircolour}`)  //My hair colour is brown

// Now a combination of the above - destructuring and renaming together from a deep object
// The property we are grabbing is telno.
// We are grabbing it from the person.location.contact object.
// We are renaming telno as telephone.
// We are giving it a default of 'No Telephone'
const { telno: telephone = 'No Telephone' } = person.location.contact;
console.log(telephone)  // 181818

const book1 = {
    title: 'Shawshank Redemption',
    author: 'Steven King',
    publisher: {
        name: 'Penguin'
    }
}

const book2 = {
    title: 'Fried Green Tomatoes',
    author: undefined,
    publisher: {
        name: undefined
    }
}

const { name: publisherName = 'Unknown' } = book1.publisher;
const { name: publisherName2 = 'Unknown' } = book2.publisher;

console.log(`${book1.title} is published by ${publisherName}`)
console.log(`${book2.title} is published by ${publisherName2}`)