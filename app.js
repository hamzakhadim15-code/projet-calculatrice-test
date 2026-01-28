document.addEventListener("DOMContentLoaded", function () {

    const display = document.getElementById("display");
    const historyList = document.getElementById("historyList");
    const historyBox = document.querySelector(".history");
    const historyToggleBtn = document.getElementById("historyToggle");

     
    historyBox.style.display = "none";

    
    window.appendValue = function(value) {
        display.value += value;
    }

    window.clearDisplay = function() {
        display.value = "";
    }

    window.backspace = function() {
        display.value = display.value.slice(0, -1);
    }

    window.calculateResult = function() {
        try {
            const expression = display.value;
            const result = eval(expression);

            saveToHistory(expression + " = " + result);
            display.value = result;
        } catch {
            display.value = "Erreur";
        }
    }

    
    function saveToHistory(operation) {
        let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

        history.unshift(operation);
        if (history.length > 3) history.pop();

        localStorage.setItem("calcHistory", JSON.stringify(history));
        renderHistory();
    }

    
    function renderHistory() {
        let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
        historyList.innerHTML = "";

        history.forEach(item => {
            let li = document.createElement("li");
            li.textContent = item;
            historyList.appendChild(li);
        });
    }

    
    historyToggleBtn.addEventListener("click", function () {
        if (historyBox.style.display === "none") {
            historyBox.style.display = "block";
            historyToggleBtn.style.opacity = "1";
        } else {
            historyBox.style.display = "none";
            historyToggleBtn.style.opacity = "0.6";
        }
    });

    renderHistory();
});
