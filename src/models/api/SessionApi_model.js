'use strict'
/* modal responsável por funcionalidades de conexao com a api para:

    controles de sessão front --> api
*/

let utils = require('../../controllers/utils/Utils_controller');

module.exports.getStatus = async (instancia) => {

    return new Promise( async (resolve, reject) => {

        if(!instancia){
            resolve(false);
        }

        let retorno = await utils.sendWpp('/wp/status',{'instancia':instancia});

        resolve(retorno);

    });

}


module.exports.logoff = async (instancia) => {

    return new Promise( async (resolve, reject) => {

        if(!instancia){
            resolve(false);
        }

        let retorno = await utils.postIn('/wp/logoff',{'instancia':instancia});

        resolve(retorno);

    });

}


