// Імутабільність даних - це принцип(фп), у якому створенні дані неможливо змінити. 
// Замість зміни створюється їх нова копія.

const names = ['Artem', "Maksim", "Danil"]

console.log(names.map( () => {}))

function addName(names) {
    names.push("Yulia")
}

function sortNames(names) {
    names.sort()
}
sortNames(names)
// const names = ['Artem',"Danil", "Maksim" ]

function deleteLastName(names) {
    names.pop()
}

names.map( () => {

})
