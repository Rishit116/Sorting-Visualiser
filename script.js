let array = [];
let isSorting = false;
const buttons = document.querySelectorAll("button");

function getDelay() {
  const speed = document.getElementById("speed").value;
  return Math.floor(1000 / speed);
}

function disableButtons(disable) {
  buttons.forEach((button) => (button.disabled = disable));
}

function generateArray() {
  if (isSorting) return;
  const container = document.getElementById("array-container");
  container.innerHTML = "";
  array = [];
  for (let i = 0; i < 60; i++) {
    let value = Math.floor(Math.random() * 100) + 10;
    array.push(value);
    let bar = document.createElement("div");
    bar.style.height = `${value * 3}px`;
    bar.classList.add("bar");
    container.appendChild(bar);
  }
}

async function startSort(algorithm) {
  if (isSorting) return;
  isSorting = true;
  disableButtons(true);

  switch (algorithm) {
    case "bubble":
      await bubbleSort();
      break;
    case "selection":
      await selectionSort();
      break;
    case "insertion":
      await insertionSort();
      break;
  }

  isSorting = false;
  disableButtons(false);
}

async function swap(i, j, bars) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  bars[i].style.height = `${array[i] * 3}px`;
  bars[j].style.height = `${array[j] * 3}px`;
  await new Promise((resolve) => setTimeout(resolve, getDelay()));
}

// Bubble Sort
async function bubbleSort() {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";
      await new Promise((resolve) => setTimeout(resolve, getDelay()));
      if (array[j] > array[j + 1]) {
        await swap(j, j + 1, bars);
      }
      bars[j].style.backgroundColor = "blue";
      bars[j + 1].style.backgroundColor = "blue";
    }
    bars[array.length - i - 1].style.backgroundColor = "green";
  }
  bars[0].style.backgroundColor = "green";
}

// Selection Sort
async function selectionSort() {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length - 1; i++) {
    let minIdx = i;
    bars[i].style.backgroundColor = "red";
    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = "orange";
      await new Promise((resolve) => setTimeout(resolve, getDelay()));
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
      bars[j].style.backgroundColor = "blue";
    }
    await swap(i, minIdx, bars);
    bars[i].style.backgroundColor = "green";
  }
}

// Insertion Sort
async function insertionSort() {
  let bars = document.getElementsByClassName("bar");
  bars[0].style.backgroundColor = "green";
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    bars[i].style.backgroundColor = "red";
    await new Promise((resolve) => setTimeout(resolve, getDelay()));
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = bars[j].style.height;
      bars[j + 1].style.backgroundColor = "red";
      j--;
      await new Promise((resolve) => setTimeout(resolve, getDelay()));
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${key * 3}px`;
    for (let k = 0; k <= i; k++) {
      bars[k].style.backgroundColor = "green";
    }
    await new Promise((resolve) => setTimeout(resolve, getDelay()));
  }
}

window.onload = generateArray;
