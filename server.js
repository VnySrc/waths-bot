const venom = require('venom-bot');
const menssageController = require("./controllers/messageController")
const mysql = require("./database/instances/mysql")

venom
  .create({
    session: 'session-name', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
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
