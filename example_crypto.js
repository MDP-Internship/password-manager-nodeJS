var crypto = require('crypto-js');

var message = 'şifrelenecek mesaj';
var key  = '123abc';


//encrypt şifreleme işlemi 

var cryptoMessage  = crypto.AES.encrypt(message,key);
console.log('şifreli metin ' + cryptoMessage);




//decrypt   şifrelenmiş değişkeni çevirme işlemi 
var bytes = crypto.AES.decrypt(cryptoMessage,key) // ilk olarak byte türüne çeviriyor 
var decryptMessage = bytes.toString(crypto.enc.Utf8)  // byte türüne çevrilen 

console.log( 'şifrelenen mesaj --> s'+ decryptMessage);

