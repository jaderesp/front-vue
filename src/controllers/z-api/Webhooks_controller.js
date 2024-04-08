"use strict"


// documentação de webhooks z-api: leia: https://developer.z-api.io/webhooks/on-message-received#response

/* status dea instancia 

    onConnected:{

        "type": 'ConnectedCallback',
        "connected": true,
        "momment": 26151515154,
        "instanceId": instance.id,
        "phone": "número",,
        "instanceId": "instance.id"

    }

    or 

        onDisconnected:{

        "momment": 1580163342,
        "error": "Device has been disconnected",
        "disconnected": true,
        "type": "DisconnectedCallback",
        "instanceId": "instance.id"
}

*/
module.exports.instanceStatus = async (received) => {

    return new Promise(async (resolve, reject) => {




    })

}

/* nova mensagem recebida (on-message-received) */
module.exports.receivedMessage = async (received) => {

    return new Promise(async (resolve, reject) => {




    })

}

/* status da mensagem enviada (on-message-send) */
module.exports.messageDelivery = async (received) => {

    return new Promise(async (resolve, reject) => {




    })

}

/* informações de presence (status do contato) */
module.exports.recevedPresence = async (received) => {

    return new Promise(async (resolve, reject) => {




    })

}