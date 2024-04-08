const path = require('path');
const fs = require('fs');

const xlsx = require("./XlsxImports");


const Busboy = require('busboy');
const { logger, pipelineAsync } = require('./UtilHandler');

var formidable = require('formidable');
const extend = require('extend');
const qs = require('node:querystring');


const FILE_EVENT_NAME = 'file-uploaded'

class UploadHandler {
    #io
    #socketId
    formVars

    constructor(io, socketId, formVars) {
        this.#io = io
        this.#socketId = socketId
        this.formVars = formVars
    }

    registerEvents(headers, onFinish) {
        const busboy = Busboy({ headers });

        busboy.on('file', this.#onFile.bind(this));
        busboy.on('finish', onFinish);

        return busboy
    }

    #handleFileBytes(filename) {

        async function* handleData(data) {

            //console.log(data)

            for await (const item of data) {
                const size = item.length
                // logger.info(`File [${filename}] got ${size} bytes to ${this.#socketId}`)
                this.#io.to(this.#socketId).emit(FILE_EVENT_NAME, size)

                yield item
            }
        }

        return handleData.bind(this)
    }

    async #onFile(fieldname, file, filename) {


        //  console.log(filename);

        filename = filename.filename;

        console.log("\r\n ===============> CONTEUDO DO ARQUIVO: " + fieldname, filename);

        const saveTo = './public/files/uploads/importar/' + filename;
        logger.info('Uploading: ' + saveTo);
        await pipelineAsync(
            file,
            this.#handleFileBytes.apply(this, [filename]),
            fs.createWriteStream(saveTo),
        )

        if (filename.indexOf(".xls") != -1 || filename.indexOf(".xlsx") != -1) {

            var request = this.req;
            var formVars = { "session_id": 1, "id_etiq": 9 };
            formVars = this.formVars;
             console.log(formVars);


            /* se for xlsx fazer leitura */
            var xlsObj = await xlsx.xslxImport(formVars, saveTo, "contatos", this.#io.to(this.#socketId));

            /* socket de progresso da importação */
            this.#io.to(this.#socketId).emit("finished", { "registros": xlsObj.length })

            // console.log("\r\n Dados da importação: ", xlsObj);

        }

        logger.info(`Arquivo: [${filename}] Upload finalizado!`)

        //socket info sucsses
    }




}





module.exports = UploadHandler