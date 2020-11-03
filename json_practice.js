var person ={
    name :'Abdullah',
    surname : 'Oguz'
}

console.log(person);
console.log(typeof person);

console.log('----')

var jsonObject = JSON.stringify(person) // objeyi json türüne çevirir
console.log(jsonObject),
console.log(typeof jsonObject);
console.log('----')


var reObject  = JSON.parse(jsonObject);

console.log(reObject);
console.log(typeof reObject);