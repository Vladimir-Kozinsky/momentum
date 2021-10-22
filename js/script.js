
const showTime = () => {
    const time = document.querySelector('.time');
    const date = new Date();
    const currentTime = date.toLocaleTimeString()
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    const option = {hour: 'numeric', minute:'numeric', second: 'numeric' }
    let midNight = date.toLocaleTimeString('en-US', option)
    if ('12:00:00 AM' === midNight ) {
        showDate();
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