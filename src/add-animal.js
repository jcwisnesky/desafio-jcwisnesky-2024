const { RecintosZoo } = require('./recintos-zoo');

const zoologico = new RecintosZoo();
const resultado = zoologico.analisaRecintos('MACACO', 2);

console.log(resultado);