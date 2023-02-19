//button variables to call on
let startButton = document.querySelector(".start-button");
let scoreButton = document.querySelector(".score-button");
let backButton = document.querySelector(".back-button");
let nextButton = document.querySelector(".nextQuestion");
let retryButton = document.querySelector(".tryAgain");
let submitButton = document.querySelector(".submitButton");
let clearScoreButton = document.querySelector(".clearScores");


//page section variables to display
let secIntro = document.querySelector(".secIntro");
let secQuiz = document.querySelector(".secQuiz");
let secResults = document.querySelector(".secResults");
let secHighscores = document.querySelector(".secHighscores");

//quiz variables
let questionText = document.querySelector(".question-text");
let choicesTextUl = document.querySelector(".choices-text");

//time variables
let currentTime = document.querySelector(".timer");
let penaltyTime = 10;
let totalTime = 60;

//score variables
let currentScore = 0;
let scoreText = document.querySelector(".scoreDisplay");
let userInfo = document.querySelector(".userName");
let scoreListFull = document.querySelector(".scoreHolder");

initialLoad();

//all the event listeners
startButton.addEventListener("click", showAndHideStart);
backButton.addEventListener("click", initialLoad);
scoreButton.addEventListener("click", showScoresOnly);
nextButton.addEventListener("click", nextQuestion);
retryButton.addEventListener("click", initialLoad);
submitButton.addEventListener("click", submitResult);
clearScoreButton.addEventListener("click", clearAllScores);


function hideIntro() {
    secIntro.style.display = "none";
}

function showIntro() {
    secIntro.style.display = "";
}

function showQuiz() {
    secQuiz.style.display = "";
}

function hideQuiz() {
    secQuiz.style.display = "none";
}

function hideResult() {
    secResults.style.display = "none";
}

function showResult() {
    secResults.style.display = "";
    return true;
}

function hideScores() {
    secHighscores.style.display = "none";
}

function showScores() {
    secHighscores.style.display = "";
}

function showResultOnly() {
    hideIntro();
    hideQuiz();
    hideScores();
    showResult();
    scoreDisplay();
}

function showAndHideStart() {
    showQuiz();
    hideIntro();
    hideResult();
    hideScores();
    runTimer();
}

function showScoresOnly() {
    showScores();
    hideIntro();
    hideResult();
    hideQuiz();
    displayHighScores();
}

function initialLoad() {
    showIntro();
    hideQuiz();
    hideResult();
    hideScores();
    totalTime = 60;
    currentScore = 0;
    userInfo.value = "";
    questionNum = 0;
}

let questionsAll = [
    {
        number: 1,
        question: "Which of these is not a starter pokemon from Pokemon Red/Blue?",
        answer: "Jigglypuff",
        choices: [
            "Squirtle",
            "Bulbasaur",
            "Charmander",
            "Jigglypuff",
        ]
    },
    {
        number: 2,
        question: "Which of these is a Dragon-type Pokemon?",
        answer: "None of the above",
        choices: [
            "Charizard",
            "Onix",
            "Gyarados",
            "None of the above",
        ]
    },
    {
        number: 3,
        question: "Which of these is not a Pokemon-Type?",
        answer: "Glass",
        choices: [
            "Fire",
            "Water",
            "Glass",
            "Steel",
        ]
    },
    {
        number: 4,
        question: "Fill in the blank: 'I want to be ______'",
        answer: "The very best",
        choices: [
            "The very best",
            "A Pokemon Master",
            "A League Champion",
            "None of the above",
        ]
    },
    {
        number: 5,
        question: "How much hair do I have left after this project?",
        answer: "None",
        choices: [
            "One strand",
            "None",
            "Over 9000",
            "Hair? What's that?",
        ]
    },
];

var questionNum = 0;

function nextQuestion() {
    if (questionNum < questionsAll.length - 1) {
        questionNum++;
        displayQuestion(questionNum);
    } else {
        showResultOnly();
        questionNum = 6;
    }

    let toBeRemove = document.querySelector(".result-Div");
    if (toBeRemove != undefined) {
        toBeRemove.remove("");
    } else {
        return;
    }
}

function displayQuestion(questionNum) {
    choicesTextUl.innerHTML = "";
    for (var i = 0; i < questionsAll.length; i++) {
        let questionTextInner = questionsAll[questionNum].question;
        var choicesTextInner = questionsAll[questionNum].choices;
        questionText.textContent = questionsAll[questionNum].number + ". " + questionTextInner;
    }
    choicesTextInner.forEach(function (newItem) {
        var listedChoice = document.createElement("li");
        listedChoice.textContent = newItem;
        choicesTextUl.appendChild(listedChoice);
        listedChoice.classList.add("chosen-option");
        listedChoice.addEventListener("click", findTheAnswer);
    });
}

function runTimer() {
    var intervalTime = setInterval(function () {
        totalTime--;
        currentTime.textContent = + totalTime + "s";

        if (totalTime <= 0 || questionNum > questionsAll.length) {
            clearInterval(intervalTime);
            console.log("TIMER IS FINALLY SLAYED!!!")
            currentTime.textContent = "Time's up";
            showResultOnly();
        }
    }, 1000);
    displayQuestion(questionNum);
}

function findTheAnswer(event) {
    let chosenOp = document.querySelectorAll(".chosen-option");
    let element = event.target;
    if (element.matches("li")) {
        let resultDiv = document.createElement("div");
        resultDiv.setAttribute("class", "result-Div");
        secQuiz.appendChild(resultDiv);
        if (questionsAll[questionNum].answer === element.textContent) {
            resultDiv.setAttribute("id", "bgGreen");
            resultDiv.textContent = "Correct!";
            currentScore = currentScore + 10;
        } else {
            totalTime = totalTime - penaltyTime;
            resultDiv.setAttribute("id", "bgRed");
            resultDiv.textContent = "Incorrect!";
        }
    }
    for (var i = 0; i < chosenOp.length; i++) {
        chosenOp[i].classList.add("disabled");
    }
}

function scoreDisplay() {
    scoreText.textContent = "Your final score: " + currentScore + "/50";
}

function submitResult(event) {
    event.preventDefault();
    let userInit = userInfo.value;
    if (userInit === "") {
        alert("Please enter your initials to record your score.")
    } else {
        let nameNscore = {
            userInitials: userInit,
            score: currentScore
        };
        let recentHighScore = JSON.stringify(nameNscore);
        localStorage.setItem("highScores", recentHighScore);
        alert("Your score has been recorded. Thank you for playing.")
    };
    userInfo.value = "";
}

let highScoreCount = 0;

function displayHighScores() {
    let tempHighScores = JSON.parse(localStorage.getItem("highScores"));
    let allHighScores = [];
    if (tempHighScores !== null) {
        allHighScores.push(tempHighScores);
        for (var i = 0; i < allHighScores.length; i++) {
            let scoreList = document.createElement("li");
            scoreList.textContent = allHighScores[i].userInitials + " - " + allHighScores[i].score;
            scoreListFull.appendChild(scoreList);
            highScoreCount++;
        }
    }
}

function clearAllScores() {
    localStorage.clear();
    highScoreCount = 0;
    location.reload();
    return false;
}

