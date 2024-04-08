//let base_url = $("#baseUrl").val() + "/";
//let api_url = $("#apiUrl").val();

//funcionalidades para controles do component de configuração de webhooks
const setupWebhookJson = async (params) => {

    return new Promise(async (resolve, reject) => {

        try {

            const response = await axios.post(url_, params);
            const retorno = response.data.retorno;


            resolve(retorno);
            return;


        } catch (erro) {


            console.log("\r\n OoOps ocorreu um erro na requisição http.", erro);
            resolve(false);
            return;

        }

    })

}

const addBtns = async (idWHook, config) => {

    return new Promise(async (resolve, reject) => {

        let EditorClass_ = new Editor();
        let ComponentHTML = new ComponentSetup()

        let element = $(`#webhook_${idWHook}`);

        if (element.length) {

            let html = ""

            if (idWHook) {

                let btns = await EditorClass_.getBtnsWebooks(idWHook)

                for (var i = 0; i < btns.length; i++) {

                    // html = await EditorClass_.getTamplate("webhook", idWHook);
                    html += ComponentHTML.criarComponente('button', btns[i]);

                }

            }
            //incrementar botão html ao elemento (webhook)
            element.append(html);

            //reorganizar o botão add webhook ao final dos demais botões

            //verificar se já existe o botão (add webhook)
            var container = document.getElementById(`webhook_${idWHook}`);
            var btnAddWbk = document.getElementById(`btn_add_wbk_webhook_${idWHook}`);
            var copy_ = btnAddWbk

            if (btnAddWbk) {
                // Remove botao adicionar webhook (para realocar ao final da lista de botoes e mantê-lo sempre abaixo)
                // container.removeChild(btnAddWbk);
                btnAddWbk.remove()
                // Adiciona o elemento no final do container
                container.appendChild(copy_);
            }

        }

        resolve(true)

    })

}

const removeWhookConf = async (idWHook) => {
    //verificar se já existe o botão (add webhook)         
    var btnAddWbk = document.getElementById(`webhook_btn_${idWHook}`);
    var btnremoveWbk = document.getElementById(`webhook_btn_${idWHook}_remove`);


    if (btnremoveWbk && btnAddWbk) {
        //remover botão
        btnAddWbk.remove()
        btnremoveWbk.remove()

    }
}


const getIndexBtnsWbhook = async (idHook) => {

    return new Promise(async (resolve, reject) => {

        var divPrincipal = document.getElementById(`webhook_${idHook}`); // Obtenha a div principal
        var botoes = divPrincipal.querySelectorAll("button"); // Selecione todos os botões dentro da div principal
        let qtdebtns = botoes.length; // Retorna o número de botões

        qtdeBotoesLayout = 2

        if (qtdebtns > 0) {

            resolve(parseInt(qtdebtns - 1 / qtdeBotoesLayout));

        } else {
            resolve(0)
        }

    })

}


const webhookModal = async (idWHook) => {

    return new Promise(async (resolve, reject) => {

        let HiddenIdWbhookModal = document.getElementById(`wbhood_id_modal`);


        if (HiddenIdWbhookModal) {

            HiddenIdWbhookModal.value = idWHook

            $("#webhookModal").modal("show")

        }




    })

}