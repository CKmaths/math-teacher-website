/* =================================================
   MATH TEACHER WEBSITE
   VERSION 2.3
   Exercise Generator + Random Questions
================================================= */
/* =================================================
   MOBILE MENU
================================================= */
const menuToggle =
    document.getElementById("menuToggle");
const navLinks =
    document.getElementById("navLinks");
if (menuToggle) {
menuToggle.addEventListener(
        "click",
        function () {
navLinks.classList.toggle("active");
}
    );
}
document
    .querySelectorAll(".nav-links a")
    .forEach(function (link) {
link.addEventListener(
            "click",
            function () {
navLinks.classList.remove("active");
}
        );
});
/* =================================================
   DARK MODE
================================================= */
const themeToggle =
    document.getElementById("themeToggle");
if (themeToggle) {
themeToggle.addEventListener(
        "click",
        function () {
document.body.classList.toggle("dark");
const dark =
                document.body.classList.contains("dark");
themeToggle.textContent =
                dark ? "☀️" : "🌙";
localStorage.setItem(
                "theme",
                dark ? "dark" : "light"
            );
}
    );
if (
        localStorage.getItem("theme")
        === "dark"
    ) {
document.body.classList.add("dark");
themeToggle.textContent = "☀️";
}
}
/* =================================================
   LANGUAGE
================================================= */
const languageToggle =
    document.getElementById("languageToggle");
let currentLanguage =
    localStorage.getItem("language")
    || "km";
function changeLanguage(language) {
currentLanguage = language;
document
        .querySelectorAll("[data-km]")
        .forEach(function (element) {
element.innerHTML =
                element.getAttribute(
                    "data-" + language
                );
});
if (language === "km") {
document.documentElement.lang = "km";
if (languageToggle) {
            languageToggle.textContent = "🇬🇧 EN";
        }
} else {
document.documentElement.lang = "en";
if (languageToggle) {
            languageToggle.textContent = "🇰🇭 KH";
        }
}
localStorage.setItem(
        "language",
        language
    );
}
if (languageToggle) {
languageToggle.addEventListener(
        "click",
        function () {
changeLanguage(
                currentLanguage === "km"
                    ? "en"
                    : "km"
            );
}
    );
}
changeLanguage(currentLanguage);
/* =================================================
   EXERCISE GENERATOR
================================================= */
const topicSelect =
    document.getElementById("topicSelect");
const difficultySelect =
    document.getElementById("difficultySelect");
const generateButton =
    document.getElementById("generateButton");
const question =
    document.getElementById("question");
const questionNumber =
    document.getElementById("questionNumber");
const hint =
    document.getElementById("hint");
const hintButton =
    document.getElementById("hintButton");
const userAnswer =
    document.getElementById("userAnswer");
const checkButton =
    document.getElementById("checkButton");
const showAnswerButton =
    document.getElementById("showAnswerButton");
const feedback =
    document.getElementById("feedback");
const scoreElement =
    document.getElementById("score");
const totalQuestionsElement =
    document.getElementById("totalQuestions");
const correctAnswersElement =
    document.getElementById("correctAnswers");
