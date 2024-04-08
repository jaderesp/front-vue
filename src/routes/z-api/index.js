'use strict'

const webhooks = require('./Webhooks-route');



module.exports.routes = async (app) => {

    return new Promise(async (resolve, reject) => {
        /* WEBHOOKS - chamadas http-pages - front */
        app.post('/webhook/on-message-received', webhooks.ReceivedMessage);
        app.post('/webhook/on-whatsapp-message-status-changes', webhooks.messageDelivery);
        app.post('/webhook/on-webhook-connected', webhooks.instanceStatus);
        app.post('/webhook/on-whatsapp-disconnected', webhooks.instanceStatus);

        /* chamada para api para whatsapp */
        app.post('/api/sendMensagem', MensagemRoute.sendMensagem);

        /* reagir a mensagem */
        app.post('/api/sendReactToMensagem', MensagemRoute.sendReactToMensagem);

        /* contatos */
        app.post('/api/getContatoSession', ContatoRoute.getContatoSession);

        app.post('/api/logoff', wpRoute.logoff);

        resolve(app);

    });

}