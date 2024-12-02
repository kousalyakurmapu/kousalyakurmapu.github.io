// Hardcoded credentials
const validUsers = [
    { username: "kousalya", password: "kousi@123" },
    { username: "admin", password: "admin123" }
];

// Quiz questions related to HTML, CSS, and JS
const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Hyper Tool Markup Language", "Home Tool Markup Language", "Hyperlink Text Marking Language"],
        answer: 0
    },
    {
        question: "Which of the following is used to apply styles to a webpage?",
        options: ["HTML", "CSS", "JS", "Python"],
        answer: 1
    },
    {
        question: "What does the 'box-sizing' property do in CSS?",
        options: ["Defines the width and height of an element", "Sets the border-box of an element", "Sets padding and margin for an element", "Changes the font size of an element"],
        answer: 0
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        options: ["Boolean", "String", "Object", "Character"],
        answer: 3
    },
    {
        question: "Which of the following is used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        answer: 3
    }

];

let currentQuestion = 0;
let score = 0;
let wrongAnswers = [];

// DOM elements
const loginContainer = document.getElementById("login-container");
const loginForm = document.getElementById("login-form");
const loginBtn = document.getElementById("login-btn");
const loginError = document.getElementById("login-error");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitBtn = document.getElementById("submit-btn");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const wrongAnswersList = document.getElementById("wrong-answers-list");
const greeting = document.getElementById("greeting");
const logoutBtn = document.getElementById("logout-btn"); // Logout Button DOM Element

// Login functionality
loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const isValidUser = validUsers.some(user => user.username === username && user.password === password);

    if (isValidUser) {
        loginContainer.style.display = "none";
        quizContainer.style.display = "block";

        // Display greeting
        greeting.style.display = "block";
        greeting.textContent = `Hello ${username}`;

        loadQuestion();
    } else {
        loginError.style.display = "block";
    }
});

// Quiz functionality
function loadQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = current.question;
    optionsElement.innerHTML = "";

    current.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.innerHTML = `
            <input type="radio" name="option" value="${index}">
            ${option}
        `;
        optionsElement.appendChild(label);
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Please select an option before submitting.");
        return;
    }

    const answer = parseInt(selectedOption.value);
    if (answer === questions[currentQuestion].answer) {
        score++;
    } else {
        wrongAnswers.push({
            question: questions[currentQuestion].question,
            selected: questions[currentQuestion].options[answer],
            correct: questions[currentQuestion].options[questions[currentQuestion].answer]
        });
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function displayWrongAnswers() {
    wrongAnswersList.innerHTML = ""; // Clear previous wrong answers
    if (wrongAnswers.length === 0) {
        wrongAnswersList.innerHTML = "<li>No wrong answers! Well done!</li>";
    } else {
        wrongAnswers.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>Question:</strong> ${item.question}<br>
                <strong>Your Answer:</strong> ${item.selected}<br>
                <strong>Correct Answer:</strong> ${item.correct}
            `;
            wrongAnswersList.appendChild(li);
        });
    }
}

function endQuiz() {
    quizContainer.style.display = "none";
    scoreContainer.style.display = "block";
    scoreElement.textContent = `${score} / ${questions.length}`;
    displayWrongAnswers();
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    wrongAnswers = []; // Clear wrong answers for the new quiz
    scoreContainer.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
}

function logout() {
    // Reset all states and show the login screen again
    scoreContainer.style.display = "none";
    quizContainer.style.display = "none";
    loginContainer.style.display = "block";
    loginForm.reset(); // Optional: Clear form fields
    loginError.style.display = "none"; // Hide login error
    greeting.style.display = "none"; // Hide the greeting message
}

// Event Listeners
submitBtn.addEventListener("click", checkAnswer);
restartBtn.addEventListener("click", restartQuiz);
logoutBtn.addEventListener("click", logout);
