const dotenv = require('dotenv');
dotenv.config();
const { get, post } = require("../../controllers/utils/UtilRequest")

const confEnv = process.env;
const base_url = process.env.Z_API_BASE_URL;
const token = process.env.Z_API_CLIENT_TOKEN;


exports.getContactsPagination = async (params) => {

    /* 
        params:

        [
            {
                "name": "Nome e sobrenome do contato 1",
                "short": "Nome do contato 1",
                "notify": "Nome no Whatsapp 1",
                "vname": "Nome no vcard",
                "phone": "559999999999"
            }
        ]
    */

    return new Promise(async (resolve, reject) => {

        const { instanciaId, instanciaToken, pagei, pagef } = params;

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

        var pagiationRoute = "";
        if (pagei && pagef) {

            pagiationRoute = "?page=" + pagei + "&pageSize=" + pagef

        }

        var url = base_url + 'instances/' + instanciaId + '/token/' + instanciaToken + '/contacts' + pagiationRoute;

        var result = await post(url, params);

        resolve(result)


    })


}