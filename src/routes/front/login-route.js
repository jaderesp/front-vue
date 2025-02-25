'use strict'
let loginCtr = require('../../controllers/front/Login_controller');
const util = require('../../controllers/utils/Utils_controller');
let usuario = require('../../controllers/bd/Usuario_controller')

const base_url = util.baseUrl;

/* exibir pagina de login */
/* paginas http-front */
exports.login = async function (req, res) {

    console.log("rota login acionada...")


    /* criar um usuario padrão (só pra testes) */
    //await usuario.createDefaultUser();

    /* inicializar valores na pagina */
    let data = { instancia: '', qrcode: '----', status: false };
    let log = {};
    log.session = req.session.perfil;

    /* verificar se esta logado */
    if (log.session) {

        return res.render('home/index', { 'usuario': log.session, 'dados': data, 'baseUrl': base_url, 'apiUrl': util.apiUrl, "EMPRESA": util.EMPRESA });

    } else {

        return res.render('login/index', { 'baseUrl': base_url, 'apiUrl': util.apiUrl, "EMPRESA": util.EMPRESA, 'error': true });

    }

}


exports.auth = async (req, res) => {

    let params = req.body;
    let retorno = false;
    /* inicializar valores na pagina */
    let data = { instancia: '', qrcode: '', status: false };
    retorno = await loginCtr.login(params);



    if (retorno !== false) {

        if (retorno.login == true) {

            req.session.perfil = retorno; /* dados recuperados do banco */

            /* redirecionar para home */
            return res.render('home/index', { 'usuario': req.session.perfil, 'dados': data, 'baseUrl': base_url, 'apiUrl': util.apiUrl, "EMPRESA": util.EMPRESA });
            //res.redirect('/login');


        } else {
            /** errono login */
            return res.render('login/index', { 'baseUrl': base_url, 'apiUrl': util.apiUrl, "EMPRESA": util.EMPRESA, 'error': true }); /* retornar para login */
        }

    } else {

        /** errono login */
        return res.render('login/index', { 'baseUrl': base_url, 'apiUrl': util.apiUrl, "EMPRESA": util.EMPRESA, 'error': true }); /* retornar para login */

    }


}

/* verificar se logado */
exports.verifyLogged = async function (req, res) {

    /* inicializar valores na pagina */
    let data = { instancia: '', qrcode: '----', status: false };
    let log = {};
    log.session = req.session.perfil;

    /* verificar se esta logado */
    if (log.session) {

        return res.send({ 'logged': true });

    } else {

        return res.send({ 'logged': false });

    }

}