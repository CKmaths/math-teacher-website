// =========================
// MOBILE MENU
// =========================

function toggleMenu() {

    const navLinks =
        document.getElementById("navLinks");

    navLinks.classList.toggle("active");
}


// =========================
// MESSAGE
// =========================

function showMessage(message) {

    alert(message);
}


// =========================
// EXERCISE ANSWER
// =========================

function showAnswer() {

    const answer =
        document.getElementById("answer");

    answer.textContent =
        "Answer: x = 6";
}


// =========================
// CALCULATOR
// =========================

function addToDisplay(value) {

    document.getElementById("display").value += value;
}


function clearDisplay() {

    document.getElementById("display").value = "";
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

    try {

        display.value =
            Function(
                "return " + display.value
            )();

    } catch {

        display.value = "Error";
    }
}
