const dotenv = require('dotenv');
dotenv.config();
const { get, post } = require("../../controllers/utils/UtilRequest")

const confEnv = process.env;
const base_url = process.env.Z_API_BASE_URL;
const token = process.env.Z_API_CLIENT_TOKEN;


exports.setInstance = async (params) => {

    /* 
        params:

        {
            "name": "Instancia Z-API - 9292812", (obrigatorio)
            "sessionName": "Testes testes",
            "deliveryCallbackUrl": "https://meuwebhook.com.br/delivery",
            "receivedCallbackUrl": "https://meuwebhook.com.br/receive",
            "disconnectedCallbackUrl": "https://meuwebhook.com.br/disconnected",
            "connectedCallbackUrl": "https://meuwebhook.com.br/connected",
            "messageStatusCallbackUrl": "https://meuwebhook.com.br/status"
        }
    */

    return new Promise(async (resolve, reject) => {

        const { name } = params;

        if (!name) {
            console.log("\r\n O campo name é obrigatório na geração da instancia. ")
            resolve(false)
            return;
        }

        var url = base_url + 'instances/integrator/on-demand';

        var result = await post(url, params);

        resolve(result)


    })


}

exports.getQrcode = async (params) => {

    return new Promise(async (resolve, reject) => {

        const { instanciaId, instanciaToken } = params;

        if (!instanciaId) {
            console.log("\r\n Informar o instanceId. ")
            resolve(false);
            return;
        }

        if (!instanciaToken) {
            console.log("\r\n Informar o instanceToken. ")
            resolve(false)
            return;
        }

        var url = base_url + 'instances/' + instanciaId + '/token/' + instanciaToken + '/qr-code/image';

        var result = await get(url);

        resolve(result)


    })


}

exports.disconnect = async (params) => {

    return new Promise(async (resolve, reject) => {

        const { instanciaId, instanciaToken } = params;

        if (!instanciaId) {
            console.log("\r\n Informar o instanceId. ")
        }

        if (!instanciaToken) {
            console.log("\r\n Informar o instanceToken. ")
        }

        var url = base_url + 'instances/' + instanciaId + '/token/' + instanciaToken + '/disconnect';

        var result = await get(url);

        resolve(result)


    })


}