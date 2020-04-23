const clockSpan = document.querySelectorAll(".js-clock");

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours < 10 ? `0${hours}`: hours} : ${
                    minutes < 10 ? `0${minutes}` : minutes}`;
    for (var i = 0; i < clockSpan.length; i++) {
        clockSpan[i].innerText = `${time}`;
    }
}

function init() {
    getTime();
    setInterval(getTime, 1000);

}

init()