const inputs = document.querySelector('.inputs');
const resetarBtn = document.querySelector('.resetar-btn');
const dica = document.querySelector('.dica');
const inputDigitacao = document.querySelector('.input-digitacao');
const tentativas = document.querySelector('.tentativas');
const letrasErradas = document.querySelector('.letras-erradas');

let palavra;
let tentativasMaximas;
let erros = [];
let corretas = [];

const palavraAleatoria = () => {
    let ObjetoPalavra = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
    palavra = ObjetoPalavra.palavra.toLowerCase();  // Converter palavra para minúsculas
    tentativasMaximas = 8;

    erros = [];
    corretas = [];

    letrasErradas.innerHTML = erros.join(', ');
    dica.innerHTML = ObjetoPalavra.dica;

    tentativas.innerHTML = tentativasMaximas;

    let html = '';

    for (let index = 0; index < palavra.length; index++) {
        html += `<input type="text" disabled>`;
    }

    inputs.innerHTML = html;
};

const iniciarJogo = (evento) => {
    let letra = evento.target.value.toLowerCase();  // Converter letra para minúsculas
    
    if (/^[a-z]+$/.test(letra) && !erros.includes(letra) && !corretas.includes(letra)) {
        if (palavra.includes(letra)) {
            corretas.push(letra);
            for (let index = 0; index < palavra.length; index++) {
                if (palavra[index] === letra) {
                    inputs.querySelectorAll('input')[index].value = letra.toUpperCase();  // Mostrar a letra em maiúscula
                }
            }
        } else {
            tentativasMaximas--;
            erros.push(letra);
        }

        tentativas.innerHTML = tentativasMaximas;
        letrasErradas.innerHTML = erros.join(', ');

    }

    inputDigitacao.value = "";

    setTimeout(() => {
        if (corretas.length === [...new Set(palavra.split(''))].length) {  // Verifica se todas as letras únicas foram acertadas
            setTimeout(() => {
                alert(`Parabéns, Você acertou a palavra: ${palavra.toUpperCase()}`);  // Mostrar a palavra em maiúscula
                palavraAleatoria();
            }, 150);  // Pequeno atraso para garantir que a interface atualize
        } else if (tentativasMaximas < 1) {
            alert(`Game over! Você não possui mais tentativas.`);
    
            for (let index = 0; index < palavra.length; index++) {
                inputs.querySelectorAll("input")[index].value = palavra[index].toUpperCase();  // Mostrar a palavra em maiúscula
            }
        }
    }, 100);
}

resetarBtn.addEventListener('click', palavraAleatoria);
inputDigitacao.addEventListener('input', iniciarJogo);
document.addEventListener('keydown', () => {
    inputDigitacao.focus();
});

palavraAleatoria();
