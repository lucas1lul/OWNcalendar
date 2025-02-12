const monthYear = document.getElementById('monthYear');
const calendar = document.getElementById('calendar');

let currentDate = new Date();

function renderCalendar() {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    monthYear.textContent = firstDay.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

    calendar.innerHTML = '';
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = i;
        calendar.appendChild(dayElement);
    }
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

function authenticateGoogle() {
    alert("Integração com Google ainda não implementada.");
}

function authenticateMicrosoft() {
    alert("Integração com Microsoft ainda não implementada.");
}

renderCalendar();