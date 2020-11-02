
// yargs ile terminalden gönderilen işlemleri kendi hafızasında bir dizi halinde tutuyor.




const argv = require('yargs')
.command(
    'hello', 'kullanıcıları selamlar...',function (yargs) {
        yargs.options({
            name : {
                demand :true,
                description : 'adınızı gireceğiniz arguman',
                alias: 'n',
                type : 'string'
            },
            surname :{
                demand: true,
                description : 'soyadınızı gireceğiniz arguman',
                alias : 's',
                type : 'string'
            }
        }).help('help');
    }).help('help')
.argv;
/* console.log(argv._);
console.log(argv.name);
console.log(argv.surname);
 */
var command = argv._[0];

//verilern durumlara göre isim soyisim yada başka türden mesaj verdirme 


if (command ==='hello' && typeof argv.name != 'undefined' && typeof argv.surname != 'undefined') {
    console.log('Hello' + " " + argv.name + ' ' + argv.surname);
}
else if(command === 'hello'  && typeof argv.name != 'undefined'){
    console.log('Hello' + " " +argv.name);
}
else if(command === 'hello'){
    console.log("Hello World");
}














