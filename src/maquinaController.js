//maquinaController.js
import MaquinaService from './maquinaService.js';

class MaquinaController {

static async abrirImagem(imagem) { 
  let id = imagem.getAttribute('data-id');
  let imageUrl = `src/imagens/desenho${id}.png`;
  let containerDesenho = document.querySelector('.containerDesenho');
  let fecharBtn = containerDesenho.querySelector('#fecharBtn');
  let imagensAnteriores = containerDesenho.querySelectorAll('img');
  let setaDireita = document.querySelector('.navbar-seta-direita');
  let setaEsquerda = document.querySelector('.navbar-seta-esquerda');
  setaDireita.style.pointerEvents = 'none';
  setaEsquerda.style.pointerEvents = 'none';
  await MaquinaService.subirContainer(id)
  fecharBtn.style.pointerEvents = 'auto ';
  
  imagensAnteriores.forEach(img => img.remove());

  let imagemMaior = document.createElement('img');
  imagemMaior.src = imageUrl;
  imagemMaior.alt = id;

  containerDesenho.appendChild(imagemMaior);
  containerDesenho.style.display = 'block';
  setaDireita.style.pointerEvents = 'auto';
  setaEsquerda.style.pointerEvents = 'auto';
}

  static async fecharImagem() {
    let containerDesenho = document.querySelector('.containerDesenho');
    let imagemMaior = containerDesenho.querySelector('img');
    let fecharBtn = containerDesenho.querySelector('#fecharBtn');
    let listaImagensQueSubiram = [];

    listaImagensQueSubiram.push(imagemMaior.alt);
    let imagensIds = MaquinaService.verificacaoImagensQueSubiram(imagemMaior.alt);
    if (imagensIds.length > 0) {
    for (let ids of imagensIds){ 
      listaImagensQueSubiram.push(ids);
    }
  }
    // Loop para chamar descerContainer para cada elemento da lista
    for (let altDaImagem of listaImagensQueSubiram) {
      await MaquinaService.descerContainer(altDaImagem);
    }
    //Deveria utilizar um await Promise.all(promises); em termos de perfomance, mas dai as imagens
    //descem ao mesmo tempo, não fica tão legal o efeito
    fecharBtn.style.pointerEvents = 'none';
    containerDesenho.style.display = 'none';
  }

  static restaurarImagemSeta(opcao) {
    switch (opcao) {
      case 1:
        document.querySelector('.navbar-seta-esquerda').style.backgroundImage = 'url(src/imagens/flecha_esquerda_levantada.png)';
        break;
      case 2:
        document.querySelector('.navbar-seta-direita').style.backgroundImage = 'url(src/imagens/flecha_direita_levantada.png)';
        break;
    }
  }
  static trocarImagemSeta(opcao) {
    switch (opcao) {
      case 1:
        document.querySelector('.navbar-seta-esquerda').style.backgroundImage = 'url(src/imagens/flecha_esquerda_abaixada.png)';
        break;
      case 2:
        document.querySelector('.navbar-seta-direita').style.backgroundImage = 'url(src/imagens/flecha_direita_abaixada.png)';
        break;;
    }
  }

  static async trocarGaleria(ordem) { 
    let fecharBtn = document.querySelector('.botao-fechar');
    let setaDireita = document.querySelector('.navbar-seta-direita');
    let setaEsquerda = document.querySelector('.navbar-seta-esquerda')
    setaEsquerda.style.pointerEvents = 'none ';
    setaDireita.style.pointerEvents = 'none ';
    if (fecharBtn.style.pointerEvents === 'auto') {
      await new Promise(resolve => setTimeout(resolve, 200));
      await new Promise((resolve) => {
      this.fecharImagem(); resolve();
      },)}
    try {
      let id = await MaquinaService.pegarId();

      if ((ordem === 2 && id === '1') || (ordem === 1 && id === '9')) {
        await MaquinaService.balancada();
        setaEsquerda.style.pointerEvents = 'auto ';
        setaDireita.style.pointerEvents = 'auto';
        return;
      }

      let tipoDeTroca = 2;
      if (ordem === 1 && id === '1') {
        tipoDeTroca = 1;
      }
      await MaquinaService.subirGaleria();

      setTimeout(async () => {
        await MaquinaService.trocarImagens(tipoDeTroca);
      }, 1800);

      setTimeout(async () => {
        await MaquinaService.descerGaleria();
      }, 3700);
      setTimeout(async () => {
        setaEsquerda.style.pointerEvents = 'auto ';
        setaDireita.style.pointerEvents = 'auto';
      }, 6000);
    } catch (error) {
      console.error('Erro ao trocar a galeria:', error);
    }
  }
}
window.MaquinaController = MaquinaController;
export default MaquinaController;
