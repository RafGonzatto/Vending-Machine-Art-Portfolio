class MaquinaService {

    static getContainers() {
      return document.querySelectorAll('.layer.container');
    }
   
    static verificacaoImagensQueSubiram(id) {
      let colunasInvisiveis = document.querySelectorAll('.coluna[style*="opacity: 0;"]');
      let colunasIds = Array.from(colunasInvisiveis).map((coluna) => {
        let dataId = coluna.querySelector('.imagem-galeria').getAttribute('data-id');
        return dataId;
      });
    
      let index = colunasIds.indexOf(id);
      
      if (index !== -1) {
        colunasIds.splice(index, 1);
      }
      return colunasIds;
    }

    static async subirGaleria() {
      let containers = this.getContainers();
      containers.forEach(container => {
        this.removerAnimacoes(container);
        container.classList.add('subir');
      });
    }
    static async descerContainer(dataId){
      return new Promise((resolve) => {
      let imagemGaleria = this.getImagemGaleriaByDataId(dataId);

      if (imagemGaleria) {
          let coluna = this.findParentWithClass(imagemGaleria, 'coluna');
          
          if (coluna) {
            this.removerAnimacoes(coluna);
            coluna.classList.add('descer');
            setTimeout(  async =>{ coluna.style.opacity = 1;
            resolve();
            },100 )
          }
        }
      });
    }
    static async subirContainer(dataId) {
    return new Promise((resolve) => {
    let imagemGaleria = this.getImagemGaleriaByDataId(dataId);

    if (imagemGaleria) {
        let coluna = this.findParentWithClass(imagemGaleria, 'coluna');
        
        if (coluna) {
          this.removerAnimacoes(coluna);
          coluna.classList.add('subir');
          setTimeout(  async =>{ 
          coluna.style.opacity = 0;
          resolve();
        },1800 )
        }
      }
    });
    }

    static getImagemGaleriaByDataId(dataId) {
      let imagens = document.querySelectorAll('.imagem-galeria');

      for (let imagem of imagens) {
        if (imagem.getAttribute('data-id') === dataId) {
          return imagem;
        }
      }

      return null;
    }

    static findParentWithClass(element, className) {
      let currentElement = element;

      while (currentElement && !currentElement.classList.contains(className)) {
        currentElement = currentElement.parentElement;
      }

      return currentElement;
    }

    static async balancada() {
      let containers = this.getContainers();
      containers.forEach(container => {
        this.removerAnimacoes(container);
        container.classList.add('balancada');
      });
    }
  
    static async trocarImagens(tipoDeTroca) {
      let containers = this.getContainers();
      containers.forEach(container => {
        container.style.visibility = 'hidden';
        let imagensComId = container.querySelectorAll('.coluna .imagem-galeria');
        imagensComId.forEach(imagem => {
          let id = imagem.getAttribute('data-id');
          let resultado = tipoDeTroca === 2 ? parseInt(id) - 8 : 8 + parseInt(id);
          imagem.src = `src/imagens/desenho${resultado}.png`; 
          imagem.setAttribute('data-id', resultado);
        });
      });
    }
  
    static async descerGaleria() {
      let containers = this.getContainers();
      containers.forEach(container => {
        container.style.visibility = 'visible';
      });
      await new Promise(resolve => setTimeout(resolve, 200));
      containers.forEach(container => {
        this.removerAnimacoes(container);
        container.classList.add('descer');
      });
    }
    
    static removerAnimacoes(container) { 
      container.classList.remove('balancada');
      container.classList.remove('descer');
      container.classList.remove('subir');
      container.classList.remove('crescer');
      container.classList.remove('encolher');
      container.classList.remove('crescerBalao');
      container.classList.remove('encolherBalao');
      void container.offsetWidth;
    }
  
    static async pegarId() {
      let primeiroContainer = document.querySelector('.layer.container');
  
      if (primeiroContainer) {
        let primeiraImagem = primeiroContainer.querySelector('.coluna .imagem-galeria');
  
        if (primeiraImagem) {
          return primeiraImagem.getAttribute('data-id');
        } else {
          console.log('Não foi encontrada nenhuma imagem dentro do primeiro container.');
        }
      } else {
        console.log('Não foi encontrado nenhum container.');
      }
  
      return null;
    }
  }
  
  export default MaquinaService;
  