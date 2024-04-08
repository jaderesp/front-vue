/* funções uteis para todo o sistema */
var expressao_regular_url = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

function isUrl(texto)
{
    return expressao_regular_url.test(texto);
}

function urlTruncada(url)
{
    var limite_1 = 30;
    var limite_2 = 15;
    var reticencias = '[...]';
    if (url.length > limite_1 + limite_2 + reticencias.length)
    {
        url =
            url.substring(0, limite_1) + 
            reticencias + 
            url.substring(url.length - limite_2);
    }
    return url;
}

async function autoUrl(texto)
{

    return new Promise( async (resolve, reject) => {

        var texto_saida = '';
        var token = '';
        var caractere_fim_texto = String.fromCharCode(3);
        var separadores = ['\r', '\n', ' ', caractere_fim_texto];
        var caractere = '';
        var length_texto = texto.length;
        texto += caractere_fim_texto;
        for (var i in texto)
        {
            caractere = texto[i];
            if (separadores.indexOf(caractere) >= 0)
            {
                if (token)
                {
                    if (isUrl(token))
                    {
                        texto_saida += 
                            '<a href="' + (token.search('://') < 0 ? 'http://' : '') + token + '" target="_blank" style="color:#082c66;">' + 
                                urlTruncada(token) + 
                            '</a>';
                    }
                    else
                    {
                        texto_saida += token;
                    }
                    token = '';
                    if (parseInt(i) < length_texto)
                    {
                        texto_saida += caractere;
                    }
                }
            }
            else
            {
                token += caractere;
            }
        }
        resolve(texto_saida);
    });
}