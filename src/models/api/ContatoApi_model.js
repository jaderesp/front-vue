'use strict'
/* modal responsável por funcionalidades de conexao com a api para:

    controles de sessão front --> api
*/

let utils = require('../../controllers/utils/Utils_controller');

/* retorna contatos diretamente do whatsapp (api) */
module.exports.getContatoSession = async (params) => {

    return new Promise(async (resolve, reject) => {

        if (!params) {
            resolve(false);
        }

        let rotaUrl = '/wp/getAllContacts';

        let retorno = await utils.sendWpp(rotaUrl, params);

        resolve(retorno);

    });

}

/* verificar se o numbero é watsapp whatsapp (api) */
module.exports.verifyNumberWpp = async (params) => {

    /* exemplo de retorno:
    
        @ {
        "instancia": "jmsoft-00000000001",
        "retorno": {
            "id": {
                "server": "c.us",
                "user": "5511958249537",
                "_serialized": "5511958249537@c.us"
            },
            "status": 200,
            "isBusiness": false,
            "canReceiveMessage": true,
            "numberExists": true
        }
    }

        ou

        {
            "instancia": "jmsoft-00000000001",
            "retorno": "Ocorreu um erro ao efetuar a operação, tente novamente: Error: 404"
        }

    */

    return new Promise(async (resolve, reject) => {

        if (!params) {
            resolve(false);
        }

        let rotaUrl = '/wp/check_number';

        let retorno = await utils.sendWpp(rotaUrl, params);

        resolve(retorno);

    });

}