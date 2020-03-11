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
