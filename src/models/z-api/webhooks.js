const dotenv = require('dotenv');
dotenv.config();
const { get, post } = require("../../controllers/utils/UtilRequest")

const confEnv = process.env;
const base_url = process.env.Z_API_BASE_URL;
const token = process.env.Z_API_CLIENT_TOKEN;

exports.setWebHook = async (params, type) => {

    return new Promise(async (resolve, reject) => {

        const { instanciaId, instanciaToken, webhook } = params;

        if (!instanciaId) {
            console.log("\r\n Informar o instanceId. ")
        }

        if (!instanciaToken) {
            console.log("\r\n Informar o instanceToken. ")
        }

        var route = "";

        switch (type) {
            case 'MessageDelivery':

                route = 'update-webhook-delivery'

                break;

            case 'onMessage':

                route = 'update-webhook-received'
                break;

            case 'statusConn':

                route = 'update-webhook-disconnected'

                break;

            case 'ack': /* status da mensagem (enviada) */

                route = 'update-webhook-message-status'
                break;

            default:
                console.log("\r\nOpção inválida para gerar webhook.")
                resolve(false)
                return false

        }

        var url = base_url + 'instances/' + instanciaId + '/token/' + instanciaToken + '/' + route;

        var result = await post(url, { value: webhook });

        resolve(result)


    })


}