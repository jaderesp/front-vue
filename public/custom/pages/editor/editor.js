/* funções para serem utilizadas dentro do components inseridos dinamicamente via string vars html */
let base_url = $("#baseUrl").val() + "/";
let api_url = $("#apiUrl").val();


async function updateIntent(text,id_intent){

    if(text.value){

        var mensagem = text.value;
        console.log("Dados da intent: ", text);

        try {
            let intent = {
                'id_intent':id_intent,
                'pchaves':mensagem
            }
            const response = await axios.post(`${base_url}editor/setupIntent`,intent);
            const retorno = response.data.retorno;
        
            console.log(`As palavras chaves da intent foram atualizadas!`, retorno);
        
          } catch (errors) {
            console.error("Ocorreu um erro ao tentar atualizar a intent: ",errors);
          }

    }
}

/* atualizar opção palavra chave (conter ou ser igual) */
async function updateOpChaves(opcao,id_intent){

  if(opcao){

      var op = opcao.checked;
      console.log("Dados da checkbox da intent: ", opcao);

      try {
          let intent = {
              'id_intent':id_intent,
              'opExata':op
          }
          const response = await axios.post(`${base_url}editor/setupIntent`,intent);
          const retorno = response.data.retorno;

          let titulo = '';
          if(op == true){
            titulo = "Deve ser igual";
          }else{
            titulo = "Deve conter";
          }
          $('#opExata_'+ id_intent).html(titulo);/* titulo da opção */
      
          console.log(`As opção de comparação de palavras chaves da intent foram atualizadas!`, retorno);
      
        } catch (errors) {
          console.error("Ocorreu um erro ao tentar atualizar a intent: ",errors);
        }

  }
}



async function updateResponse(text,id_resp,type){
  
  let cor_selected = '';
  let parsSelect = {};
  if(text.options){

      for(var i = 0; i < text.options.length; i++){

          if(text.options[i].selected == true){

            if(text.options[i].value == '--Selecione--'){
              console.log("\r\n Nnehuma etiqueta selecionada.");
              return;
              break;
            }
            
              let id_cor = text.options[i].value.split('_');
              text.value = id_cor[0]; /* id_resp */
              cor_selected = id_cor[1].toString(); /* cor da etiqueta */

              parsSelect = {
                'id_resp':id_resp,
                'referencia':id_cor[0].toString()
            };

              $("#" + id_resp).css("background-color",cor_selected);
              $("#" + id_resp).css("color",'#464141');
              $("#" + "selected_name_"+ id_resp).html(text.options[i].textContent)
              break;
          }

      }

  } 

  if(text){

      var value = text.value;
      console.log("Dados da intent: ", text);

      try {

        let params = {};

        if(!type && value){

          params = {
              'id_resp':id_resp,
              'mensagem':value
          }

        }

        if(type == 'Label'){

          params = parsSelect;

        }

          const response = await axios.post(`${base_url}editor/setupResponse`,params);
          const retorno = response.data.retorno;
      
          console.log(`As ensagem de resposta foi atualizada!`, retorno);
      
        } catch (errors) {
          console.error("Ocorreu um erro ao tentar atualizar a Resposta: ",errors);
        }

  }
}

/* upload files */
async function filesModal(id){

      /* preencher form para upload */
      $('#id_resp_frm').val(id);

    /* verificar se possui arquivo no banco de dados. 
    
        se existir exibir no view, para usuario realizar no upload precisa limpar o arquivo atual

    */
      await getRespostaFileView(id);/* previsualizar arquivo armanzenado no banco */


      $('#uploadFile_modal').modal('show');

}


