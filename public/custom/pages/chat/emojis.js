/* formatar popup emoji para reação das mensagens  */
let base_url = $("#baseUrl").val() + "/";
let api_url = $("#apiUrl").val();

/* reação as mensagens */
async function popupEmojisReaction(elementId, id_sess) {

  var msgId = elementId;
  var trigger = document.getElementById('popup_' + elementId.replaceAll('@', '_').replaceAll('.', '_'));

  let popup = picmoPopup.createPopup({
    // picker options go here
    className: 'custom_popup_emoji',
    visibleRows: 3,
    emojisPerRow: 12,
    emojiSize: '2rem',
    showCategoryTabs: true,
    showRecents: true,
    showSearch: true,
    locale: 'pt'
    //theme:'darkTheme'

  }, {
    referenceElement: trigger,
    triggerElement: trigger
  });

  /* event */
  popup.addEventListener('emoji:select', event => {

    console.log('Emoji selected:', event.emoji);
    /* enviando reação para api */
    this.sendReactToMensagem(id_sess, msgId, event.emoji);

  });

  /* abrir popup */
  setTimeout(function () {

    popup.open();

  }, 500);



}


/* reagir a mensagem com emoji */

/* resgatar arquivo gravado no banco referente a resposta */
async function sendReactToMensagem(id_sess_, msgId_, emoji_) {
  return new Promise(async (resolve, reject) => {
    //base_url + "editor/getResponses";
    try {

      let params = {
        id_sess: id_sess_,
        msgId: msgId_,
        emoji: emoji_
      }

      if (!params) {
        resolve(false);
        return;
      }

      const response = await axios.post(`${base_url}api/sendReactToMensagem`, params);
      const resposta = response.data.retorno;

      if (!resposta) {
        console.log("\r\n Ocorreu um erro ao reagir a mensagem.");
        resolve(resposta);
        return;

      }

      if (resposta) {

        /* ativar badge de reação da mensagem */
        document.getElementById("reaction_" + msgId_).style.display = "block";
        document.getElementById("reaction_" + msgId_).append(emoji_);

        resolve(resposta);
        return;

      }


    } catch (errors) {
      console.error("Ocorreu um erro ao tentar atualizar a Resposta: ", errors);
      resolve(false);
      return;
    }

    resolve(true);
    return;
  });

}