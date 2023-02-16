let startButton = document.querySelector(".start-button");
let scoreButton = document.querySelector(".score-button");
let backButton = document.querySelector(".back-button");

let secIntro = document.querySelector(".secIntro");
let secQuiz = document.querySelector(".secQuiz");
let secResults = document.querySelector(".secResults");
let secHighscores = document.querySelector(".secHighscores");

initialLoad();

startButton.addEventListener("click", showAndHideStart);
backButton.addEventListener("click", showAndHideEnd);

function hideIntro() {
    console.log("I clicked the start button");
    secIntro.style.display = "none";
}

function showIntro() {
    console.log("I clicked the back button");
    secIntro.style.display = "block";
}

function showQuiz () {
    secQuiz.style.display = "";
}

function hideQuiz () {
    secQuiz.style.display = "none";
}

function hideResult() {
    secResults.style.display = "none";
}

function hideScores() {
    secHighscores.style.display = "none";
}

function showAndHideEnd () {
    showIntro();
    hideQuiz();
    hideResult();
    hideScores();
}

function showAndHideStart () {
    showQuiz();
    hideIntro();
    hideResult();
    hideScores();
}

function initialLoad () {
    hideQuiz();
    hideResult();
    hideScores();
}