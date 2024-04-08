   
   /* add item no banco e retornar format html com id do banco nas funções */
   async function postIn(params, action){

    return new Promise( async (resolve, reject) => {

        let retorno = false;
        let url_ = '';

        if(!params){
          console.log("\r\n informe os parametros para a ação.");
          resolve(false);
          return;
        }

        if(!action){
          console.log("\r\n informe qual açõ deseja realizar (ex.: add, remove, update).");
          resolve(false);
          return;
        }

        

            if(action == 'get'){

              url_ = base_url + 'autobot/getResponses';

            }else if(action == 'add'){

              url_ = base_url + 'autobot/addResponse';

            }else if(action == 'update'){

              url_ = base_url + 'autobot/setupResponse';

            }else if(action == 'remove'){

              url_ = base_url + 'autobot/removeResponse';

            }else{

              console.log("\r\n A ação para função postIn informada não é reconhecida.");
              resolve(false);
              return;     

            } 
  



        try{
              
            const response = await axios.post(url_,params);
            const retorno = response.data.retorno;


            resolve(retorno);
            return;


          }catch(erro){


            console.log("\r\n OoOps ocorreu um erro na requisição http.", erro);
            resolve(false);
            return;
            
          }


    });
}