'use strict'
/* modal responsável por funcionalidades de conexao com a api para:

    controles de sessão front --> api
*/

let utils = require('../../controllers/utils/Utils_controller');


module.exports.sendMensagem = async (params) => {

    return new Promise(async (resolve, reject) => {

        if (!params) {
            resolve(false);
        }
        //console.log("Enviar mensagem na model: ", params);

        /* verificar se envia mensagem de texto ou com arquivo */
        let fileExist = params.arquivo ? true : false;

        let rotaUrl = '/wp/sendMsg';

        if (fileExist == true) {
            rotaUrl = '/wp/sendMedia';
        }

        if (params.hasOwnProperty("buttons")) {

            rotaUrl = '/wp/sendButtons';

        }

        console.log("Enviando mensagem de arquivo: rota: " + rotaUrl, params);

        /* converter formatação da mensagem de html para whatsapp */
        if (params.msg) {

            params.msg = await utils.setupMessage(params.msg, 'wp');

        }

        let retorno = await utils.sendWpp(rotaUrl, params);

        resolve(retorno);

    });

}


module.exports.sendReactToMensagem = async (params) => {

    return new Promise(async (resolve, reject) => {

        if (!params) {
            resolve(false);
            return;
        }

        if (!params.msgId) {
            resolve(false);
            return;
        }

        if (!params.emoji) {
            resolve(false);
            return;
        }

        let rotaUrl = '/wp/sendReactToMessage';


        let retorno = await utils.sendWpp(rotaUrl, params);

        resolve(retorno);

    });

}

