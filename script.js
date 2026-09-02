/* =====================================================
   MATH TEACHER WEBSITE
   VERSION 2.3
   STABLE JAVASCRIPT
===================================================== */


/* =====================================================
   GLOBAL STATE
===================================================== */

let currentLanguage =
    localStorage.getItem("language") || "km";

let currentAnswer = null;
let currentHint = "";

let questionCount = 0;
let correctCount = 0;
let score = 0;


/* =====================================================
   DOM ELEMENTS
===================================================== */

const languageButton =
    document.getElementById("languageButton");

const darkModeButton =
    document.getElementById("darkModeButton");

const menuButton =
    document.getElementById("menuButton");

const mainNav =
    document.getElementById("mainNav");


/* Exercise elements */

const topicSelect =
    document.getElementById("topicSelect");

const difficultySelect =
    document.getElementById("difficultySelect");

const generateButton =
    document.getElementById("generateButton");

const hintButton =
    document.getElementById("hintButton");

const checkButton =
    document.getElementById("checkButton");

const showAnswerButton =
    document.getElementById("showAnswerButton");

const questionNumber =
    document.getElementById("questionNumber");

const question =
    document.getElementById("question");

const hint =
    document.getElementById("hint");

const userAnswer =
    document.getElementById("userAnswer");

const feedback =
    document.getElementById("feedback");

const scoreElement =
    document.getElementById("score");

const totalQuestionsElement =
    document.getElementById("totalQuestions");

const correctAnswersElement =
    document.getElementById("correctAnswers");


/* Calculator */

const calculatorDisplay =
    document.getElementById("calculatorDisplay");

const calculatorClear =
    document.getElementById("calculatorClear");

const calculatorEquals =
    document.getElementById("calculatorEquals");


/* =====================================================
   LANGUAGE SYSTEM
===================================================== */

function updateLanguage() {

    const elements =
        document.querySelectorAll("[data-km][data-en]");

    elements.forEach(element => {

        if (currentLanguage === "km") {
            element.innerHTML =
                element.getAttribute("data-km");
        } else {
            element.innerHTML =
                element.getAttribute("data-en");
        }

    });


    /*
       Update language button.
       If current language is Khmer,
       button shows EN.
       If current language is English,
       button shows KH.
    */

    if (languageButton) {

        languageButton.textContent =
            currentLanguage === "km"
                ? "EN"
                : "KH";

    }


    /*
       Update select option text.
    */

    updateSelectOptions();


    /*
       Update current question label.
    */

    updateQuestionNumber();


    /*
       Update answer placeholder.
    */

    if (userAnswer) {

        userAnswer.placeholder =
            currentLanguage === "km"
                ? "បញ្ចូលចម្លើយ"
                : "Enter answer";

    }


    /*
       Update document language.
    */

    document.documentElement.lang =
        currentLanguage === "km"
            ? "km"
            : "en";

}


/* =====================================================
   SELECT OPTION LANGUAGE
===================================================== */

function updateSelectOptions() {

    const options =
        document.querySelectorAll(
            "select option[data-km][data-en]"
        );

    options.forEach(option => {

        option.textContent =
            currentLanguage === "km"
                ? option.getAttribute("data-km")
                : option.getAttribute("data-en");

    });

}


/* =====================================================
   LANGUAGE BUTTON
===================================================== */

if (languageButton) {

    languageButton.addEventListener("click", () => {

        currentLanguage =
            currentLanguage === "km"
                ? "en"
                : "km";

        localStorage.setItem(
            "language",
            currentLanguage
        );

        updateLanguage();

        /*
           If a question already exists,
           regenerate it so its hint can use
           the selected language.
        */

        if (currentAnswer !== null) {
            generateQuestion();
        }

    });

}


/* =====================================================
   DARK MODE
===================================================== */

