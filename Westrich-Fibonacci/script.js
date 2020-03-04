function fibonacci(x) {
  let firstPrev = 0;
  let secondPrev = 1;
  let fiboResult;

  for (let i = 1; i < x; i++) {
    fiboResult = secondPrev + firstPrev;
    firstPrev = secondPrev;
    secondPrev = fiboResult;
  }

  return fiboResult;
}

function fibonacciInput() {
  let userInput = document.getElementById("fibo-input");
  document.getElementById("y").innerText = fibonacci(userInput.value);
  console.log(userInput.value);
}

document
  .getElementById("fibo-button")
  .addEventListener("click", fibonacciInput);
