const jogador = document.getElementById("jogador");
const inimigo = document.getElementById("inimigo");
const telaGame = document.getElementById("telaGame")
const msgTelaGame = document.getElementById("msgTelaGame")
const vidaDoInimigo = document.getElementById("vidaDoInimigo")

const lifeJogador = document.getElementById("vidaDoJogador")
const lifeInimigo = document.getElementById("vidaDoInimigo")
let velocidade = 2;
let move = {
  left: false, right: false
}
let vidaJogador = 100;
let vidaInimigo = 100;
let intervaloAtaqueInimigo;

function moverJogador(){
  const posicao = jogador.getBoundingClientRect();
  const mapa = document.getElementById("container").getBoundingClientRect();
  
  if(move.left && posicao.left > mapa.left){
    jogador.style.left = `${jogador.offsetLeft - velocidade}px`;
  }
  if(move.right && posicao.right < mapa.right){
    jogador.style.left = `${jogador.offsetLeft + velocidade}px`;
  }
}
setInterval(moverJogador, 10)

function moverInimigo() {
  const posicaoInimigo = inimigo.getBoundingClientRect()
  const posicaoJogador = jogador.getBoundingClientRect()
  
  if(posicaoInimigo.left > posicaoJogador.left){
    inimigo.style.left = `${inimigo.offsetLeft - 1}px`
  }else if(posicaoInimigo.right < posicaoJogador.right){
    inimigo.style.left = `${inimigo.offsetLeft + 1}px`
  }
  
  if(posicaoInimigo.left <= posicaoJogador.left && posicaoInimigo.right >= posicaoJogador.right){
    // funcao de inicar ataque do inimigo
    inicarAtaque()
  }else{
    // para ataque do inimigo 
    pararAtaque()
  }
}
setInterval(moverInimigo, 10)

// ataque do inimigo ao jogador
function inicarAtaque() {
  if(!intervaloAtaqueInimigo){
    intervaloAtaqueInimigo = setInterval(atacandoJogador, 3000)
  }
}
// para ataque inimigo ao jogador 
function pararAtaque() {
  clearInterval(intervaloAtaqueInimigo)
  intervaloAtaqueInimigo = null;
}

function atacandoJogador(){
 lifeJogador.value = vidaJogador -= 12
  console.log(vidaJogador)
  
  if(vidaJogador <= 0){
    msgTelaGame.innerHTML = "Você Morreu!!"
    telaMorte()
    jogador.remove()
  }
}

document.getElementById("btnLeft").addEventListener("touchstart", ()=>{
  move.left = true;
  jogador.src = "img/scorpiarAndandoPraTras.gif"
  jogador.style.width = "105px"
  jogador.style.bottom = "60px"
});
document.getElementById("btnLeft").addEventListener("touchend", ()=>{
  move.left = false;
  jogador.src = "img/scorpian.gif"
  jogador.style.width = "90px"
  jogador.style.bottom = "70px"
});

document.getElementById("btnRight").addEventListener("touchstart", ()=>{
  move.right = true;
  jogador.src = "img/scorpianAndando.gif "
});
document.getElementById("btnRight").addEventListener("touchend", ()=>{
  move.right = false;
  jogador.src = "img/scorpian.gif"
});

// jump do jogador 
let animacao;
function puloJogador(){
  jogador.style.animationName = "puloSocrpian"
  jogador.style.animationDuration = "1s"
  jogador.style.animationIterationCount = "infinite"
  jogador.style.animationTimingFunction = "ease-out"
}
function paraPuloJogador(){
  jogador.style.animation = "none"
  jogador.src = "img/scorpian.gif"
  clearTimeout(animacao)
}
document.getElementById("btnUp").addEventListener("click", ()=>{
  jogador.src = "img/scorpionMortal.gif"
  puloJogador()
  animacao = setTimeout(paraPuloJogador, 1000)
})

function telaMorte(){
  telaGame.style.display = "block"
  document.getElementById("controles").remove()
}

// sistema de soco do jogador
document.getElementById("btnSoco").addEventListener("click", ()=>{
  socoJogador()
  jogador.src = "img/scorpianLutando.gif"
  jogador.style.width  = "130px"
  jogador.style.bottom = "58px"
  setTimeout(desarivaeSoco, 300)
})

function socoJogador(){
  vidaDoInimigo.value = vidaInimigo-=12;
  if(vidaInimigo <= 0){
    msgTelaGame.innerHTML = "Você Venceu"
    inimigo.remove()
    telaMorte()
  }
}

function desarivaeSoco(){
  jogador.src = "img/scorpian.gif"
  jogador.style.width  = "90px"
  jogador.style.bottom = "70px"
}

document.getElementById("btnRn").addEventListener("click", ()=>{
  location.reload()
  
})