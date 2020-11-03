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
          description: "hesabın adını gireceğiniz arguman",
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
var command = argv._[0];
console.log(command);

if (
  command === "create" &&
  typeof argv.name !== "undefined" &&
  argv.name.length > 0 &&
  typeof argv.username !== "undefined" &&
  argv.username.length > 0 &&
  typeof argv.password !== "undefined" &&
  argv.password.length > 0 &&
  typeof argv.masterPassword !== "undefined" &&
  argv.masterPassword.length > 0
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
  argv.name.length > 0 &&
  typeof argv.masterPassword !== "undefined" &&
  argv.masterPassword.length > 0
) {
  var account = matchAccount(argv.name, argv.masterPassword);
  console.log(account);
  if (typeof account !== "undefined") {
    console.log(account);
  } else {
    console.log("Aradığınız kayıt bulunamamıştır...");
  }
} else {
  console.log("lütfen geçerli bir komut giriniz");
}

function createAccount(account, masterPassword) {
  var getAccountObject = getAccounts(masterPassword);

  //account verilerini array içine kaydet
  getAccountObject.push(account);

  saveAccount(getAccountObject, masterPassword);

  return account;
}

function saveAccount(accounts, masterPassword) {
  // encrypt
  var encryptedAccount = crypto.AES.encrypt(
    JSON.stringify(accounts),
    masterPassword
  );

  //setİtem

  storage.setItem("accounts", encryptedAccount.toString());
  // return account
  return accounts;
}

function getAccounts(masterPassword) {
  // getItemSync accounts verisini cek..
  var encryptedAccounts = storage.getItem("accounts");
  console.log("enc" + encryptedAccounts);
  var accounts = [];

  // decrypt
  if (typeof encryptedAccounts !== "undefined") {
    var bytes = crypto.AES.decrypt(encryptedAccounts, masterPassword);
    console.log(bytes);
    accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
  }

  // return accounts array
  return accounts;
  // return
}

function matchAccount(accountName, masterPassword) {
  var accounts = getAccounts(masterPassword);

  var matchedAccount;

  // forEach butun kayitlari dolasarak accountName bulunacak..
  accounts.forEach(function (account) {
    if (account.name === accountName) {
      matchedAccount = account;
    }
  });
  return matchedAccount;
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
