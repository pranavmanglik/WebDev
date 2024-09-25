let expression = "";
let history = JSON.parse(sessionStorage.getItem("history")) || [];

function updateDisplay(value) {
  document.getElementById("display").textContent = value;
}

function appendNumber(number) {
  if (expression === "ERROR!") expression = "";
  expression += number;
  updateDisplay(expression);
}

function appendOperator(operator) {
  if (expression === "ERROR!") expression = "";
  expression += operator;
  updateDisplay(expression);
}

function clearDisplay() {
  expression = "";
  updateDisplay("0");
}

function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay(expression || "0");
}

function calculateResult() {
  try {
    if (/[\+\-\*\/%\.]$/.test(expression)) {
      updateDisplay("ERROR!");
      return;
    }

    let result = Function('"use strict";return (' + expression + ")")();

    if (isNaN(result)) {
      updateDisplay("ERROR!");
    } else {
      updateDisplay(result);
      saveToHistory(`${expression} = ${result}`);
      expression = "";
    }
  } catch (error) {
    updateDisplay("ERROR!");
  }
}

function saveToHistory(calc) {
  history.unshift(calc);
  if (history.length > 10) history.pop();
  sessionStorage.setItem("history", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = history.map((item) => `<li>${item}</li>`).join("");
}

window.onload = function () {
  renderHistory();
};
