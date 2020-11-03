var storage = require("node-persist");
var crypto = require("crypto-js");
var argv = require("yargs")
  .command("create", "yeni hesap oluşturur", function (yargs) {
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
        masterPassword: {
          demand: true,
          description: "işlem yapmak için gerekli olan şifre",
          alias: "m",
          type: "string",
        },
      })
      .help("help");
  })
  .command("get", "hesap bilgilerini görüntülemeyi sağlar", function (yargs) {
    yargs
      .options({
        name: {
          demand: true,
          description: "adınızı gireceğiniz arguman",
          alias: "n",
          type: "string",
        },
        masterPassword: {
          demand: true,
          description: "işlem yapmak için gerekli olan şifre",
          alias: "m",
          type: "string",
        },
      })
      .help("help");
  })
  .help("help").argv;
storage.initSync();

function createAccount(account, masterPassword) {
  //önceki kayıtları al
  /*  var accounts = storage.getItem("accounts");
  //eğer önceki kayıt yoksa array oluştur
  if (typeof accounts === "undefined") {
    accounts = [];
  } */
  //getAccount

 var getAccountObject = getAccounts(masterPassword);

  //account verilerini array içine kaydet
  getAccountObject.push(account);

  //setItem kalıcı olarak kaydet
  /*  storage.setItem("accounts", accounts); */
  // saveAcccount
  saveAccount(getAccountObject,masterPassword)

  return account;
}

function saveAccount(accounts,masterPassword) {
  // encrypt
  var encryptedAccount = crypto.AES.encrypt(
    JSON.stringify(accounts),
    masterPassword
  );

  //setİtem

  var savedAccount = storage.setItem(encryptedAccount, masterPassword);
  // return account
  return savedAccount;
}

function getAccounts(masterPassword) {
  // getItem
  var encryptedAccount = storage.getItem("accounts");
  var accounts = [];
  // decrtypt

  if (typeof encryptedAccount !== "undefined") {
    var bytes = crypto.AES.decrypt(encryptedAccount, masterPassword);
    accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));

  }
  console.log(accounts);
  // return account array
  return accounts;
}

function matchAccount(accountName, masterPassword) {
  //getItem ile verileri getirmek ()

  var getAccountItem = getAccounts(masterPassword);
  var matchedAccount;

  // forEach ile kayıtları dolaşarak accountName bulmak
  getAccountItem.forEach(function (account) {
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
  (command === "create" &&
    typeof argv.name !== "undefined" &&
    argv.name.length > 0 &&
    typeof argv.username !== "undefined" &&
    argv.username.length > 0 &&
    typeof argv.password !== "undefined" &&
    argv.password.length > 0,
  typeof argv.masterPassword !== "undefined" && argv.masterPassword.length > 0)
) {
  createAccount(
    {
      name: argv.name,
      username: argv.username,
      password: argv.password,
    },
    argv.masterPassword
  );
  console.log("Hesap Oluşturuldu...");
} else if (
  command === "get" &&
  typeof argv.name !== "undefined" &&
  argv.name.length > 0,  typeof argv.masterPassword !== "undefined" && argv.masterPassword.length > 0
) {
  var account = matchAccount(argv.name, argv.masterPassword);
  if (typeof account !== "undefined") {
    console.log(account);
  } else {
    console.log("Aradığınız kayıt bulunamamıştır...");
  }
} else {
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