let currentAnswer = null;
let currentHint = "";
let questionCount = 0;
let correctCount = 0;
let score = 0;
/* =================================================
   RANDOM NUMBER
================================================= */
function randomNumber(min, max) {
return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}
/* =================================================
   CREATE QUESTION
================================================= */
function generateQuestion() {
const topic =
        topicSelect.value;
const difficulty =
        difficultySelect.value;
let a;
    let b;
    let answer;
    let text;
    let hintText;
/* ---------------------------------------------
       ADDITION
    --------------------------------------------- */
if (topic === "addition") {
if (difficulty === "easy") {
a = randomNumber(1, 20);
            b = randomNumber(1, 20);
} else if (difficulty === "medium") {
a = randomNumber(20, 100);
            b = randomNumber(20, 100);
} else {
a = randomNumber(100, 999);
            b = randomNumber(100, 999);
}
answer = a + b;
text = `${a} + ${b} = ?`;
hintText =
            currentLanguage === "km"
                ? "សូមបូកចំនួនទាំងពីរ។"
                : "Add the two numbers.";
}
/* ---------------------------------------------
       SUBTRACTION
    --------------------------------------------- */
else if (topic === "subtraction") {
if (difficulty === "easy") {
a = randomNumber(10, 30);
            b = randomNumber(1, a);
} else if (difficulty === "medium") {
a = randomNumber(50, 150);
            b = randomNumber(10, a);
} else {
a = randomNumber(200, 999);
            b = randomNumber(50, a);
}
answer = a - b;
text = `${a} − ${b} = ?`;

hintText =
            currentLanguage === "km"
                ? "យកចំនួនទីមួយ ដកចំនួនទីពីរ។"
                : "Subtract the second number from the first.";
}
/* ---------------------------------------------
       MULTIPLICATION
    --------------------------------------------- */
else if (topic === "multiplication") {
if (difficulty === "easy") {
a = randomNumber(1, 10);
            b = randomNumber(1, 10);
} else if (difficulty === "medium") {
a = randomNumber(5, 20);
            b = randomNumber(5, 20);
} else {
a = randomNumber(10, 50);
            b = randomNumber(10, 50);
}
answer = a * b;
text = `${a} × ${b} = ?`;
hintText =
            currentLanguage === "km"
                ? "សូមគុណចំនួនទាំងពីរ។"
                : "Multiply the two numbers.";
}
/* ---------------------------------------------
       DIVISION
    --------------------------------------------- */
else if (topic === "division") {
if (difficulty === "easy") {
b = randomNumber(1, 10);
answer = randomNumber(1, 10);
} else if (difficulty === "medium") {
b = randomNumber(2, 15);
answer = randomNumber(2, 20);
} else {
b = randomNumber(5, 30);
answer = randomNumber(5, 50);
}
a = b * answer;
text = `${a} ÷ ${b} = ?`;
hintText =
            currentLanguage === "km"
                ? "រកចំនួនដែលគុណនឹងចំនួនចែក ហើយបានចំនួនដើម។"
                : "Find the number that multiplied by the divisor gives the dividend.";
}
/* ---------------------------------------------
       ALGEBRA
    --------------------------------------------- */
else if (topic === "algebra") {
if (difficulty === "easy") {
a = randomNumber(1, 10);
answer = randomNumber(1, 10);
b = randomNumber(1, 20);
} else if (difficulty === "medium") {
a = randomNumber(2, 10);
answer = randomNumber(1, 15);
b = randomNumber(1, 30);
} else {
a = randomNumber(3, 15);
answer = randomNumber(1, 20);
b = randomNumber(5, 50);
}
/*
         * ax + b = c
         */
const c =
            a * answer + b;
text =
            `${a}x + ${b} = ${c}`;
hintText =
            currentLanguage === "km"
                ? `ដក ${b} ពីភាគីទាំងពីរ រួចចែកនឹង ${a}។`
                : `Subtract ${b} from both sides, then divide by ${a}.`;
}
currentAnswer = answer;
currentHint = hintText;
questionCount++;
questionNumber.textContent =
        currentLanguage === "km"
            ? `លំហាត់ទី ${questionCount}`
            : `Question ${questionCount}`;
question.textContent = text;
hint.textContent = "";
userAnswer.value = "";
feedback.textContent = "";
feedback.className = "feedback";
totalQuestionsElement.textContent =
        questionCount;
correctAnswersElement.textContent =
        correctCount;
}
/* =================================================
   GENERATE BUTTON
================================================= */
if (generateButton) {
generateButton.addEventListener(
        "click",
        generateQuestion
    );
}
/* =================================================
   SHOW HINT
================================================= */
if (hintButton) {
hintButton.addEventListener(
        "click",
        function () {
hint.textContent =
                currentHint;
}
    );
}
/* =================================================
   CHECK ANSWER
================================================= */
if (checkButton) {
checkButton.addEventListener(
        "click",
        function () {
if (currentAnswer === null) {
feedback.textContent =
                    currentLanguage === "km"
                        ? "សូមបង្កើតលំហាត់ជាមុនសិន។"
                        : "Please generate a question first.";
feedback.className =
                    "feedback incorrect";
return;
            }
const answer =
                Number(userAnswer.value);
if (
                userAnswer.value === ""
            ) {
feedback.textContent =
                    currentLanguage === "km"
                        ? "សូមបញ្ចូលចម្លើយ។"
                        : "Please enter your answer.";
feedback.className =
                    "feedback incorrect";
return;
            }
if (answer === currentAnswer) {
correctCount++;
score += 10;
feedback.textContent =
                    currentLanguage === "km"
                        ? "🎉 ត្រឹមត្រូវ! អស្ចារ្យណាស់!"
                        : "🎉 Correct! Excellent!";
feedback.className =
                    "feedback correct";
} else {
feedback.textContent =
                    currentLanguage === "km"
                        ? "❌ មិនទាន់ត្រឹមត្រូវទេ។ សូមព្យាយាមម្តងទៀត។"
                        : "❌ Not correct yet. Try again.";
feedback.className =
                    "feedback incorrect";
}
scoreElement.textContent =
                score;
correctAnswersElement.textContent =
                correctCount;
}
    );
}
/* =================================================
   SHOW ANSWER
================================================= */
if (showAnswerButton) {
showAnswerButton.addEventListener(
        "click",
        function () {
if (currentAnswer === null) {
feedback.textContent =
                    currentLanguage === "km"
                        ? "សូមបង្កើតលំហាត់ជាមុនសិន។"
                        : "Please generate a question first.";
feedback.className =
                    "feedback incorrect";
return;
            }
feedback.textContent =
                currentLanguage === "km"
                    ? `💡 ចម្លើយគឺ ${currentAnswer}`
                    : `💡 The answer is ${currentAnswer}`;
feedback.className =
                "feedback correct";
}
    );
}
