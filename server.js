const venom = require('venom-bot');
const menssageController = require("./controllers/messageController")
const mysql = require("./database/instances/mysql")
const fs = require('fs');
const express = require("express")
const http = require("http")
const path = require("path")

const app = express()
const server = http.createServer(app)

app.use(express.static(path.resolve("public")))

try {
  fs.unlink('./public/out.png', function (err){
    if (err) {
      console.error(err)
    }
    console.log('Arquivo deletado!');
  })
  
  fs.rm("./tokens", { recursive: true }, (err) => { 
    if (err) { 
      console.error(err); 
    } 
    else { 
      console.log("Recursive: Directory Deleted!"); 
    } 
  })
}
catch (err) {
  console.log("Inicialização Limpa")
}

venom
.create(
  'sessionName',
  (base64Qr, asciiQR, attempts, urlCode) => {
    console.log(asciiQR); // Optional to log the QR in the terminal
    var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = new Buffer.from(matches[2], 'base64');

    var imageBuffer = response;
    require('fs').writeFile(
      './public/out.png',
      imageBuffer['data'],
      'binary',
      function (err) {
        if (err != null) {
          console.log(err);
        }
      }
    );
  },
  undefined,
  { logQR: false,
    multidevice: true,
    handless: false,
  }
)
.then((client) => {
  start(client);
})
.catch((erro) => {
  console.log(erro);
});



function start(client) {
  //mysql.sync()
  client.onMessage( async (message)  => {
    if (message.isGroupMsg === false && message.from === "558183335066@c.us") {
        try {
            const reponse = await menssageController.handleResponse(message)
            reponse.forEach(response => {
            client.sendText(message.from, response)
            });
            console.log("feito")
        }
        catch (err) {
            console.log(err)
        }
    }
  });
}

app.use("/qrcode" , (req, res) => {
  res.sendFile(path.resolve("public" , "out.png"))
 })

app.use("/" , (req, res) => {
  res.sendFile(path.resolve("public" , "index.html"))
 })

 

server.listen(3000)
