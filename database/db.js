//services
const clientServices = require("../services/clientServices")


//collections
const phasesCollection = require("../services/collections/phases")
const helpCollection = require("../services/collections/help")

const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


const collectionTags = {
    1: "marcar",
    2: "price",
    3: "help",
}

const clientActions = {

    getClientPhase: async (client, message) => {
        try {
            const hasClient = await clientServices.findClient(client)
                if (!hasClient) {
                    const newClient = await clientServices.addClient(client)
                    return newClient.phase
                }
                else {
                    if ( hasClient.collection === "phases") {
                        if (isNumber(message)) {// so alterar a phase se for numero
                            hasClient.collection = collectionTags[parseInt(message)]
                            //hasClient.phase = 1 // checar
                            await hasClient.save()
                            return hasClient.phase
                        }
                        else{
                            return hasClient.phase
                        }   
                    }
                    else {
                        if (isNumber(message)) { // so alterar a phase se for numero
                        console.log("VEIO PARA O CERTO")
                        hasClient.phase +="."+message
                        await hasClient.save()
                        return  hasClient.phase
                        }
                        else {
                            return hasClient.phase
                        }
                    }
                }
            }
            catch (err) {
                console.log("Houve um erro no db: " + err)
            }
        },

    getClientCollection: async (client) => {
        try {                 
            const hasClient = await clientServices.findClient(client)

            switch (hasClient.collection) {
                case "phases":
                    console.log("CLIENTE TA NA COLLECTION PHASES")
                    return phasesCollection
                    break;
              case "help":
                console.log("CLIENTE TA NA COLLECTION HELP")
                    return helpCollection
                    break;
                default:
                console.log("CLIENTE TA NA COLLECTION DEFAULT")
                    return
                    break;
            } 
        }
        catch (err) {
            console.log("Houve um erro no db: " + err)
        }
        
    }

}


module.exports = clientActions