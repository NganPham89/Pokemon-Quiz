let startButton = document.querySelector(".start-button");
let scoreButton = document.querySelector(".score-button");
let backButton = document.querySelector(".back-button");
let nextButton = document.querySelector(".nextQuestion");
let retryButton = document.querySelector(".tryAgain");


let secIntro = document.querySelector(".secIntro");
let secQuiz = document.querySelector(".secQuiz");
let secResults = document.querySelector(".secResults");
let secHighscores = document.querySelector(".secHighscores");


let questionText = document.querySelector(".question-text");
let choicesTextUl = document.querySelector(".choices-text");

initialLoad();

startButton.addEventListener("click", showAndHideStart);
backButton.addEventListener("click", initialLoad);
scoreButton.addEventListener("click", showScoresOnly);
nextButton.addEventListener("click", nextQuestion);
retryButton.addEventListener("click", initialLoad);


function hideIntro() {
    console.log("I clicked the start button");
    secIntro.style.display = "none";
}

function showIntro() {
    console.log("I clicked the back button");
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
}

function showAndHideStart() {
    showQuiz();
    hideIntro();
    hideResult();
    hideScores();
    displayQuestion(0);
}

function showScoresOnly() {
    showScores();
    hideIntro();
    hideResult();
    hideQuiz();
}

function initialLoad() {
    showIntro();
    hideQuiz();
    hideResult();
    hideScores();
}

let questionsAll = [
    {
        number: 1,
        question: "Question 1?",
        answer: "Answer 1.1",
        choices: [
            "Answer 1.1",
            "Answer 1.2",
            "Answer 1.3",
            "Answer 1.4",
        ]
    },
    {
        number: 2,
        question: "Question 2?",
        answer: "Answer 2.2",
        choices: [
            "Answer 2.1",
            "Answer 2.2",
            "Answer 2.3",
            "Answer 2.4",
        ]
    },
    {
        number: 3,
        question: "Question 3?",
        answer: "Answer 3.3",
        choices: [
            "Answer 3.1",
            "Answer 3.2",
            "Answer 3.3",
            "Answer 3.4",
        ]
    },
    {
        number: 4,
        question: "Question 4?",
        answer: "Answer 4.4",
        choices: [
            "Answer 4.1",
            "Answer 4.2",
            "Answer 4.3",
            "Answer 4.4",
        ]
    },
    {
        number: 5,
        question: "Question 5?",
        answer: "Answer 5.2",
        choices: [
            "Answer 5.1",
            "Answer 5.2",
            "Answer 5.3",
            "Answer 5.4",
        ]
    },
];

var questionNum = 0;

function nextQuestion() {
    if (questionNum < questionsAll.length - 1) {
        questionNum++;
        displayQuestion(questionNum);
    } else {
        console.log("You've answered all questions!");
        showResultOnly();
        questionNum = 0;
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

function findTheAnswer(event) {
    let chosenOp = document.querySelectorAll(".chosen-option");
    let element = event.target;
    if (element.matches("li")) {
        let resultDiv = document.createElement("div");
        resultDiv.setAttribute("class", "result-Div");
        secQuiz.appendChild(resultDiv);
        if (questionsAll[questionNum].answer === element.textContent) {
            resultDiv.textContent = "Correct!"
            console.log(element.textContent);
            console.log(questionsAll[questionNum].answer);
        } else {
            resultDiv.textContent = "Wrong!"
            console.log("WRONG ANSWER");
            console.log(chosenOp);
        }
    }
    for (var i = 0; i < chosenOp.length; i++) {
        chosenOp[i].classList.add("disabled");
    }
}