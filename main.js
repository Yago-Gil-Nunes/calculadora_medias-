const form = document.getElementById("form-atividade"); // Obtém o elemento do formulário pelo ID
const imgAprovado = `<img src="./imagens/aprovado.png" alt= "emoji celebrando"/> `; // Define a imagem para atividade aprovada
const imgReprovado = `<img src= "./imagens/reprovado.png" alt="emoji triste" /> `; // Define a imagem para atividade reprovada
const atividades = []; // Array para armazenar os nomes das atividades
const notas = []; // Array para armazenar as notas das atividades
const spanAprovado = `<span class= " resultado aprovado">Aprovado</span>`; // Define o span para resultado aprovado
const spanReprovado = `<span class= " resultado reprovado">Reprovado</span>`; // Define o span para resultado reprovado
const notaMinima = parseFloat(prompt("Digite a nota mínima.")); // Solicita ao usuário a nota mínima e a converte para float

let linhas = ``; // Variável para armazenar as linhas da tabela

// Adiciona um evento de 'submit' ao formulário
form.addEventListener("submit", function(e) {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    adicionaLinhas(); // Chama a função para adicionar linhas na tabela
    atualizaTabela(); // Chama a função para atualizar a tabela
    atulizaMediaFinal(); // Chama a função para atualizar a média final
})

// Função para adicionar linhas na tabela
function adicionaLinhas() {
    const inputNomeAtividade = document.getElementById("nome-atividade"); // Obtém o campo de nome da atividade
    const inputNotaAtividade = document.getElementById("nota-atividade"); // Obtém o campo de nota da atividade

    // Verifica se a atividade já foi inserida
    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida.`); // Exibe um alerta se a atividade já foi adicionada
    } else {
        atividades.push(inputNomeAtividade.value); // Adiciona a atividade ao array de atividades
        notas.push(parseFloat(inputNotaAtividade.value)); // Adiciona a nota ao array de notas
        
        let linha = `<tr>`; // Cria uma nova linha na tabela
        linha += `<td>${inputNomeAtividade.value}</td>`; // Adiciona o nome da atividade na linha
        linha += `<td>${inputNotaAtividade.value}</td>`; // Adiciona a nota da atividade na linha
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; // Adiciona a imagem de aprovado ou reprovado conforme a nota
        linha += `</tr>`;

        linhas += linha; // Adiciona a linha à variável de linhas
    }
    
    inputNomeAtividade.value = ""; // Limpa o campo de nome da atividade
    inputNotaAtividade.value = ""; // Limpa o campo de nota da atividade
}

// Função para atualizar a tabela
function atualizaTabela() {
    const corpoTabela = document.querySelector("tbody"); // Obtém o corpo da tabela
    corpoTabela.innerHTML = linhas; // Atualiza o corpo da tabela com as novas linhas
}

// Função para atualizar a média final
function atulizaMediaFinal() {
    const mediaFinal = calculaMediaFinal(); // Calcula a média final
    document.getElementById("media-final-valor").innerHTML = mediaFinal.toFixed(2); // Atualiza o valor da média final na tabela
    document.getElementById("media-final-resultado").innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado; // Atualiza o resultado (aprovado ou reprovado) conforme a média final
}

// Função para calcular a média final
function calculaMediaFinal() {
    let somaDasnotas = 0; // Inicializa a variável para a soma das notas

    // Itera sobre o array de notas e soma os valores
    for (let i = 0; i < notas.length; i++) {
        somaDasnotas += notas[i];
    }
    return somaDasnotas / notas.length; // Retorna a média das notas
}
