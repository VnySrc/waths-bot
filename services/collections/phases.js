const clientServices = require("../clientServices")

const options = {
    "0": { 
        message: ["Para voltar ao menu inicial digite *Menu* a qualquer momento da conversa", "Olá Porfavor Escolha uma das alternativas \n 1 - Marcar Consulta \n 2- Preços \n Ajuda"],
        exec: async (client) => {
            const hasClient = await clientServices.findClient(client)
            hasClient.phase = "0"
            await hasClient.save()
        }
    }
   
}

const collectionActions = (client, phase, message) => {
    try {
        options[phase].exec(client)
        return options["0"].message
    }
    catch {
        options["0"].exec(client)
        return options["0"].message
    }
    
}

module.exports = collectionActions