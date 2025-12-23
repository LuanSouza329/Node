export default {
  testEnvironment: "node",

  // desativa transforms (não precisa para ESM puro)
  transform: {},

  
  // impede múltiplos workers (evita erros com mockModule)
  maxWorkers: 1,

  // limpa o cache antes de cada execução
  clearMocks: true,

  // evita que o Jest tente carregar arquivos como .env
  moduleFileExtensions: ["js", "json"],

  // evita que o Jest finalize antes de operações assíncronas terminarem
  forceExit: true,

  // ignora erros silenciosos de handles abertos
  detectOpenHandles: true
};
