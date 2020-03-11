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
  // document.getElementById("result").style.display = "none";
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
    console.log("too big");
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

document
  .getElementById("fibo-button")
  .addEventListener("click", fibonacciServer);

function fiboResults() {
  showResultsSpinner();
  let resultUrl = "http://localhost:5050/getFibonacciResults";
  fetch(resultUrl)
    .then(response => response.json())
    .then(data => {
      let resultsArray = data.results;
      hideResultsSpinner();
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
window.onload = fiboResults;

document.getElementById("fibo-button").addEventListener("click", fiboResults);
