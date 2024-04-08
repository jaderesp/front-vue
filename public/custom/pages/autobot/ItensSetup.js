/* funções para serem utilizadas dentro do components inseridos dinamicamente via string vars html */
const base_url = $("#baseUrl").val() + "/";
const api_url = $("#apiUrl").val();

async function formatButtonsLayout(id) {

    var maxField = 3; //Input fields increment limitation
    var addButton = $('.add_button_' + id); //Add button selector
    var wrapper = $('.field_wrapper_' + id); //Input field wrapper
    var fieldHTML = `<div class="row" style="margin-bottom: 10px;">
                           

                            <input class="btn" id="input_btn_${id}" onfocus="add_relac_button(${id});" onfocusout="add_relac_button(${id});" type="text" name="field_name_${id}[]" type="text"  value="" style="background-color: #6e2982; color:#fff;"/>
                            <a href="javascript:void(0);" class="remove_button_${id}">
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">  <image id="image0" width="20" height="20" x="0" y="0"
                                            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                                        AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElN
                                        RQfmChgPLCzTYXWeAAABAklEQVQoz43TO06CURQE4I+/+NmGsSC4CwNuALCBBRBFWQuUugVYihY8
                                        esIjugX4aY4FEN7EmereTO7MmZzLHqmGvqm1tam+htQFPFuIE87VjkU5XSEMvChIpQpeDYXQldsL
                                        u8JS8/AKOS0robM3DUuPl/IoWQrVzQgLoekaWsJMSkMYnJgeBxgJ9UQFH+KqMHyiwlQouIWiMGEt
                                        tsXGBUJeyBL/ROIXd9vY54R7/CS+UL75WBnfm3qGN+pJjIU6qbnQuips7wqnJqyULsqeZEJld9ws
                                        ReskQKItO1wKcjpCGHlTlJf34N1YCJ3T/FWzs7pne9NDpOp6JjKZiZ764Vf4A8L6cheQpZoAAAAA
                                        JXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTEwLTI0VDE1OjQ0OjQ0KzAwOjAwDrHjAAAAACV0RVh0ZGF0
                                        ZTptb2RpZnkAMjAyMi0xMC0yNFQxNTo0NDo0NCswMDowMH/sW7wAAAAASUVORK5CYII=" />
                                </svg>

                        </a>
                    </div>

                    <div id="add_relac_button" style="display:none;">
                        <button title="Responder com componente de botões." type="button" ng-click="addControls('start');" class="btn btn-outline-success waves-effect waves-float waves-light btn-sm" style="font-size: 0.5rem;">
                            btn
                        </button>
                        <button title="Responder com mensagem de texto." type="button" ng-click="addControls('start');" class="btn btn-outline-warning waves-effect waves-float waves-light btn-sm" style="font-size: 0.5rem;">
                            txt
                        </button>
                        <button title="Responder com mensagem de texto e midia." type="button" ng-click="addControls('start');" class="btn btn-outline-info waves-effect waves-float waves-light btn-sm" style="font-size: 0.5rem;">
                            Med
                        </button>
                        <button title="Responder com envio de arquivo." type="button" ng-click="addControls('start');" class="btn btn-outline-danger waves-effect waves-float waves-light btn-sm" style="font-size: 0.5rem;">
                            File
                        </button>

                    </div>
         
                    
                `; //New input field html 
    var x = 1; //Initial field counter is 1

    //Once add button is clicked
    $(addButton).click(function () {
        //Check maximum number of input fields
        if (x < maxField) {
            x++; //Increment field counter
            $(wrapper).append(fieldHTML); //Add field html
        } else {

            toastr.remove();
            toastr.options.positionClass = 'toast-top-full-width';
            toastr.options.progressBar = true;
            toastr.warning('Não é possível gerar mais de 3 botões.', 'Atenção', {
                closeButton: !0,
                tapToDismiss: !2,
                newestOnTop: false
            });

        }
    });

    //Once remove button is clicked
    $(wrapper).on('click', '.remove_button_' + id, function (e) {
        e.preventDefault();
        $(this).parent('div').remove(); //Remove field html
        x--; //Decrement field counter
    });



}



