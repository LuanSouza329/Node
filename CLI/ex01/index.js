process.stdout.write('Qual é o seu nome? ');

process.stdin.on('data', (data) => {
    const nome = data.toString().trim(); // Converte o Buffer para string e remove espaços
    process.stdout.write(`Olá, ${nome}! Bem-vindo ao restaurante.`);
    process.exit(); // Encerra o programa
});