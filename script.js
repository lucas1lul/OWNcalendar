// Obtendo os elementos da página para manipulação
const monthYear = document.getElementById("monthYear");
const calendar = document.getElementById("calendar");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

// Definindo a data inicial como a data atual
let currentDate = new Date();

/**
 * Função para gerar o calendário do mês atual
 */
function generateCalendar() {
    calendar.innerHTML = ""; // Limpa o calendário antes de atualizar

    let year = currentDate.getFullYear(); // Obtém o ano atual
    let month = currentDate.getMonth(); // Obtém o mês atual (0 = janeiro, 1 = fevereiro, etc.)

    let firstDay = new Date(year, month, 1).getDay(); // Descobre em qual dia da semana começa o mês
    let lastDate = new Date(year, month + 1, 0).getDate(); // Descobre quantos dias tem o mês

    monthYear.textContent = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(currentDate);

    // Criando os espaços vazios antes do primeiro dia do mês
    for (let i = 0; i < firstDay; i++) {
        let emptyCell = document.createElement("div");
        emptyCell.classList.add("day");
        calendar.appendChild(emptyCell);
    }

    // Criando os dias do mês
    for (let day = 1; day <= lastDate; day++) {
        let dayCell = document.createElement("div");
        dayCell.classList.add("day");
        dayCell.textContent = day;
        calendar.appendChild(dayCell);
    }
}

// Adicionando eventos aos botões para navegar entre os meses
prevMonth.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
});

nextMonth.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
});

// Chama a função para exibir o calendário inicial
generateCalendar();