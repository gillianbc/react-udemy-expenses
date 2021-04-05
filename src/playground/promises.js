const promise = new Promise((resolve, reject) => {
    console.log('Thinking')
    // setTimeout(() => {
    //     resolve("Three - The promise resolved and this message was returned")
    // }, 5000)
    reject("Something bad happened")
})
console.log('One')

// Register a callback to run when the promise is resolved
promise.then(data => {
    console.log('A-', data)
}).catch((error) => {
    console.log('A-', error)
})

// Register another callback to run when the promise is resolved
// i.e. we can do as many things as we want with a resolved promise
promise.then(data => {
    console.log('B-', data)
}).catch((error) => {
    console.log('B-', error)
})

console.log('Two')
// Alternative to catch syntax - a second callback function arg
promise.then(data => {
    console.log('B-', data)
}, error => {
    console.log('C ', error)
})