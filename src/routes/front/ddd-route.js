/* rotas para front home */
const ddd = require('../../controllers/utils/RegiaoDDD_controller');


module.exports.getDDD = async (req, res) => {

    let ddd = req.body.ddd;

      
    retorno = await ddd.getDDDInfo(ddd);

console.log("Resultado DDDD: ", retorno);
    res.status(200).send(retorno);

}