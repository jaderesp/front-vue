/* rotas para front home */
const home = require('../../controllers/front/Home_controller');
const util = require('../../controllers/utils/Utils_controller');

/* paginas http-front */
module.exports.front = async function (req, res) {

    /* inicializar valores na pagina */
    let data = { instancia: '', qrcode: '--', status: false };

    /* direcionar para pagina logado e passar os dados de login */
    return res.render('inicial/index', { 'usuario': [], 'dados': data, 'baseUrl': util.baseUrl, 'apiUrl': util.apiUrl, "EMPRESA": util.EMPRESA });

}


module.exports.inicialize = async (req, res) => {


    let retorno = false;

    /* verificar se esta logado */
    if (req.session.perfil) {

        retorno = await home.inicialize(req, res);

    } else {
        /* retornar para login */
        return res.render('login/index', { 'baseUrl': util.baseUrl, 'apiUrl': util.apiUrl, "EMPRESA": util.EMPRESA });
    }

    return retorno;

}

module.exports.logoff = async (req, res) => {

    let retorno = false;


    retorno = await home.logoff(req, res);


    return retorno;

}