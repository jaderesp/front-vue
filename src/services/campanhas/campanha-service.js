'use strict'
const util = require('../../controllers/utils/Utils_controller');
const formatMsg = require('../../controllers/utils/CompareStr');
const extend = require('extend');
const spinner = require('ora');
spinner.color = 'yellow';
spinner.text = 'Loading rainbows';

let contExec = 0; /* contagem de execuções consecutivas */

/* 

    status de campanha:
        ativo (criada/agendada)
        executando  (atingiu agendamento/formatação de mensagens)
        andamento (enviando mensagens)
        concluido (finalizado)


*/


module.exports.onCampanha = async function () {

    return new Promise(async (resolve, reject) => {

        spinner("INICIANDO O EXECUÇÃO DE TAREFAS AGENDADAS \r").succeed();

        contExec = contExec + 1;


    });

}

/* enviar mensagem a cada  x minutos (promise) */
module.exports.sendAsyncMessage = async (message) => {

    return new Promise(async (resolve, reject) => {
        /* mensagem será enviada de 1 a 6 minutos de intervalo aleatoriamente */
        let minutos = Math.floor(Math.random() * 2)/* converter minutos em milisegundos */
        let milisegundos = minutos * 1000 * 60;

        spinner("📥Enviar mensagem em " + minutos.toString() + " minuto(s). \r").succeed();
        setTimeout(async () => {
            /* executar a cada x minutos (entre 1 e 6 ) */

            let result = await this.send(message);

            console.log("👉🏻 Retorno de envio de mensagem (campanha): ", result);

            resolve(result);

        }, milisegundos);


    });


}


module.exports.send = async function (params) {

    return new Promise(async (resolve, reject) => {
        /* enviar mensagem para api */

        try {
            let retorno = await mensagemApi.sendMensagem(params);

            if (retorno) {
                resolve(retorno);
                return;
            }
        } catch (error) {

            /* se ocorrer alguma erro */
            resolve(false);
            return;
        }


    });

}