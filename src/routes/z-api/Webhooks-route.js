'use strict'

/* configuração de todos os webhooks (endpoints):

    👉🏻 onMessage
    👉🏻 onAck
    👉🏻 onStateChange
*/

const webHookCtr = require('../../controllers/z-api/Webhooks_controller');


module.exports.messageDelivery = async (req, res) => {

    let message = req.body;
    console.log("\r\n STATUS DA MENSAGEM CHEGANDO...", message)

    let retorno = await webHookCtr.messageDelivery(message);

    res.status(200).send(retorno);

}

module.exports.ReceivedMessage = async (req, res) => {

    let message = req.body;
    console.log("\r\n MENSAGEM CHEGANDO...", message)

    let retorno = await webHookCtr.receivedMessage(message);

    res.status(200).send(retorno);

}

/* status da mensagem lida/recebida etc.. */
module.exports.recevedPresence = async (req, res) => {

    //let instancia = req.body.instancia;
    let ack = req.body;

    console.log("Status do contato no chat: ", ack);
    let retorno = await webHookCtr.recevedPresence(ack);

    res.status(200).send({ 'retorno': retorno });

}

/* receber status da conexão */
module.exports.instanceStatus = async (req, res) => {

    let status = req.body;

    console.log("Status da conexão: ", status);

    let retorno = await webHookCtr.instanceStatus(status);

    res.status(200).send({ 'retorno': retorno });

}
