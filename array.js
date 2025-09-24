// Імутабільність даних - це принцип(фп), у якому створенні дані неможливо змінити. 
// Замість зміни створюється їх нова копія.

const names = ['Artem', "Maksim", "Danil"]

function reportNames(names) {
    // Spread оператор - "распаковывает" (достает, копирует и тд.) все значения из массива или объекта
    const sortedNames = [...names];
    sortedNames.sort();
    console.log(sortedNames);
}
// reportNames(names);
console.log(names);

function getProductWithDiscount(product){
    const productWithDiscount = {...product, price: product.price * 0.8}
    //productWithDiscount.price *= 0.8;
    return productWithDiscount
}

const product = {
    name: "Product 1",
    price: 100
};

const productWithDiscount = getProductWithDiscount(product);
console.log(productWithDiscount);
console.log(product);

// Деструктаризация - это спецаильный синтаксис, который позволяет "распоковать" 
// объекты или массивы по переменным


const {price: productPrice, name} = product
console.log(productPrice, name)

const [name1, name2, name3] = names
console.log(name1, name2, name3)
