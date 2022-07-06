let toScreen = "0";

let num1_str = "0", num2_str = null;
let operator = "add";

let hasDec = false, hasNeg = false;
let lock = false;

let operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(x => x.addEventListener('mousedown', e => {operate(num1_str, num2_str, operator);
                                                                   operator = e.target.classList[0];}));

let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(x => x.addEventListener('mousedown', e => inputNum(e.target.classList[0])));

let specialButton = document.querySelector(".AC");
specialButton.addEventListener('mousedown', ()=>reset());

specialButton = document.querySelector(".pm")
specialButton.addEventListener('mousedown', ()=>pm());

specialButton = document.querySelector(".E");
specialButton.addEventListener('mousedown', () => E());

specialButton = document.querySelector(".dec");
specialButton.addEventListener('mousedown', () => addDecimal()); 

specialButton = document.querySelector(".backspace");
specialButton.addEventListener('mousedown', () => backspace());



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
    operator = "add";
    hasDec = hasNeg = false;
    lock = false;
    toScreen = num1_str;
    updateScreen();
}

function updateScreen() {
    if (lock) return;
    subNeg = (toScreen.indexOf('-') != -1) ? 1 : 0;
    subDec = (toScreen.indexOf('.') != -1) ? 1 : 0;

    if (toScreen.length - subNeg - subDec > 9) {
        if (toScreen.indexOf('.') != -1) toScreen = +(+toScreen).toFixed(((toScreen.length < 10) ? toScreen.length : 10) - 1 - toScreen.indexOf('.') + subNeg);
        else {
            toScreen = toScreen[0] + `e${toScreen.length - 1}`;
            lock = true;
        }   
    }
    screen.textContent = toScreen;
}


function inputNum(num) {
    if (lock) return;
    if (num2_str === null || num2_str == "0") num2_str = "";
    if (num2_str.length >= 10 || ((!hasDec && !hasNeg) && num2_str.length >= 9)) return;
    num2_str += num; 
    toScreen = num2_str;
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
    if (num2_str === null) return;
    return num2;
}


function operate(num1, num2, operator) {
    if (num2_str === null || lock) return;

    hasDec = false;
    hasNeg = false;

    num1 = +num1;
    num2 = +num2;

    num1_str = operators[operator](num1, num2);
    if (num1_str == null) {
        reset();
        lock = true;
        screen.textContent = "Oops!";
    }

    num1_str = num1_str.toString();
    num2_str = null;

    if (+num1_str < 0) hasNeg = true;
    
    toScreen = num1_str;
    updateScreen();
}

function addDecimal() {
    if (hasDec || lock) return;
    if (num2_str == null) num2_str = "0";
    if ((num2_str.length >= 10 && hasNeg) || num2_str.length >= 9) return;
    toScreen = num2_str += ".";
    hasDec = true;
    updateScreen();
}


function pm() {
    if (lock) return;
    if (num2_str === null) {
        toScreen = num1_str=(+num1_str*(-1)).toString();
        updateScreen();
        return;
    }
    toScreen = num2_str=(+num2_str*(-1)).toString(); updateScreen();
    hasNeg = !hasNeg;
}

function backspace() {
    if (lock || num2_str === null || num2_str.length <= 0) return;
    if (num2_str[num2_str.length - 1] == '.') hasDec = false;
    toScreen = num2_str = num2_str.length > 1 ? num2_str.substring(0, num2_str.length - 1) : "0";
    if (num2_str == '-') toScreen = num2_str = "0";
    updateScreen();
}

function E() {
    reset();
    screen.textContent = "EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE";
    lock = true;
}

reset();
