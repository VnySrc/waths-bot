const Client = require("../models/Client")
const clientServices = {
    findClient: async (client) => {
        const hasClient = await Client.findOne({where: {name: client}})
        return hasClient
    },

    addClient: async (client) => {
        try {
            await  Client.create({
                name: client,
                phase: 0,
                collection: "phases"
                })
        }
        catch (err) {
            console.log("Error no Teste Service" + err)
      }
    },
}


module.exports = clientServices

