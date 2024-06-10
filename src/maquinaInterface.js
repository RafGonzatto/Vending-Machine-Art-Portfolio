// maquinaInterface.js

import MaquinaController from './maquinaController.js';

class MaquinaInterface {
    static trocarGaleria(ordem) {
        MaquinaController.trocarGaleria(ordem);
    }

    static trocarImagemSeta(opcao) {
        MaquinaController.trocarImagemSeta(opcao);
    }

    static restaurarImagemSeta(opcao) {
        MaquinaController.restaurarImagemSeta(opcao);
    }
    static abrirImagem(imagem){
        MaquinaController. abrirImagem(imagem);
    }
}

export default MaquinaInterface;
