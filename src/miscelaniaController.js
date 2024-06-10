// miscelaniaController.js
import MiscelaniaService from './miscelaniaService.js';

import MaquinaService from './maquinaService.js';

class MiscelaniaController {
    constructor() {
        document.addEventListener("DOMContentLoaded", function () { 
            var isClosed = false;

            window.addEventListener('scroll', verificarPosicao);

            function verificarPosicao() {
                var blocoImagem = document.querySelector('.bloco_imagem');
                var posicao = blocoImagem.getBoundingClientRect().top;
                var telaPosicao =  -1*parseInt(window.innerHeight)/2;
                if (posicao < telaPosicao && !isClosed) {
                    abrirPopUp();
                    isClosed = true;
                }
            }

            function abrirPopUp() {  
                var popUp = document.getElementById('popUp');
                var popUpBalao = document.getElementById('popUpBalao');
                popUp.style.display = 'block';

                setTimeout(async () => {
                    MaquinaService.removerAnimacoes(popUpBalao);
                    popUpBalao.style.display = 'block';
                    popUpBalao.classList.add('crescerBalao');
                  }, 300);
                  setTimeout(async () => {
                    MaquinaService.removerAnimacoes(popUpBalao);
                    popUpBalao.classList.add('encolherBalao');
                  }, 10000);
                  setTimeout(async () => {MiscelaniaService.fecharPopUp(popUpBalao); }, 10900);

                    MaquinaService.removerAnimacoes(popUp);
                    popUp.classList.add('crescer');
                    setTimeout(async () => {
                        MaquinaService.removerAnimacoes(popUp);
                        popUp.classList.add('encolher');
                    }, 10000);
                    setTimeout(async () => {MiscelaniaService.fecharPopUp(popUp); }, 12900);
            }
        });
    }
}

window.MiscelaniaController = new MiscelaniaController();
export default MiscelaniaController;
