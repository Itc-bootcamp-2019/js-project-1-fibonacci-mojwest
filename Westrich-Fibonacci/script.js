function showSpinner() {
  document.getElementById("loader").style.visibility = "visible";
}
function hideSpinner() {
  document.getElementById("loader").style.visibility = "hidden";
}
function hideMol() {
  document.getElementById("mol").style.visibility = "hidden";
}
function showMol() {
  document.getElementById("mol").style.visibility = "visible";
}
function hideTooBig() {
  document.getElementById("toobig").style.visibility = "hidden";
}
function showTooBig() {
  document.getElementById("toobig").style.visibility = "visible";
}
function hideResult() {
  document.getElementById("result").style.visibility = "hidden";
}
function showResult() {
  document.getElementById("result").style.visibility = "visible";
}
function showResultsSpinner() {
  document.getElementById("resultsLoader").style.visibility = "visible";
}
function hideResultsSpinner() {
  document.getElementById("resultsLoader").style.visibility = "hidden";
}

function fibonacciServer() {
  showSpinner();
  let userInput = document.getElementById("fibo-input").value;
  console.log(userInput);
  if (userInput > 50) {
    document.getElementById("toobig").innerText =
      "Sorry, that number is too big.";
    hideMol();
    hideResult();
    showTooBig();
    hideSpinner();
  } else {
    let url = `http://localhost:5050/fibonacci/${userInput}`;
    fetch(url)
      .then(response => {
        if (response.status == 400) {
          showMol();
          hideResult();
          hideTooBig();
          throw response;
        }
        hideMol();
        showResult();
        hideTooBig();
        return response.json();
      })
      .then(data => {
        hideSpinner();
        console.log(data.result);
        document.getElementById("result").innerText = data.result;
      })
      .catch(error => error.text())
      .then(meaningOfLife => {
        hideSpinner();
        document.getElementById("mol").innerText = meaningOfLife;
        console.log(meaningOfLife);
      });
  }
}

function fiboResults() {
  showResultsSpinner();
  let resultUrl = "http://localhost:5050/getFibonacciResults";
  fetch(resultUrl)
    .then(response => response.json())
    .then(data => {
      hideResultsSpinner();
      data.results.sort((a, b) => b.createdDate - a.createdDate);
      let resultsArray = data.results;
      for (let i = 0; i < resultsArray.length; i++) {
        attempt = resultsArray[i];
        console.log(attempt);
        let dateCreated = new Date(attempt.createdDate);
        let ul = document.getElementById("listFromServer");
        ul.style.listStyle = "none";
        let li = document.createElement("li");
        li.innerHTML =
          "The Fibonacci of " +
          `<b>` +
          attempt.number +
          `</b>` +
          " is " +
          `<b>` +
          attempt.result +
          `</b>` +
          ". Calculated at: " +
          dateCreated;
        ul.appendChild(li);
      }
    });
}

function localFibonacci() {
  showSpinner();
  let userInput = document.getElementById("fibo-input").value;
  let firstPrev = 0;
  let secondPrev = 1;
  let fiboResult;

  for (let i = 1; i < userInput; i++) {
    fiboResult = secondPrev + firstPrev;
    firstPrev = secondPrev;
    secondPrev = fiboResult;
  }
  hideSpinner();
  document.getElementById("result").innerText = fiboResult;

  return fiboResult;
}

function serverOrLocal() {
  let checkBox = document.getElementById("checkbox");
  if (checkBox.checked === true) {
    fibonacciServer();
  } else {
    localFibonacci();
  }
}

window.onload = fiboResults;

document.getElementById("fibo-button").addEventListener("click", fiboResults);

document.getElementById("fibo-button").addEventListener("click", serverOrLocal);
