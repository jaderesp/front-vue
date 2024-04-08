'use strict'
const { Sequelize } = require('sequelize');
const database = require('../../../config/sequelize');
 
let sessao = database.define('Sessao', {
    id_sess: {
        type:Sequelize.INTEGER(11).ZEROFILL.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_conta: {
        type:Sequelize.INTEGER.ZEROFILL,
        allowNull: false,
    },
    session_json: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome_sess: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nomeApi_sess: {
        type: Sequelize.STRING(400),
        allowNull: false
    },
    number_sess: {
        type: Sequelize.STRING,
        allowNull: false
    },
    qrcode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status_sess: {
        type: Sequelize.STRING,
        allowNull: false
    },    
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});
 
module.exports.sync = async () => {

    try {
        const resultado = await database.sync({force: true});        
        return resultado;
    } catch (error) {
        console.log(error);
        return false;
    }    

}

module.exports.add = async (params) => {

     if(!params){
         console.log("Erro, não existem dados de paramentros para esta tarefa.")
         return false;
     }

    try {
        const resultadoCreate = await sessao.create(params);
        console.log("Resultado criação da sessão: ",resultadoCreate);

        return resultadoCreate;

    } catch (error) {
        console.log("Ocorreu um erro ao criar a sessão: ",error);

         /* forçar criação da tabela caso não exista */
        let res = await sessao.sync();

        if(res){
           console.log("✅ Por precaução, Forçamos a criação da tabela de sessao.", res); 
        }

        return false;
    }

}

module.exports.update = async (params,id) => {

    if(!params){
        console.log("Erro, não existem dados de paramentros para esta tarefa.")
        return false;
    }

    if(!id){
        console.log("Erro, é preciso informar o id para realizar atualização do registro.")
        return false;
    }

   try {
       const resultado = await sessao.update(params,{
            where:{
                id_sess:id
            }
       });
       console.log("Resultado criação da sessão: ",resultado);

       return resultado;

   } catch (error) {

       console.log("Ocorreu um erro ao atualizare o registro: ",error);

       return false;
   }

}


/* add or update */
module.exports.upsert = async (params, where_) => {

    if(!params){
        console.log("Erro, não existem dados de paramentros para esta tarefa.")
        return false;
    }

   try {
        let result = false;
        let where = where_;
        const foundItem = await sessao.findOne({where});
        if (!foundItem) {
            // Item not found, create a new one
            result = await sessao.create(params)
            return  result;
        }else{

             // Found an item, update it
            result = await sessao.update(params, {where});

        }
       

       return result;

   } catch (error) {
       console.log("Ocorreu um erro ao criar a sessão: ",error);

        /* forçar criação da tabela caso não exista */
       let res = await sessao.sync();

       if(res){
          console.log("✅ Por precaução, Forçamos a criação da tabela de sessao.", res); 
       }

       return false;
   }

}


/* login de sessao */
module.exports.getAll = async function(){

    return new Promise( async (resolve, reject) => {
        let retorno = false;

        try{ 
                    
            let response = undefined;

            try{ 
                response = await sessao.findAll();
            }catch(error){

                console.log("Ocorreu um erro ao efetuar consulta ao banco de dados: ", error);
                return false;

            }
          //  console.log("Dados query sessoes: ", response);
            let dados = response;           
            
            resolve(dados); /* retornar login e dados da sessão */

        }catch(error){
            resolve(false);
        }


    });


}


/* gea sessão */
module.exports.get = async function(where_){

    return new Promise( async (resolve, reject) => {
        let retorno = false;
 
        try{   
 
            if(!where_){
                resolve(retorno);
            }
                    
            let response = undefined;
 
            try{ 
                response = await sessao.findAll({where:where_});
            }catch(error){
 
                console.log("Ocorreu um erro ao efetuar consulta ao banco de dados: ", error);
 
            }
            
            let dados = response;           
 
            resolve(dados);
 
        }catch(error){
            console.log("Ocorreu um erro ao realizar a consulta da sessão: ", error);
            resolve(false);
        }
 
 
    });
 
 
 }


/* login da sessão */
module.exports.getOne = async function(where_){

    return new Promise( async (resolve, reject) => {
        let retorno = false;

        try{   

            if(!where_){
                resolve(retorno);
            }
                    
            let response = undefined;

            try{ 
                response = await sessao.findAll({where:where_});
            }catch(error){

                console.log("Ocorreu um erro ao efetuar consulta ao banco de dados: ", error);

            }
            
            let dados = []; 
            
            if(response[0]){
                dados = response[0].dataValues; 
            }

            resolve(dados);

        }catch(error){
            console.log("Ocorreu um erro ao realizar a consulta da sessão: ", error);
            resolve(false);
        }


    });


}


/* get unico */
module.exports.getSomeOne = async function(where_){

    return new Promise( async (resolve, reject) => {
        let retorno = false;

        try{   

            if(!where_){
                resolve(retorno);
            }
                    
            let response = undefined;

            try{ 
                response = await sessao.findAll({where:where_});
            }catch(error){

                console.log("Ocorreu um erro ao efetuar consulta ao banco de dados: ", error);

            }
            
            let dados = []; 
            
            if(response[0]){
                dados = response[0].dataValues; 
            }       

            resolve(dados);

        }catch(error){
            console.log("Ocorreu um erro ao realizar a consulta da sessão: ", error);
            resolve(false);
        }


    });


}

/* remover */
module.exports.remove = async (id) => {

    if(!id){
        console.log("Erro, é preciso informar o id para realizar atualização do registro.")
        return false;
    }

   try {
       const resultado = await sessao.destroy({
            where:{
                id_sess:id
            }
       });
    
       return resultado;

   } catch (error) {

       console.log("Ocorreu um erro ao atualizare o registro: ",error);

       return false;
   }

}