function loadDarkMode() {

    const darkMode =
        localStorage.getItem("darkMode");

    if (darkMode === "enabled") {

        document.body.classList.add("dark-mode");

        if (darkModeButton) {
            darkModeButton.textContent = "☀️";
        }

    }

}


if (darkModeButton) {

    darkModeButton.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const enabled =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "darkMode",
            enabled ? "enabled" : "disabled"
        );

        darkModeButton.textContent =
            enabled ? "☀️" : "🌙";

    });

}


/* =====================================================
   MOBILE MENU
===================================================== */

if (menuButton && mainNav) {

    menuButton.addEventListener("click", () => {

        mainNav.classList.toggle("open");

    });


    const navLinks =
        mainNav.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");

        });

    });

}


/* =====================================================
   RANDOM NUMBER
===================================================== */

function randomNumber(min, max) {

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}


/* =====================================================
   DIFFICULTY RANGE
===================================================== */

function getRange(difficulty) {

    if (difficulty === "easy") {

        return {
            min: 1,
            max: 20
        };

    }


    if (difficulty === "medium") {

        return {
            min: 10,
            max: 100
        };

    }


    return {
        min: 50,
        max: 500
    };

}


/* =====================================================
   UPDATE QUESTION NUMBER
===================================================== */

function updateQuestionNumber() {

    if (!questionNumber) {
        return;
    }

    questionNumber.textContent =
        currentLanguage === "km"
            ? `សំណួរ ${questionCount}`
            : `Question ${questionCount}`;

}


/* =====================================================
   GENERATE QUESTION
===================================================== */

function generateQuestion() {

    if (!topicSelect || !difficultySelect) {
        return;
    }


    const topic =
        topicSelect.value;

    const difficulty =
        difficultySelect.value;


    const range =
        getRange(difficulty);


    let a;
    let b;
    let answer;
    let questionText;
    let hintText;


    /* ================= ADDITION ================= */

    if (topic === "addition") {

        a = randomNumber(
            range.min,
            range.max
        );

        b = randomNumber(
            range.min,
            range.max
        );

        answer = a + b;

        questionText =
            `${a} + ${b} = ?`;

        hintText =
            currentLanguage === "km"
                ? `គន្លឹះ៖ បូក ${a} ជាមួយ ${b}។`
                : `Hint: Add ${a} and ${b}.`;

    }


    /* ================= SUBTRACTION ================= */

    else if (topic === "subtraction") {

        a = randomNumber(
            range.min,
            range.max
        );

        b = randomNumber(
            range.min,
            a
        );

        answer = a - b;

        questionText =
            `${a} − ${b} = ?`;

        hintText =
            currentLanguage === "km"
                ? `គន្លឹះ៖ ដក ${b} ចេញពី ${a}។`
                : `Hint: Subtract ${b} from ${a}.`;

    }


    /* ================= MULTIPLICATION ================= */

    else if (topic === "multiplication") {

        let maxMultiplier;

        if (difficulty === "easy") {
            maxMultiplier = 10;
        }
        else if (difficulty === "medium") {
            maxMultiplier = 20;
        }
        else {
            maxMultiplier = 50;
        }


        a = randomNumber(
            2,
            maxMultiplier
        );

        b = randomNumber(
            2,
            maxMultiplier
        );

        answer = a * b;

        questionText =
            `${a} × ${b} = ?`;

        hintText =
            currentLanguage === "km"
                ? `គន្លឹះ៖ គិតពី ${a} × ${b}។`
                : `Hint: Calculate ${a} × ${b}.`;

    }


    /* ================= DIVISION ================= */

    else if (topic === "division") {

        let divisor;

        let quotient;

        if (difficulty === "easy") {

            divisor =
                randomNumber(2, 10);

            quotient =
                randomNumber(2, 10);

        }

        else if (difficulty === "medium") {

            divisor =
                randomNumber(2, 15);

            quotient =
                randomNumber(2, 20);

        }

        else {

            divisor =
                randomNumber(3, 25);

            quotient =
                randomNumber(5, 30);

        }


        const dividend =
            divisor * quotient;

        answer = quotient;

        questionText =
            `${dividend} ÷ ${divisor} = ?`;

        hintText =
            currentLanguage === "km"
                ? `គន្លឹះ៖ រកចំនួនដែលគុណនឹង ${divisor} ហើយបាន ${dividend}។`
                : `Hint: Find the number that multiplied by ${divisor} gives ${dividend}.`;

    }


    /* ================= ALGEBRA ================= */

    else if (topic === "algebra") {

        let a;
        let x;
        let b;
        let c;


        if (difficulty === "easy") {

            a = randomNumber(2, 5);

            x = randomNumber(1, 10);

            b = randomNumber(1, 10);

        }

        else if (difficulty === "medium") {

            a = randomNumber(2, 10);

            x = randomNumber(1, 20);

            b = randomNumber(5, 30);

        }

        else {

            a = randomNumber(3, 15);

            x = randomNumber(1, 30);

            b = randomNumber(10, 50);

        }


        c = a * x + b;

        answer = x;

        questionText =
            `${a}x + ${b} = ${c}`;

        hintText =
            currentLanguage === "km"
                ? `គន្លឹះ៖ ដក ${b} ពីភាគីទាំងពីរ រួចចែកនឹង ${a}។`
                : `Hint: Subtract ${b} from both sides, then divide by ${a}.`;

    }


    /* ================= DISPLAY ================= */

    currentAnswer = answer;
    currentHint = hintText;

    questionCount++;

    updateQuestionNumber();

    question.textContent =
        questionText;

    hint.textContent =
        currentHint;

    hint.classList.add("hidden");

    feedback.textContent = "";

    feedback.className =
        "feedback hidden";

    userAnswer.value = "";

    updateScoreBoard();

}


