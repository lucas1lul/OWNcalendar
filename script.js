let date = new Date();
function renderCalendar(events = []) {
    const monthYear = document.getElementById("monthYear");
    const calendar = document.getElementById("calendar");
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    
    monthYear.textContent = date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
    calendar.innerHTML = "";
    
    for (let i = 0; i < firstDay; i++) {
        calendar.innerHTML += '<div></div>';
    }
    for (let i = 1; i <= daysInMonth; i++) {
        let dayEvents = events.filter(e => new Date(e.date).getDate() === i);
        let eventHTML = dayEvents.map(e => `<span class='event'>${e.title}</span>`).join('');
        calendar.innerHTML += `<div class='day'>${i}${eventHTML}</div>`;
    }
}

function prevMonth() {
    date.setMonth(date.getMonth() - 1);
    fetchEvents();
}
function nextMonth() {
    date.setMonth(date.getMonth() + 1);
    fetchEvents();
}

async function fetchEvents() {
    let googleEvents = await fetchGoogleCalendar();
    let microsoftEvents = await fetchMicrosoftCalendar();
    renderCalendar([...googleEvents, ...microsoftEvents]);
}

function authenticateGoogle() {
    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: 'SUA_API_KEY',
            clientId: 'SEU_CLIENT_ID',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            scope: 'https://www.googleapis.com/auth/calendar.readonly'
        }).then(() => {
            return gapi.auth2.getAuthInstance().signIn();
        }).then(fetchEvents);
    });
}

async function fetchGoogleCalendar() {
    try {
        let response = await gapi.client.calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date(date.getFullYear(), date.getMonth(), 1).toISOString(),
            timeMax: new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString(),
            showDeleted: false,
            singleEvents: true,
            orderBy: 'startTime'
        });
        return response.result.items.map(event => ({ title: event.summary, date: event.start.dateTime || event.start.date }));
    } catch (err) {
        console.error(err);
        return [];
    }
}

function authenticateMicrosoft() {
    const msalConfig = {
        auth: {
            clientId: 'SEU_CLIENT_ID',
            authority: 'https://login.microsoftonline.com/common',
            redirectUri: window.location.origin
        }
    };
    const msalInstance = new msal.PublicClientApplication(msalConfig);
    msalInstance.loginPopup().then(() => fetchEvents());
}

async function fetchMicrosoftCalendar() {
    return []; // Aqui entraria a chamada da API do Microsoft Graph
}

fetchEvents();