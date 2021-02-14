// palco do jogo - function p recuperar a dimenção frequentemente.
// definir as var antes para terem acesso global
var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 10;

var criaMosquitoTempo = 1500;

// RECUPERAR A STRING APÓS O ?     -->   .SEARCH
var nivel = window.location.search
nivel = nivel.replace('?', '')

// logica dos niveis
if (nivel === "normal") {
    criaMosquitoTempo = 1500;
} else if (nivel === "dificil") {
    criaMosquitoTempo = 1000;
} else if (nivel === "chucknorris") {
    criaMosquitoTempo = 750;
}

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
    console.log(altura, largura);
}
// função precis ser chamada no onresize do body
ajustaTamanhoPalcoJogo();

var cronometro = setInterval(function() {
    tempo -= 1;
    if (tempo < 0) {
        clearInterval(cronometro); // limpa a função alert da memoria
        clearInterval(criaMosquito);
        window.location.href = 'vitoria.html';
    } else {
        document.getElementById('cronometro').innerHTML = tempo; // INNERHTML pq acessa o elementro dentro das tags!
    }
},1000)

function posicaoRandomica() { // precisa estar numa funcao p ser carregada depoois da criacao do body
   if (document.getElementById('mosquito')) {
       document.getElementById('mosquito').remove();
        if (vidas > 3) {
            window.location.href = 'fim_de_jogo.html';
        } else {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png";
            vidas++;
        }

   }

    //pos randomica
    var posicaoX= Math.floor(Math.random() * largura) -90; // Math.floor - arredonda p baixp
    var posicaoY = Math.floor(Math.random() * altura) -90; // -90 para a imagem nao sair levemte do quadro
    // gera valores de 0 a 1 (para entar dentro da tela se multiplica por largura e altura)
    console.log(posicaoX, posicaoY);

    //corrigir posicao X/Y < 0
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    // criar elemento no html
    var mosquito = document.createElement('img');
    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoRandomico() + ' ' + ladoRandomico() // concatena classe a imagem!
    mosquito.style.left = posicaoX + 'px' // concatenar X
    mosquito.style.top = posicaoY + 'px' // Y
    mosquito.style.position = 'absolute'; // a imagem precisa ser absolute
    mosquito.id = 'mosquito'; // criar id para identificar o mosquito e apagalo
    mosquito.onclick = function() {
        this.remove();
        console.log('removed');
    }

    document.body.appendChild(mosquito);
    console.log(mosquito.className, mosquito.id)
}
// classe p 3 tamanhos diferentes das moscar
function tamanhoRandomico() {
    var classe = Math.floor(Math.random() * 3);

    switch(classe) { // não precisa do break por conta do return
        case 0:
            return 'mosquito1';
        case 1:
            return 'mosquito2';
        case 2:
            return 'mosquito3';
    }
}
function ladoRandomico() {
    var classe = Math.floor(Math.random() * 2);

    switch(classe) { // não precisa do break por conta do return
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }
}