/* =====================================================
   GENERATE BUTTON
===================================================== */

if (generateButton) {

    generateButton.addEventListener(
        "click",
        generateQuestion
    );

}


/* =====================================================
   HINT BUTTON
===================================================== */

if (hintButton) {

    hintButton.addEventListener("click", () => {

        if (currentAnswer === null) {

            if (currentLanguage === "km") {

                hint.textContent =
                    "សូមបង្កើតលំហាត់ជាមុនសិន។";

            } else {

                hint.textContent =
                    "Please generate a question first.";

            }

            hint.classList.remove("hidden");

            return;
        }


        hint.textContent =
            currentHint;

        hint.classList.remove("hidden");

    });

}


/* =====================================================
   CHECK ANSWER
===================================================== */

if (checkButton) {

    checkButton.addEventListener("click", () => {

        if (currentAnswer === null) {

            feedback.textContent =
                currentLanguage === "km"
                    ? "សូមបង្កើតលំហាត់ជាមុនសិន។"
                    : "Please generate a question first.";

            feedback.className =
                "feedback incorrect";

            return;

        }


        const input =
            userAnswer.value.trim();


        if (input === "") {

            feedback.textContent =
                currentLanguage === "km"
                    ? "សូមបញ្ចូលចម្លើយជាមុនសិន។"
                    : "Please enter your answer.";

            feedback.className =
                "feedback incorrect";

            return;

        }


        const numericAnswer =
            Number(input);


        if (numericAnswer === currentAnswer) {

            correctCount++;

            score += 10;

            feedback.textContent =
                currentLanguage === "km"
                    ? "🎉 ត្រឹមត្រូវ! អស្ចារ្យណាស់! +10 ពិន្ទុ"
                    : "🎉 Correct! Excellent! +10 points";

            feedback.className =
                "feedback correct";

        }

        else {

            feedback.textContent =
                currentLanguage === "km"
                    ? "❌ មិនត្រឹមត្រូវទេ។ សូមព្យាយាមម្តងទៀត។"
                    : "❌ Incorrect. Please try again.";

            feedback.className =
                "feedback incorrect";

        }


        updateScoreBoard();

    });

}


