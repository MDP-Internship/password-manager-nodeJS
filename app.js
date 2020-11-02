var storage = require("node-persist");
var argv = require("yargs")
  .command('create', 'yeni hesap oluşturur', function (yargs) {
    yargs
      .options({
        name: {
          demand: true,
          description: "Hesap Adı (Facebook, Twitter, Linkedin",
          alias: "n",
          type: "string",
        },
        username: {
          demand: true,
          description: "Hesabın kullanıcı adı",
          alias: "u",
          type: "string",
        },
        password: {
          demand: true,
          description: "Hesabınızın şifresi",
          alias: "p",
          type: "string",
        },
      })
      .help("help");
  })
  .command('get', "hesap bilgilerini görüntülemeyi sağlar", function(yargs){
    yargs.options({
        name: {
          demand: true,
          description: "adınızı gireceğiniz arguman",
          alias: "n",
          type: "string",
        },
      })
      .help("help");
  })
  .help("help").argv;
storage.initSync();

function createAccount(account) {
  //önceki kayıtları al
  var accounts = storage.getItem("accounts");
  //eğer önceki kayıt yoksa array oluştur
  if (typeof accounts === "undefined") {
    accounts = [];
  }
  //account verilerini array içine kaydet
  accounts.push(account);

  //setItem kalıcı olarak kaydet
  storage.setItem("accounts", accounts);
  return account;
}

function getAccount(accountName) {
  //getItem ile verileri getirmek ()

  var accounts = storage.getItem("accounts");
  var matchedAccount;

  // forEach ile kayıtları dolaşarak accountName bulmak
  accounts.forEach(function (account) {
    if (account.name === accountName) {
      matchedAccount = account;
    }
  });

  //return
  return matchedAccount;
}

var command = argv._[0];
console.log(command);

if (
  command === 'create' && typeof argv.name !== 'undefined' && argv.name.length > 0 && typeof argv.username !== 'undefined' && argv.username.length > 0 && typeof argv.password !== 'undefined' && argv.password.length > 0
) {
  var createdAccount = createAccount({
    name: argv.name,
    username: argv.username,
    password: argv.password,
  });
  console.log('Hesap Oluşturuldu...');
 
}
else if (command === 'get' && typeof argv.name !== 'undefined' && argv.name.length > 0 ) {
     var account =  getAccount(argv.name);
     if (typeof account !== 'undefined') {
         console.log(account);
     }
     else{
         console.log("Aradığınız kayıt bulunamamıştır...");
     }
}
else{
    console.log("lütfen geçerli bir komut giriniz");
}

/* createAccount({
  name: "Twitter",
  username: "foguz",
  password: "ıryıorıyro",
}); */

/* var linkedinAccount = getAccount("Linkedin");
console.log(linkedinAccount) */

/* // setİtem (key,value) sistteme verileri set etmek amacıyla kullanılıyor. 
//storage.setItemSync("name","abdullah");
storage.setItem("person",{
    status : true,
    password : 123,
    username : "aoguz",
    permission : "full-access"
})


// getItem(key)  setItem ile tanımlanan verileri çekmek amacıyla kullanılır
//var name = storage.getItem("name")
//console.log(name);

var person = storage.getItem("person");
console.log(person); */
