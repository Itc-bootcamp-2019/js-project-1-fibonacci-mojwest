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

function fibonacciServer() {
  let userInput = document.getElementById("fibo-input").value;
  console.log(userInput);
  fetch(`http://localhost:5050/fibonacci/${userInput}`)
    .then(response => response.json())
    .then(data => {
      console.log(data.result);
      document.getElementById("result").innerText = data.result;
    })
    .catch(err => console.error(err));
}

document
  .getElementById("fibo-button")
  .addEventListener("click", fibonacciServer);
