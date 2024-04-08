/* funções para serem utilizadas dentro do components inseridos dinamicamente via string vars html */
let base_url = $("#baseUrl").val() + "/";
let api_url = $("#apiUrl").val();


/* resgatar arquivo gravado no banco referente a resposta */
export async function post(params, route){
    return new Promise( async (resolve, reject) => {
          //base_url + "editor/getResponses";
          try {

            if(!route){
                console.log("\r\n Erro, não foi informado a rota para relizar requisição post.");
                return;
            }
            
            if(!params){
                console.log("\r\n Erro parametros invalidos para relizar requisição post.");
                return;
            }
  
  
              const response = await axios.post(`${base_url + route}`,params); /* formato rota ex.: cliente/add */
              const resposta = response.data.dados[0];
  
              if(resposta){
  
                    console.log("\r\n Resultado da requisição post: ", resposta);
  
              }
          
          
            } catch (errors) {
              console.error("Ocorreu um erro ao tentar atualizar a Resposta: ",errors);
              resolve(false);
              return;
            }
  
            resolve(true);
            return;
      });
  
  }