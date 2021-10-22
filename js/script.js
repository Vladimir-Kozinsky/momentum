
const showTime = () => {
    const time = document.querySelector('.time');
    const date = new Date();
    const currentTime = date.toLocaleTimeString()
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    const option = { hour: 'numeric', minute: 'numeric', second: 'numeric' }
    let midNight = date.toLocaleTimeString('en-US', option)
    if ('12:00:00 AM' === midNight) {
        showDate();
    }

    if ('12:00:00 AM' === midNight || '5:00:00 AM' === midNight || '12:00:00 PM' === midNight || '5:00:00 PM' === midNight) {
        showGreeting()
    }
}

showTime();

const showDate = () => {
    const dateSel = document.querySelector(".date");
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' };
    const currentDate = date.toLocaleDateString('en-US', options);
    dateSel.textContent = currentDate;
}

showDate();

const showGreeting = () => {
    const greeting = document.querySelector(".greeting")
    const date = new Date();
    const hours = date.getHours();
    const getTimeOfDay = (hour) => {
        if (5 <= hour && hour <= 11) {
            return "Morning"
        } else if (12 <= hour && hour <= 16) {
            return "Afternoon"
        } else if (17 <= hour && hour <= 23) {
            return "Evening"
        } else {
            return "Night"
        }
    }
    const timeOfDay = getTimeOfDay(hours)
    greeting.textContent = `Good ${timeOfDay},`

}

showGreeting()

const setLocalStorage = () => {
    const name = document.querySelector(".name")
    localStorage.setItem('name', name.value);
}

window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    const name = document.querySelector(".name")
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    } else {
        name.placeholder = "[Enter Name]"
    }
}
window.addEventListener('load', getLocalStorage)

