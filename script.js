document.addEventListener("DOMContentLoaded", function () {
    const calculatorScreen = document.getElementById("calculator-screen");
    const keys = document.querySelector(".calculator-keys");

    let currentExpression = "";
    let shouldResetScreen = false;

    keys.addEventListener("click", (event) => {
        const { target } = event;
        const { value } = target;

        if (!target.matches("button")) return;

        if (shouldResetScreen && value !== "=") {
            resetCalculator();
        }

        switch (value) {
            case "+":
            case "-":
            case "*":
            case "/":
                handleOperator(value);
                break;
            case "=":
                calculate();
                break;
            case "all-clear":
                resetCalculator();
                break;
            case ".":
                inputDecimal();
                break;
            default:
                inputNumber(value);
        }

        updateScreen();
    });

    function updateScreen() {
        calculatorScreen.value = currentExpression;
    }

    function handleOperator(operator) {
        if (currentExpression === "") return;
        const lastChar = currentExpression.slice(-1);
        if ("+-*/".includes(lastChar)) {
            currentExpression = currentExpression.slice(0, -1) + operator;
        } else {
            currentExpression += operator;
        }
    }

    function calculate() {
        try {
            const result = eval(currentExpression);
            currentExpression = result.toString();
            shouldResetScreen = true;
        } catch (error) {
            currentExpression = "Error";
            shouldResetScreen = true;
        }
    }

    function inputNumber(number) {
        if (currentExpression === "Error") {
            currentExpression = number;
        } else {
            currentExpression += number;
        }
    }

    function inputDecimal() {
        const lastOperand = currentExpression.split(/[\+\-\*\/]/).pop();
        if (!lastOperand.includes(".")) {
            currentExpression += ".";
        }
    }

    function resetCalculator() {
        currentExpression = "";
        shouldResetScreen = false;
    }
});
