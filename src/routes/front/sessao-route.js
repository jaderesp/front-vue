
const sessaoCtr = require('../../controllers/front/Sessao_controller');
const util = require('../../controllers/utils/Utils_controller'); 
const extend = require('extend');

/* paginas http-front */
module.exports.index = async function(req,res){

     /* inicializar valores na pagina */
     let data = {instancia:'',qrcode:'--',status:false};
     let log = {'session':null}
     
     /* sessão */
     log.session = req.session.perfil;



    /* verificar se esta logado */
    if(log.session){ 
     
         /* direcionar para pagina logado e passar os dados de login */
         return res.render('sessoes/index',{'usuario':log.session,'dados':{},'baseUrl':util.baseUrl, 'apiUrl':util.apiUrl,"EMPRESA":util.EMPRESA  });


   }else{
       /* retornar para login */
      return res.render('login/index',{dados:data,'baseUrl':util.baseUrl,"EMPRESA":util.EMPRESA });
   }   
   
  
}

/* ger all */
module.exports.getAll = async function(req,res){

   /* dados da lista de sessões */
   let sessoes = [];

   let userLogged = req.session.perfil;

    /* filtrar pelo id da conta logada (usuario) */
    if(userLogged){ 

        let id_conta = userLogged.sessao.id_conta;  
        
        let where = {'id_conta':id_conta};
        
        sessoes = await sessaoCtr.getAll(where);
        

        return res.send({'dados':sessoes});

    }else{

      return res.send({'dados':{}});

    }  

}

module.exports.update = async function(req,res){
  
   let log = {'session':null}
   let form = req.body;

   let userLogged = req.session.perfil;

    /* filtrar pelo id da conta logada (usuario) */
    if(userLogged.sessao){ 

        let id_conta = userLogged.sessao.id_conta;  
        
        extend(form,{'id_conta':id_conta});

         /* inserir dados */
         var result = await sessaoCtr.update(form);

         return res.send({'retorno':result});

    }else{

      return res.send({'retorno':false});

    }
   
  
   //return res.json({retorno:'dados de validação da gravação dos dados aqui...'});

}

/* cadastrar nova sessão */
module.exports.add = async function(req,res){
  
   let log = {'session':null}
   let form = req.body;

   let userLogged = req.session.perfil;

   /* filtrar pelo id da conta logada (usuario) */
   if(userLogged.sessao){ 

       let id_conta = userLogged.sessao.id_conta;  
       
       extend(form,{'id_conta':id_conta});       
      /* inserir dados */
      var result = await sessaoCtr.add(form);

      return res.send({'retorno':result});

   }else{

      return res.send({'retorno':false});

    }

   //return res.json({retorno:'dados de validação da gravação dos dados aqui...'});

}

/* remove */
module.exports.remove = async function(req,res){
  
   let log = {'session':null}
   let form = req.body;

   /* inserir dados */
   var result = await sessaoCtr.remove(form.id_sess);

   return res.send({'retorno':result});
   //return res.json({retorno:'dados de validação da gravação dos dados aqui...'});

}