/* resgatar arquivo gravado no banco referente a resposta */
async function getRespostaFileView(id_resp){
  return new Promise( async (resolve, reject) => {
        //base_url + "editor/getResponses";
        try {

          let params = {};

            params = {
                'id_resp':id_resp
            }

            const response = await axios.post(`${base_url}editor/getResponses`,params);
            const resposta = response.data.dados[0];

            if(resposta){

              if(resposta.fileUrl){

                  let html = await viewFileType(resposta.mimetype,resposta.fileUrl);
                  var image_holder = $("#image-viewer");
                  $("#fileMsg").val(null);
                  image_holder.empty();
                  $(html).appendTo(image_holder);

              }

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

async function uploadFiles(){

     
      let id_resp = $('#id_resp_frm').val();
      let xhr = new XMLHttpRequest();
      let formData = new FormData();
      let file = document.getElementById("fileMsg").files[0]; 
     
      formData.append("id_resp", id_resp);   
      formData.append('filetoupload', file);
      
      
      xhr.onreadystatechange = state => { 
        console.log(xhr.status); 
        let status = xhr.status;

        if(status == 200 && xhr.readyState == 4){
            /* succes */
          

            $("#fileMsg").val(null);
            $(".thumb-image").attr({src:''}); /* limpar visualizador de imagem */
            $('#uploadFile_modal').modal('hide'); /* recolher a modal */
         
            toastr.remove();
            toastr.options.positionClass = 'toast-bottom-right';                            
            toastr.success( 'Arquivo relacionado a mensagem com sucesso!','Sucesso' , {
                closeButton: !0,
                tapToDismiss: !2,
                newestOnTop:false
            });

        }else{

            console.log("Informação de callback: ", xhr.responseText);

        }

      } // err handling
      xhr.timeout = 55000;
      xhr.open("POST", base_url + 'editor/uploadFiles'); 
      xhr.send(formData);


      //document.getElementById('preview_image').src = src || '';


}



/* visualizar arquivo */
$(document).ready(function() {
  $("#fileMsg").on('change', function() {

    //Get count of selected files
    var mimetype = $(this)[0].files[0].type;
    var size = (($(this)[0].files[0].size)/1024/1024);
    var maxSize = 60; /* 60 MB max */
    var countFiles = $(this)[0].files.length;
    var imgPath = $(this)[0].value;
    var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
    var image_holder = $("#image-viewer");

    /* verificar tamanho limite do arquivo */
    if(size > maxSize){
      image_holder.empty();
      $('#fileMsg').val(null);
      $('#uploadFile_modal').modal('hide');
      toastr.remove();
      toastr.options.positionClass = 'toast-bottom-right';                            
      toastr.warning( 'O tamanho do arquivo excede o limite de '+ maxSize +'MB. favor, verifique/ajuste o arquivo e tente novamente.','Atenção' , {
          closeButton: !0,
          tapToDismiss: !2,
          newestOnTop:false
      });
      return;
    }

    image_holder.empty();
    //$('#fileMsg').val(null);
    if (extn) {
      if (typeof(FileReader) != "undefined") {
        //loop for each file selected for uploaded.
        for (var i = 0; i < countFiles; i++) 
        {
          var reader = new FileReader();

          reader.onload = async function(e) {       

              /* visualizar arquivo */
            let urlFile = e.target.result;
            let html = await viewFileType(mimetype,urlFile);
            $(html).appendTo(image_holder);

          }
          image_holder.show();
         let render_ = $(this)[0].files[i];
         if(!render_){
          console.log("Nenhum arquivo selecionado.")
          return;
         }
          reader.readAsDataURL(render_);
        }

        
      } else {
        alert("Este browser não suporte o FileReader.");
      }

    } else {
      alert("Selecione as imagens");
    }
  });
});


/* formatar visualização de arquivo por tipo */
/* upload file (enviar na mensagem) */
async function viewFileType(typeFile, urlFile) {
  return new Promise( async (resolve, reject) => {

      let htmlView = '';
      /* visualizar conforme o formato do arquivo (modal) */
      if(typeFile == 'image/webp' || typeFile == 'image/png' || typeFile == 'image/jpg' || typeFile == 'image/jpeg' || typeFile == 'image/bmp' || typeFile == 'audio/ogg; codecs=opus'){

          htmlView += '<p> <div class="d-flex align-items-center justify-content-center" style=" width:100%;">'
          htmlView += '<img src="'+ urlFile +'" alt="Image of Apple Watch Series 5" class="product-img img-fluid" style="max-width: 100%;"></div></br>'                        
          htmlView += " </p>"

      }else if(typeFile == 'application/pdf'){

          htmlView += '<p> <div class="d-flex align-items-center justify-content-center">'
          htmlView += '<object data="'+ urlFile +'" type="application/pdf" style=" width:100%;">' 
          htmlView += '<a href="'+ urlFile +'">Baixar Arquivo</a></object></div></br>'                        
          htmlView += "</p>"

      }else if(typeFile == 'video/mp4'){
          /* video */
          htmlView += '<p> <div class="d-flex align-items-center justify-content-center">'
          htmlView += '<video controls width="300" height="300">' 
          htmlView += '<source src="'+ urlFile +'" type="'+ typeFile +'">'                         
          htmlView += 'desculpe, este browser não suporta o arquivo de vídeo.'
          htmlView += '</video></div></br>'                        
          htmlView += " </p>"

      }else if(typeFile == 'audio/ogg' || typeFile == 'audio/mpeg'){
          /* audio */
          htmlView += '<p> <div class="d-flex align-items-center justify-content-center">'
          htmlView += '<audio controls >' 
          htmlView += '<source src="'+ urlFile +'" type="'+ typeFile +'">'                         
          htmlView += 'desculpe, este browser não suporta o arquivo de audio.'
          htmlView += '</audio></div></br>'                        
          htmlView += " </p>"

      }else {
          /* audio */
          htmlView += '<p> <div class="d-flex align-items-center justify-content-center">'                        
          htmlView += '<a href="'+ urlFile +'" target="_blank" style="color:#251964;">'                         
          htmlView += ' <spam style="color:#e89797;">Baixar arquivo:</spam> . '
          htmlView += '</a></div>'                        
          htmlView += "</p>"

      }         

      if(htmlView){
        resolve(htmlView);
      }

    });

};


