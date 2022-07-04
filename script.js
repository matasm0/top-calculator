let num1_str = "0", num2_str = null;

let operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(x => x.addEventListener('mousedown', e => operate(num1_str, num2_str, e.target.classList[0])));

let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(x => x.addEventListener('mousedown', e => inputNum(e.target.classList[0])));

let screen = document.querySelector(".screen");

let operators = {
    "add": add,
    "subtract": subtract,
    "multiply": multiply,
    "divide": divide,
    "equals": equals,
}

///////////////////////////////////

function reset() {
    num1_str = "0";
    num2_str = null;
    updateScreen();
}

function updateScreen() {
    // Make decimals and stuff shorter
    screen.textContent = num2_str;
}


function inputNum(num) {
    if (num2_str === null) num2_str = "";
    if (num2_str.length >= 9) return;
    num2_str += num; 
    console.log(num2_str);
    updateScreen();
}

function add(num1, num2) {
    return num1 + num2;
}
function subtract(num1, num2) {
    return num1 - num2;
}
function multiply(num1, num2) {
    return num1 * num2;
}
function divide(num1, num2) {
    if (!num2) return null;
    return num1 / num2;
}
function equals(num1, num2) {
    return num1;
}

function operate(num1, num2, operator) {
    if (num2_str === null) return;

    num1 = +num1;
    num2 = +num2;

    let newVal = operators[operator];

    console.log(newVal);
    screen.textContent = num1_str;
}

reset();
