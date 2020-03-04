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

let x = 13;
let fibo = fibonacci(x);
console.log(fibo);

document.getElementById("x").innerText = x;
document.getElementById("y").innerText = fibo;
