const dotenv = require('dotenv');
dotenv.config();
var Path = require('path');
const { get, post } = require("../../controllers/utils/UtilRequest")

const confEnv = process.env;
const base_url = process.env.Z_API_BASE_URL;
const token = process.env.Z_API_CLIENT_TOKEN;


exports.sendMessage = async (params) => {

    /* 
        params:

        {
           "phone": "{{phone}}",
            "message": "Assim como as letras do teclado os emoji's 🥳 também são caracteres. Muito massa né? 😎👏 veja os emojis em https://getemoji.com" 
        }
    */

    return new Promise(async (resolve, reject) => {

        const { instanciaId, instanciaToken, phone, message } = params;

        if (!phone) {
            console.log("\r\n Favor informe o numero de whatsapp (destinatário). ")
            resolve(false)
            return;
        }

        if (!message) {
            console.log("\r\n Favor informe o texto da mensagem. ")
            resolve(false)
            return;
        }

        var url = base_url + 'instances/' + instanciaId + '/token/' + instanciaToken + '/send-text';

        var result = await post(url, params);

        resolve(result)


    })


}


exports.sendMsgMedia = async (params, type) => {

    /* 
        params:

        {
           "phone": "{{phone}}",
            "message": "Assim como as letras do teclado os emoji's 🥳 também são caracteres. Muito massa né? 😎👏 veja os emojis em https://getemoji.com" 
        }
    */

    return new Promise(async (resolve, reject) => {

        const { instanciaId, instanciaToken, phone, message } = params;

        if (!phone) {
            console.log("\r\n Favor informe o numero de whatsapp (destinatário). ")
            resolve(false)
            return;
        }

        if (!type) {
            console.log("\r\n Favor informe o tipo de arquivo a ser enviado. ")
            resolve(false)
            return;
        }

        /* tipo de mensagem */
        switch (type) {

            case 'image':

                var { image } = params
                /* retornar a extenção doa rquivo */
                var ext = null;
                if (image) {
                    ext = Path.extname(Url.parse(image).pathname).replace('.', '');
                } else {

                    console.log("\r\n Parametro de arquivo inexistente (document), favor verique.")
                    resolve(false);
                }

                var extList = ["doc", "docx", "xls", "xlsx"];

                var exist = extList.filter((item) => {

                    return item == ext
                })

                if (exist.length > 0) {

                    route = 'send-document/' + ext

                } else {

                    console.log("\r\n Extenção do arquivo não aceitável para envio.")
                    resolve(false);
                }



                break;
            case 'document':

                var { document } = params
                /* retornar a extenção doa rquivo */
                var ext = null;
                if (document) {
                    ext = Path.extname(Url.parse(document).pathname).replace('.', '');
                } else {

                    console.log("\r\n Parametro de arquivo inexistente (document), favor verique.")
                    resolve(false);
                }

                var extList = ["doc", "docx", "xls", "xlsx"];

                var exist = extList.filter((item) => {

                    return item == ext
                })

                if (exist.length > 0) {

                    route = 'send-document/' + ext

                } else {

                    console.log("\r\n Extenção do arquivo não aceitável para envio.")
                    resolve(false);
                }



                break;
            case 'audio':

                var { audio } = params
                /* retornar a extenção doa rquivo */
                var ext = null;
                if (audio) {
                    ext = Path.extname(Url.parse(audio).pathname).replace('.', '');
                } else {

                    console.log("\r\n Parametro de arquivo inexistente (document), favor verique.")
                    resolve(false);
                }

                var extList = ["mp3", "wav", "ogg", "oga"];

                var exist = extList.filter((item) => {

                    return item == ext
                })

                if (exist.length > 0) {

                    route = 'send-audio'

                } else {

                    console.log("\r\n Extenção do arquivo não aceitável para envio.")
                    resolve(false);
                }

                break;

            case 'video':

                var { video } = params
                /* retornar a extenção doa rquivo */
                var ext = null;
                if (video) {
                    ext = Path.extname(Url.parse(video).pathname).replace('.', '');
                } else {

                    console.log("\r\n Parametro de arquivo inexistente (document), favor verique.")
                    resolve(false);
                }

                var extList = ["mp4", "avi"];

                var exist = extList.filter((item) => {

                    return item == ext
                })

                if (exist.length > 0) {

                    route = 'send-video'

                } else {

                    console.log("\r\n Extenção do arquivo não aceitável para envio.")
                    resolve(false);
                }

                break;
            default:

                resolve(false);

        }

        var url = base_url + 'instances/' + instanciaId + '/token/' + instanciaToken + '/' + route;

        var result = await post(url, params);

        resolve(result)


    })


}