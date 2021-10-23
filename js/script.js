
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

const showGreeting = () => {
    const greeting = document.querySelector(".greeting")
    const date = new Date();
    const hours = date.getHours();

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

// SLIDER

const getRandomNum = () => {
    min = Math.ceil(10);
    max = Math.floor(20);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const setBg = (timeOfDay, bgNum) => {
    const body = document.body;
    const img = new Image();
    console.log(img)
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    img.onload = () => {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`
    }
}

let randomNum;
randomNum = getRandomNum()
const date = new Date();
const hours = date.getHours();
const timeOfDay = getTimeOfDay(hours).toLowerCase();
setBg(timeOfDay, randomNum);

const getSlideNext = () => {
    const date = new Date();
    const hours = date.getHours();
    randomNum = getRandomNum()
    const timeOfDay = getTimeOfDay(hours).toLowerCase();
    if (randomNum < 21) {
        randomNum++
    } else {
        randomNum = 1
    }
    setBg(timeOfDay, randomNum)
}

const getSlidePrev = () => {
    const date = new Date();
    const hours = date.getHours();
    const timeOfDay = getTimeOfDay(hours).toLowerCase();
    randomNum = getRandomNum()
    if (randomNum > 1) {
        randomNum--
    } else {
        randomNum = 20
    }
    setBg(timeOfDay, randomNum)
}

const slideNext = document.querySelector(".slide-next")
slideNext.addEventListener("click", getSlideNext)

const slidePrev = document.querySelector(".slide-prev")
slidePrev.addEventListener("click", getSlidePrev)

// WETHER

async function getWeather() {
    const city = document.querySelector(".city")
    if (!city.value) {
        city.value = "Minsk"
    }
    console.log(city)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    const weatherIcon = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.weather-description');
    const weatherWind = document.querySelector('.wind');
    const weatherHumidity = document.querySelector('.humidity');
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    weatherWind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    weatherHumidity.textContent = `Humidity: ${data.main.humidity}% `;
}
getWeather()
const city = document.querySelector(".city")
city.addEventListener("change", getWeather)