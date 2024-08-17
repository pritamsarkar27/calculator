  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".button");
  const clearButton = document.getElementById("clear");
  const equalsButton = document.getElementById("equals");
  const del=document.getElementById("delete");

  let currentInput = "";
  let operator = null;
  let previousInput = "";

  const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "X": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      if ((value >= "0" && value <= "9") || value === ".") {
        currentInput += value;
        display.value = currentInput;
      } else if (value in operations) {
        if (currentInput === "" && previousInput !== "") {
          operator = value;
          display.value = `${previousInput} ${operator}`;
        } else if (currentInput !== "") {
          if (previousInput !== "") {
            currentInput = calculate(previousInput, currentInput, operator);
            display.value = currentInput;
          }
          operator = value;
          previousInput = currentInput;
          currentInput = "";
          display.value = `${previousInput} ${operator}`;
        }
      } else if (value === "=") {
        if (
          previousInput !== "" &&
          currentInput !== "" &&
          operator !== null
        ) {
          currentInput = calculate(previousInput, currentInput, operator);
          display.value = currentInput;
          previousInput = "";
          operator = null;
        }
      }
    });
  });

  clearButton.addEventListener("click", () => {
    currentInput = "";
    previousInput = "";
    operator = null;
    display.value = "";
  });
  del.addEventListener("click",()=>{
    currentInput=currentInput.toString().slice(0,-1);  
    display.value=currentInput; 
  });

  function calculate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    const result = operations[op](a, b);
    return result.toFixed(2);  
}

  
