'use strict'
const axios = require('axios')


exports.get = async (url) => {


    return new Promise(async (resolve, reject) => {

        if (!url) {
            console.log("\r\n Url não informada para a requisção.")
            resolve(false)
        }

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'Client-Token': token.toString()
            }
        };

        try {

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    var res = response.data;
                    resolve(data);
                })
                .catch((error) => {
                    console.log(error);
                    resolve(false);
                });
        } catch (error) {

            console.log("\r\n Ocorreu um erro ao se comunicar com api: ", error.toString())
            resolve(false);
            return;

        }

    });

}

/* fazer chamadas as rotas do proprio front (local) */
exports.post = async (url, params) => {

    return new Promise(async (resolve, reject) => {
        /* chamar rota */
        

        let retorno = await axios.post(url, params)
            .then(res => {
                console.log(`statusCode: ${res.status}`);
                console.log(res.data);
                return res.data;
            })
            .catch(error => {
                console.error(error)
                return false;
            });


        if (retorno) {

            resolve(retorno);

        }


    });
}