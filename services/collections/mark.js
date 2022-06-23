const clientServices = require("../clientServices")
// message: messagem a ser retornada ao cliente nesta fase / exec: função a ser executada nesta etapa

const options = {
    "0": { // mensagem inicial
        message: ["Bem vindo à area de marcação, porfavor selecione uma das opções abaixo.\n 1-Marcar exame \n 2- Preços \n 3- Horarios"],
        exec: async (client) => {
            const hasClient = await clientServices.findClient(client)
            hasClient.phase = "0"
            await hasClient.save()
        }
    }, // a partir daqui ignore o 0 e tenha a posição do cliente
    "0.1": { 
        message: ["Bom dia! fase Help1"],
        exec: async (message) => {
            return
        }
    },
    "0.2": { 
        message: ["Bom dia! fase Help2"],
         exec: (message) => {
            return
        }
    },
    "0.3": { 
        message: ["Bom dia! fase Help3"],
         exec: (message) => {
            return
        }
    },
    "0.4": { 
        message: ["Bom dia! fase Help4"],
         exec: (message) => {
            return
        }
    },
    "0.1.1": { 
        message: ["Bom dia! fase Help 1 - 1"],
         exec: (message) => {
            return
        }
    },
    "0.1.2": { 
        message: ["Bom dia! fase Help3  1 - 2"],
         exec: (message) => {
            return
        }
    },
    "0.2.1": { 
        message: ["Bom dia! fase Help 2.4 1.1.3"],
         exec: (message) => {
            return
        }
    },
    "0.2.2": { 
        message: ["Bom dia! fase Help5 1.1.4"],
         exec: (message) => {
            return
        }
    },
    "0.3.1": { 
        message: "Bom dia! fase Help3 1.2.1",
         exec: (message) => {
            return
        }
    },
   "0.3.2": { 
        message: ["Bom dia! fase Help 1.2.3"],
         exec: (message) => {
            return
        }
    },
    "0.3.3": { 
        message: ["Bom dia! fase Help 1.2.4"],
         exec: (message) => {
            return
        }
    },
}
    

const collectionActions = (client, phase, message) => {
    try {
        console.log(phase)
        if (phase === "0" ) {
            options[phase].exec(client)
            return options[phase].message
        }
        options[phase].exec(message)
        return options[phase].message
    }
    catch {
        options["0"].exec(client)
        return options["0"].message
    }
   
}


module.exports = collectionActions