const readXlsxFile = require('read-excel-file/node')
const contatoMod = require("../../models/bd/Contato_model");
const sesssion = require('../../models/front/Sessao_model');
const contatoApi = require("../../controllers/api/ContatoApi_controller")
const etiquetaRelMod = require('../../models/bd/EtiquetaRel_model');

const confEnv = process.env;

var invalids = 0;
var processing = 0;
var saveds = 0;

module.exports.xslxImport = async (formVars, dir, typeImport, socket) => {

    return new Promise(async (resolve, reject) => {

        if (!dir) resolve(false);

        var arrObj = [];

        readXlsxFile(dir).then(async (rows) => {
            // `rows` is an array of rows
            // each row being an array of cells.

            //console.log("\r\n Conteudo do cabeçalho do arquivo: ", rows[0]);
            //console.log("\r\n Conteudo das variáveis (parametros POST): ", formVars);


            // exibir restante das linhas (sem cabeçalho)
            for (var i = 1; i < rows.length; i++) {


                let obj_ = {};

                for (var y = 0; y < rows[i].length; y++) {

                    console.log("\r\n Itens do laço: " + rows[0][y], rows[i][y]);

                    if (!rows[0][y].toString()) continue;
                    obj_[rows[0][y].toString()] = rows[i][y].toString();


                }

                arrObj.push(obj_);

            }

            if (typeImport) {

                await this.saveImport(formVars, arrObj, socket);

            }

            resolve(arrObj);
            return;


        })
    })


}



module.exports.saveImport = async (formVars, dados, socket) => {

    return new Promise(async (resolve, reject) => {

        if (!dados) resolve(false);

        var { session_id, use_all_session, id_etiq } = formVars;

        let sessionData;

        if (session_id) {

            sessionData = await sesssion.get({ 'id_sess': session_id });

        }

        let id_conta = sessionData[0].id_conta;
        let sessao = sessionData[0].nomeApi_sess;

        console.log("\r conteudo dados: ", dados);

        /* validar se o cabeçhalho do xml está correto
            padrão:   nome | whatsapp
        */

        if (data.length > 0) {

            var nomeIndex = data[0].hasOwnProperty("nome") ? true : false;
            var foneInex = data[0].hasOwnProperty("whatsapp") ? true : false;

            if (nomeIndex == false) {

                socket.emit("progressImport", { "error": 'formato do cabeçalho do arquivo é inválido. (campo nome)' });

                resolve(false); return;
            }

            if (nomeIndex == false) {

                socket.emit("progressImport", { "error": 'formato do cabeçalho do arquivo é inválido. (campo whatsapp)' });

                resolve(false); return;
            }

        }

        /* socket de progresso da importação */
        //socket.emit("progressImport", { "total": dados.length, "processing": 0, "saved": 0, "invalids": 0 })

        let interv = setInterval(async () => {

            /* socket de progresso da importação */
            socket.emit("progressImport", { "total": dados.length, "processing": processing, "saved": saveds, "invalids": invalids })

            if (dados.length == processing) {
                clearInterval(interv);
            }

        }, 1000)



        var res = {};

        for (var i = 0; i < dados.length; i++) {

            let DDD = dados[i].whatsapp.toString();
            let number = dados[i].whatsapp.toString() + "@c.us";

            /* add codigo Brasil caso não tenha codigo do país */
            if (number.substr(0, 2) !== "55" && number.length < 17) {

                number = "55" + number;

            }


            let valid = false;

            /* verificar se numero é whatsapp e testar com e sem nono digito, e devolver */
            var verify = await contatoApi.verifyNumberWhatsapp(sessao, number)

            if (verify.valid == true) {

                number = verify.number;
                valid = true;
            }

            processing = processing + 1

            if (valid == true) {

                let contato = {
                    'id_conta': id_conta,/* pegar id da conta pra adicionar aqui. */
                    'id_sess': session_id,
                    'use_all_session': use_all_session,
                    'nome': dados[i].nome,
                    'nome_verificado': "",
                    'number': number,
                    'profilePic': confEnv.API_URL + "/files/wapi/download/avatar/default.png".toString(),
                    'regiao': DDD,
                    'isContact': "false",
                    'isGroup': "false",
                    'isMe': "false",
                    'status': 'ativo'
                };

                /* verificar se contato já existe */
                console.log("\r\n Contato sendo importado: ", contato);
                res = await contatoMod.upsert(contato, { 'id_conta': id_conta, 'number': number });

                if (res) {

                    saveds = saveds + 1;

                    /* relacionar a etiqueta selecionada */
                    let result = await etiquetaRelMod.upsert({ "id_etiq": id_etiq, "number": number }, { "id_etiq": id_etiq, "number": number });
                    console.log("\r\n Contato da importação relacionado a etiqueta: ", result);

                }

            } else {

                invalids = invalids + 1;
                console.log("\r\n Número " + number + " é inválido, não será importado.", verify);

            }



        }


        resolve(res);
    })

}