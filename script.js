// --- CONCEITO DE OBJETO ---
// Criamos a nossa pergunta como um objeto com atributos e métodos
const missaoQuiz = {
    usuario: "Estudante Dev",
    pergunta: "Qual tag HTML5 define o conteúdo principal e central de uma página?",
    alternativas: [
        "A) A tag <section> apenas para rodapés.",
        "B) A tag <div> para tudo sem distinção.",
        "C) A tag <main> para conteúdo principal."
    ],
    indiceCorreto: 2, // A terceira alternativa (C) é a correta (lembrando que começa em 0)
    
    // Método para validar a escolha
    verificarResposta: function(indiceSelecionado) {
        const botoes = document.querySelectorAll(".btn-alternativa");
        
        // Desativa todos os botões após o clique para o usuário não clicar de novo
        botoes.forEach(btn => btn.disabled = true);

        if (indiceSelecionado === this.indiceCorreto) {
            botoes[indiceSelecionado].classList.add("clicado-correto");
            setTimeout(() => exibirResultadoFinal(true), 1000);
        } else {
            // Desafio: Fazer o botão ficar vermelho quando clicamos nele
            botoes[indiceSelecionado].classList.add("clicado-errado");
            setTimeout(() => exibirResultadoFinal(false), 1000);
        }
    }
};

// --- RENDERIZAÇÃO DINÂMICA E LIMPEZA DO DOM ---
function carregarQuiz() {
    // Define o título da pergunta usando nosso objeto
    document.getElementById("pergunta-titulo").innerText = missaoQuiz.pergunta;

    const container = document.getElementById("container-alternativas");
    
    // Desafio: Limpeza do contêiner para os botões anteriores não acumularem
    container.innerHTML = ""; 

    // Cria e exibe as alternativas de forma dinâmica
    missaoQuiz.alternativas.forEach((texto, index) => {
        const botao = document.createElement("button");
        botao.innerText = texto;
        botao.className = "btn-alternativa";
        
        // Evento Ouvinte 1: Parâmetros ("click", função)
        botao.addEventListener("click", function() {
            missaoQuiz.verificarResposta(index);
        });

        container.appendChild(botao);
    });
}

// --- EVENTO OUVINTE 2: INTERATIVIDADE NO TÍTULO ---
const titulo = document.getElementById("titulo-missao");
titulo.addEventListener("mouseenter", function() {
    titulo.style.color = "#06b6d4";
    titulo.style.transform = "scale(1.05)";
});
titulo.addEventListener("mouseleave", function() {
    titulo.style.color = "#4f46e5";
    titulo.style.transform = "scale(1)";
});

// --- EVENTO OUVINTE 3: ATALHOS DE TECLADO ---
window.addEventListener("keydown", function(evento) {
    // Garante que só funcione se o painel do jogo estiver visível
    if (document.getElementById("dashboard").classList.contains("escondido")) return;

    if (evento.key === "1") missaoQuiz.verificarResposta(0);
    if (evento.key === "2") missaoQuiz.verificarResposta(1);
    if (evento.key === "3") missaoQuiz.verificarResposta(2);
});

// --- APRESENTAÇÃO DO RESULTADO FINAL DINDÂMICO ---
function exibirResultadoFinal(foiSucesso) {
    // Esconde o painel do quiz
    document.getElementById("dashboard").classList.add("escondido");
    
    const telaResultado = document.getElementById("tela-resultado");
    const mensagem = document.getElementById("mensagem-resultado");
    const feedbackVisual = document.getElementById("feedback-visual");

    telaResultado.classList.remove("escondido");

    if (foiSucesso) {
        // Inclui o nome do usuário e muda a cor da página para verde sucesso
        mensagem.innerText = `Parabéns, ${missaoQuiz.usuario}! Você domina o HTML5 semântico!`;
        document.body.className = "resultado-sucesso";
        feedbackVisual.innerHTML = "<span style='font-size: 5rem;'>🏆</span>";
    } else {
        // Inclui o nome do usuário e muda a cor da página para marrom/laranja revisar
        mensagem.innerText = `Bom treino, ${missaoQuiz.usuario}! Revise a tag <main> e tente de novo.`;
        document.body.className = "resultado-revisar";
        feedbackVisual.innerHTML = "<span style='font-size: 5rem;'>📚</span>";
    }
}

// Função para resetar o jogo
function reiniciarQuiz() {
    document.body.className = "";
    document.getElementById("tela-resultado").classList.add("escondido");
    document.getElementById("dashboard").classList.remove("escondido");
    carregarQuiz();
}

// Inicia o app assim que a página carrega
carregarQuiz();
