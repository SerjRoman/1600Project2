// fulfilled | rejected | pending

console.log('Hello')
const hello = "World"
const promise = new Promise(function(resolve, reject) {
    setTimeout(() => {
       console.log('5 seconds passed') 
       resolve({
            name: "Danil",
            price: "50 грн",
       })
    }, 5000);
})
promise.then( (data) => {
    console.log(data)
})