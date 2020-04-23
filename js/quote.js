const quoteText = document.querySelector(".quote__text");
const quoteAutor = document.querySelector(".quote__author");

function getQuote() {
    function randomItem(a) {
        return a[Math.floor(Math.random() * a.length)];
    }

    fetch("https://type.fit/api/quotes")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const random = randomItem(data);
            const author = random.author;
            const text = random.text;
            quoteText.innerText = `${text}`;
            quoteAutor.innerText = `- ${author} -`;
        });
}

function init() {
    getQuote();
}

init();