## Password Manager Uygulaması 

Password manager terminalden create komutu ile yazılan bir kodun şifrelenip log dosyasına kaydedilmesini sağlar. Get komutu ile de şiflenen veriler arka planda çözülüp kullanıcının önüne getirilir.



### Komutlar 

####  create 

Create komutu ile hesap oluşturulur. Girilmesi gereken parametreler :

    -- name (-n) : Hesabın adı(Linkedin,twitter, vb)

    -- username (-u) : Hesabın kullanıcı adı,

    -- password (-p) : Hesabın şifresi 

    -- masterPassword (-m) : hesabın masterpasswordu 

    Örnek : 

    node app.js create -n Linkedin -u test -p 12345 -m 12345

 ####  get

Get komutu ile log dosyasındaki verileri getiriyoruz. 

    -- name (-n): Hesabın adı(Linkedin,twitter, vb)
    -- masterPassword (-m) : hesabın masterpasswordu 

    Örnek : 
    node app.js get -n Linkedin -m 12345
    


Paketler: 

1-  [Node-persist](https://www.npmjs.com/package/node-persist) 


Bu paket ile uygulama içinde log olarak verileri kaydedebiliyoruz.

```javascript
const storage = require('node-persist')

storage.initSync() //node-persist kütüphanesini initialize ediyor.

// setİtem (key,value) sistteme verileri set etmek amacıyla kullanılıyor. 
storage.setItemSync("name","abdullah");


//getItem(key)  setItem ile tanımlanan verileri çekmek amacıyla kullanılır
var name = storage.getItem("name")
console.log(name);
```
2- [Yargs](https://www.npmjs.com/package/yargs) Yargs kütüphanesi ile terminal üzerinden işlemler oluşturabiliyoruz. 

```javascript
const argv = require('yargs')
.command(
[komut],[mesaj], [gerçekleştiğinde olacak fonksiyon]function(yargs){
    yargs.option({
        // bu kısımda belirlediğimiz logicleri yazacağız
    })
    }
).argv //ilgili argumanı alır 

```

3- [Crypto JS](https://www.npmjs.com/package/crypto-js)

Crypto ile almış olduğumuz verileri ilk olarak şifreleyip sonrasında şifrelediğimiz verileri çözebilme imkanı sağlar. 


```javascript
var crypto = require('crypto-js');

var key = '1';
var passMessage = 'şifrelenecek mesaj'


//encrypt şifreleme işlemi 
var cryptoMessage = crypto.AES.encrypt([mesaj],[key])


//decrypt şifre çözme işlemi

var bytes = crypto.AES.decrypt([şifrelenen mesaj], [key])
var decryptMessage = bytes.toString(crypto.enc.Utf8)

```





    

 