/* add buttom option a cada vez que for gerado uma conexão entre item (node) */
/* SOMENTE PARA INPUTS DINAMICOS */
function setItemLayout(id, input_id, action) {

    return new Promise(async (resolve, reject) => {

        var wrapper = $('.field_wrapper_' + id); //Input field wrapper
        var type = $('#type_item_' + id).val(); /* tipo de item: message, button, btnFile etc... */
        var idUnico = id.toString() + input_id.toString();

        /* pegar registro no banco de dados */
        let params = { 'id_abresp': id };
        let itemBD = await postIn(params, 'get');

        /* pegar valor para preencher as opções */
        let jdata = JSON.parse(itemBD[0].json_data);
        let layout = [];

        if (!jdata.layout == false) {

            layout = jdata.layout;

        }


        var fieldHTML = "";

        switch (type) {

            case 'message':


                break;
            case 'msgFile':

                break;
            case 'button':

                let valorInput = "";

                let exist = $('#input_btn_' + idUnico).is(':visible');

                /* if(layout.button){
                     
                     let btns = layout.button.buttons;

                     for(var i = 0; i < btns.length; i++){

                         if(btns[i].id == input_id){
                             valorInput = btns[i].title;
                         }

                     }

                    
                     $('#msg_content_' + id).val(layout.button.msg);
                     $('#titulo_btn_' + id).val(layout.button.title);
                     $('#footer_btn_' + id).val(layout.button.footer);

                 } */

                /* verificar se botão já existe */
                if (exist == false) {
                    fieldHTML = `<div id="div_button_item_${idUnico}" style="margin-bottom: 10px;">

                                                            <input class="btn" placeholder="👉 digite o título" id="input_btn_${idUnico}" onfocus="add_relac_button(${id});" onfocusout="add_relac_button(${id}); setupValueInputData(${id},${input_id});" type="text" name="field_name_${id}[]" type="text"  value="${valorInput}" style="background-color: #6e2982; color:#fff; font-size:10px;"/>
                                                    
                                                            </div>

                                            <!--  <div id="add_relac_button" style="display:none;">
                                                            <button title="Responder com componente de botões." type="button" ng-click="addControls('start');" class="btn btn-outline-success waves-effect waves-float waves-light btn-sm" style="font-size: 0.5rem;">
                                                                btn
                                                            </button>
                                                            <button title="Responder com mensagem de texto." type="button" ng-click="addControls('start');" class="btn btn-outline-warning waves-effect waves-float waves-light btn-sm" style="font-size: 0.5rem;">
                                                                txt
                                                            </button>
                                                            <button title="Responder com mensagem de texto e midia." type="button" ng-click="addControls('start');" class="btn btn-outline-info waves-effect waves-float waves-light btn-sm" style="font-size: 0.5rem;">
                                                                Med
                                                            </button>
                                                            <button title="Responder com envio de arquivo." type="button" ng-click="addControls('start');" class="btn btn-outline-danger waves-effect waves-float waves-light btn-sm" style="font-size: 0.5rem;">
                                                                File
                                                            </button>

                                                </div> -->`;

                }

                break;
            case 'btnList':

                break;

            default:

        }


        if (!action) {

            $(wrapper).append(fieldHTML);

        } else if (action == 'remove') {

            $('#div_button_item_' + idUnico).remove();

        }

        resolve(true);
    })



}



/* botoões para add novo item relacionado ao botão */
async function add_relac_button(id) {

    if ($('#add_relac_button_' + id).is(':visible') == false) {

        $('#add_relac_button_' + id).show();

    } else {

        $('#add_relac_button_' + id).hide();

    }

}

/* função para ser utilizada no front (salvar os dados) */
async function setupValueInputData(output_id, input_id) {

    /* 
        ====== FAZER CHAMADA DENTRO DO EDITOR VIA javascript pur (não Angularjs)
        salvar valor dos imputs no json_data (banco de dados);
    */

    return new Promise(async (resolve, reject) => {


        let itemsSetup_ = new itemsSetup(); /* factory class */

        var json_data = await itemsSetup_.getJsonData(output_id, input_id);

        /* post (update) */
        var paramsItem = { 'id_abresp': output_id, 'json_data': JSON.stringify(json_data) };
        let retorno = await postIn(paramsItem, 'update');

        console.log("\r\n Retorno da atualização do imput do item: " + output_id, retorno);

        /* */

        if (retorno) {

            toastr.remove();
            toastr.options.positionClass = 'toast-top-full-width';
            toastr.options.progressBar = true;
            toastr.success('Dados do item foram salvos.', 'Sucesso!', {
                closeButton: !0,
                tapToDismiss: !2,
                newestOnTop: false
            });

        }

        resolve(retorno);


    });

}


