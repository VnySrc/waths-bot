const clientActions = require("../database/db.js")

const messageController = {
    handleResponse: async (message) => {
      //try {
            const clientPhase = await clientActions.getClientPhase(message.from, message.body) // retorna a fase que o cliente está
            const clientCollection = await clientActions.getClientCollection(message.from) // retorna a function da coleção que o cliente está, ela recebe (fase do cliente, menssagem)
        console.log(clientCollection)
            const clientResponse = await clientCollection(message.from, clientPhase, message.body) // ultiliza a função para executar as funções da fase e retornar a menssagem da fase
        console.log(clientResponse)
            return clientResponse // retorna resposta para o cliente
        //}
        //catch {
        //return "Informe uma opção válida"
        //}
         
    }
}

module.exports = messageController