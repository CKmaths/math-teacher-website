/* =========================
   MOBILE MENU
========================= */
const menuToggle =
    document.getElementById("menuToggle");
const navLinks =
    document.getElementById("navLinks");
menuToggle.addEventListener(
    "click",
    function () {
navLinks.classList.toggle("active");
}
);
/* Close mobile menu
   after clicking a link
*/
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
/* =========================
   DARK MODE
========================= */
const themeToggle =
    document.getElementById("themeToggle");
themeToggle.addEventListener(
    "click",
    function () {
document.body.classList.toggle("dark");
const darkMode =
            document.body.classList.contains("dark");
if (darkMode) {
themeToggle.textContent = "☀️";
localStorage.setItem(
                "theme",
                "dark"
            );
} else {
themeToggle.textContent = "🌙";
localStorage.setItem(
                "theme",
                "light"
            );
}
}
);
/* Load saved theme */
const savedTheme =
    localStorage.getItem("theme");
if (savedTheme === "dark") {
document.body.classList.add("dark");
themeToggle.textContent = "☀️";
}
/* =========================
   LANGUAGE
========================= */
const languageToggle =
    document.getElementById("languageToggle");
let currentLanguage =
    localStorage.getItem("language") || "km";
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
languageToggle.textContent =
            "🇬🇧 EN";
} else {
document.documentElement.lang = "en";
languageToggle.textContent =
            "🇰🇭 KH";
}
localStorage.setItem(
        "language",
        language
    );
}
languageToggle.addEventListener(
    "click",
    function () {
if (currentLanguage === "km") {
changeLanguage("en");
} else {
changeLanguage("km");
}
}
);
/* Load saved language */
changeLanguage(currentLanguage);
/* =========================
   EXERCISE ANSWER
========================= */
const answerButton =
    document.getElementById("answerButton");
const answer =
    document.getElementById("answer");
answerButton.addEventListener(
    "click",
    function () {
if (currentLanguage === "km") {
answer.textContent =
                "ចម្លើយ៖ x = 6";
} else {
answer.textContent =
                "Answer: x = 6";
}
}
);
/* =========================
   COMING SOON
========================= */
function comingSoon() {
if (currentLanguage === "km") {
alert(
            "មុខងារនេះនឹងមាននៅ Version បន្ទាប់។"
        );
} else {
alert(
            "This feature will be available in the next version."
        );
}
}
/* =========================
   CALCULATOR
========================= */
function addToDisplay(value) {
document.getElementById(
        "display"
    ).value += value;
}
function clearDisplay() {
document.getElementById(
        "display"
    ).value = "";
}
function deleteLast() {
const display =
        document.getElementById("display");
display.value =
        display.value.slice(0, -1);
}
function calculate() {
const display =
        document.getElementById("display");
const expression =
        display.value;
if (!expression) {
        return;
    }
try {
/*
         * This calculator is intended
         * for basic arithmetic.
         */
if (
            !/^[0-9+\-*/().\s]+$/
                .test(expression)
        ) {
throw new Error(
                "Invalid expression"
            );
}
display.value =
            Function(
                "return (" +
                expression +
                ")"
            )();
} catch {
display.value = "Error";
}
}
