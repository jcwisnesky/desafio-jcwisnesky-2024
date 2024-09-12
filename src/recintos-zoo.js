class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanho: 10, animais: ['MACACO', 'MACACO', 'MACACO'] },
      { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
      { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: ['GAZELA'] },
      { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
      { numero: 5, bioma: 'savana', tamanho: 9, animais: ['LEAO'] }
    ];

    this.animais = {
      LEAO: { tamanho: 3, biomas: ['savana', 'savana e rio'], carnivoro: true },
      LEOPARDO: { tamanho: 2, biomas: ['savana', 'savana e rio'], carnivoro: true },
      CROCODILO: { tamanho: 3, biomas: ['rio', 'savana e rio'], carnivoro: true },
      MACACO: { tamanho: 1, biomas: ['savana', 'floresta', 'savana e rio'], carnivoro: false },
      GAZELA: { tamanho: 2, biomas: ['savana', 'savana e rio'], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio', 'savana e rio'], carnivoro: false }
    };

    this.animaisValidos = Object.keys(this.animais);
  }

  analisaRecintos(animal, quantidade, numRecintosDesejados = 5) {
    if (!this.animaisValidos.includes(animal)) {
      return { erro: 'Animal inválido', recintosViaveis: null };
    }

    if (quantidade <= 0) {
      return { erro: 'Quantidade inválida', recintosViaveis: null };
    }

    const { tamanho, biomas, carnivoro } = this.animais[animal];
    const espacoNecessario = tamanho * quantidade;
    const recintosViaveis = [];

    for (const recinto of this.recintos) {
      if (!biomas.includes(recinto.bioma)) {
        continue;
      }

      const espacoOcupado = recinto.animais.reduce((total, a) => total + this.animais[a].tamanho, 0);
      const espacoLivre = recinto.tamanho - espacoOcupado;

      const animaisNoRecinto = recinto.animais;
      const compatibilidadeCarnivoro = carnivoro 
        ? animaisNoRecinto.every(a => this.animais[a].carnivoro) && !animaisNoRecinto.some(a => a !== animal && this.animais[a].carnivoro)
        : true;

      const hipopotamoCompativel = animal !== 'HIPOPOTAMO' 
        ? true 
        : (recinto.bioma === 'savana e rio' && animaisNoRecinto.every(a => a === 'HIPOPOTAMO' || this.animais[a].biomas.includes('savana e rio')));

      const macacoCompativel = animal !== 'MACACO' || animaisNoRecinto.length > 0 || (animaisNoRecinto.length === 0 && biomas.includes(recinto.bioma));
      const espacoExtra = animaisNoRecinto.length > 0 && !animaisNoRecinto.every(a => a === animal) ? 1 : 0;

      console.log(`Recinto ${recinto.numero}: animaisNoRecinto = ${animaisNoRecinto}, espacoLivre = ${espacoLivre}, espacoExtra = ${espacoExtra}`);

      if (espacoLivre >= espacoNecessario + espacoExtra && compatibilidadeCarnivoro && hipopotamoCompativel && macacoCompativel) {
        recintosViaveis.push({
          numero: recinto.numero,
          descricao: `Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessario - espacoExtra} total: ${recinto.tamanho})`
        });
      }
    }

    console.log(`Recintos viáveis para ${animal}:`, recintosViaveis.map(r => r.descricao));

    if (recintosViaveis.length === 0) {
      return { erro: 'Não há recinto viável', recintosViaveis: null };
    }

    recintosViaveis.sort((a, b) => a.numero - b.numero);

    const recintosEspecificados = recintosViaveis.slice(0, numRecintosDesejados);

    return { erro: null, recintosViaveis: recintosEspecificados.map(r => r.descricao) };
  }
}

module.exports = { RecintosZoo };