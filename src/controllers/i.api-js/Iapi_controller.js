'use strict'
const iapi = require('../../models/i.api-js/Iapi_model');
const wapi = require("../../controllers/api/MensagemApi_controller");
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const { messageFileExist } = require('../utils/Utils_controller');


const { IAPI_URL } = process.env;




module.exports.receive = async (sessionName, number, content) => {

    return new Promise(async (resolve, reject) => {



        if (!sessionName) {
            resolve(false);
        }

        if (!number) {
            resolve(false);
        }

        if (!content) {
            resolve(false);
        }

        /* 
            parametros iapi
            rota: /chatContext
            {
                "chatId":"5516997141457_18913663588@c.us",
                "message":"cartão.",
                "model":"gpt-3.5-turbo"   
            }
        
        */

        var params = {
            "chatId": number,
            "message": content,
            "model": "gpt-3.5-turbo-0613"
        };

        console.log("\r\n Mensagem para IAPI-JS: ", params);

        var responseText = await sendChatContext(params);

        if (!responseText) {

            console.log("\r\n nenhum dado de mensagem foi obtida via IAPI: ", responseText);
            resolve(false);
            return;
        } else if (typeof responseText === "string" && responseText) {

            /* enviar mensagem para o contato via whatsapp */
            /* 
                params: { 'instancia': sessionName, 'number': number, 'msg': msg };
            */
            var message = {
                'instancia': sessionName,
                'number': number,
                'msg': responseText
            }

            var res = await wapi.sendMensagem(message);

            console.log("\r\n Resultado de envio de mensagem da IAPI para whatsapp: ", res);

            resolve(res);
        }


    })

}

/* função http request */
async function sendChatContext(params) {

    return new Promise(async (resolve, reject) => {

        try {

            const response = await axios.post(IAPI_URL + "/chatContext", params);

            if (response.status === 200) {
                console.log('Mensagem enviada com sucesso!');

                var resposta = response.data ? response.data.retorno.result : [];
                var indice = (resposta.length - 1);
                var msgReceived = resposta[indice];

                //console.log("\r\n Resposta da IAPI: " + indice.toString(), resposta);

                if (msgReceived) {

                    resolve(msgReceived);
                    return;

                } else {
                    resolve(false);
                    return;
                }

            } else {
                console.error('Ocorreu um erro ao enviar a mensagem:', response.data);
                resolve(false);
                return;
            }
        } catch (error) {
            console.error('Erro ao chamar a API:', error.message);
            resolve(false);
            return;
        }

    });
}