/* =====================================================
   SHOW ANSWER
===================================================== */

if (showAnswerButton) {

    showAnswerButton.addEventListener("click", () => {

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
                ? `ចម្លើយត្រឹមត្រូវគឺ៖ ${currentAnswer}`
                : `The correct answer is: ${currentAnswer}`;

        feedback.className =
            "feedback correct";

    });

}


/* =====================================================
   UPDATE SCORE BOARD
===================================================== */

function updateScoreBoard() {

    if (scoreElement) {
        scoreElement.textContent = score;
    }

    if (totalQuestionsElement) {
        totalQuestionsElement.textContent =
            questionCount;
    }

    if (correctAnswersElement) {
        correctAnswersElement.textContent =
            correctCount;
    }

}


/* =====================================================
   ENTER KEY = CHECK ANSWER
===================================================== */

if (userAnswer) {

    userAnswer.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            checkButton.click();

        }

    });

}


/* =====================================================
   WORKSHEET BUTTONS
===================================================== */

const worksheetButtons =
    document.querySelectorAll(
        ".worksheet-card .outline-button"
    );


worksheetButtons.forEach(button => {

    button.addEventListener("click", () => {

        alert(
            currentLanguage === "km"
                ? "សន្លឹកកិច្ចការនឹងមានក្នុង Version បន្ទាប់។"
                : "Worksheets will be available in a future version."
        );

    });

});


/* =====================================================
   GRADE BUTTONS
===================================================== */

const gradeButtons =
    document.querySelectorAll(
        ".grade-card .outline-button"
    );


gradeButtons.forEach(button => {

    button.addEventListener("click", () => {

        alert(
            currentLanguage === "km"
                ? "មេរៀនសម្រាប់ថ្នាក់នេះនឹងត្រូវបន្ថែមនៅ Version បន្ទាប់។"
                : "Lessons for this grade will be added in a future version."
        );

    });

});


/* =====================================================
   CALCULATOR
===================================================== */

let calculatorExpression = "";


/*
   Calculator number/operator buttons
*/

const calculatorButtons =
    document.querySelectorAll(
        ".calculator-buttons button[data-value]"
    );


calculatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        const value =
            button.getAttribute("data-value");


        calculatorExpression += value;

        calculatorDisplay.value =
            calculatorExpression;

    });

});


/* =====================================================
   CALCULATOR CLEAR
===================================================== */

if (calculatorClear) {

    calculatorClear.addEventListener("click", () => {

        calculatorExpression = "";

        calculatorDisplay.value = "";

    });

}


/* =====================================================
   CALCULATOR EQUALS
===================================================== */

if (calculatorEquals) {

    calculatorEquals.addEventListener("click", () => {

        if (!calculatorExpression) {
            return;
        }


        /*
           Allow only:
           numbers
           decimal point
           + - * /
           parentheses
        */

        const safeExpression =
            /^[0-9+\-*/().\s]+$/;


        if (!safeExpression.test(
            calculatorExpression
        )) {

            calculatorDisplay.value =
                "Error";

            calculatorExpression = "";

            return;

        }


        try {

            const result =
                Function(
                    `"use strict"; return (${calculatorExpression})`
                )();


            if (
                typeof result !== "number" ||
                !Number.isFinite(result)
            ) {

                calculatorDisplay.value =
                    "Error";

                calculatorExpression = "";

                return;

            }


            calculatorDisplay.value =
                result;

            calculatorExpression =
                String(result);

        }

        catch (error) {

            calculatorDisplay.value =
                "Error";

            calculatorExpression = "";

        }

    });

}


/* =====================================================
   CURRENT YEAR
===================================================== */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =====================================================
   INITIALIZATION
===================================================== */

loadDarkMode();

updateLanguage();

/*
   Generate the first question automatically.
*/

generateQuestion();
```
