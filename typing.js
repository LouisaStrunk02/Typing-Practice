import { getCurrentChar } from "./getCurrentChar.js";
import { getTextFromApi } from "./getTextFromApi.js";
// import { resetRun } from "./resetRun.js";

const body = document.getElementsByTagName("body")[0];
const textarea = document.querySelectorAll(".main__textarea");
const restText = document.querySelector(".main__textarea--rest");
const inputfield = document.querySelector(".main__inputfield");
const errorMessage = document.querySelector(".input__error");
const newTextButton = document.querySelector("#newTextButton");
const resetRunButton = document.querySelector("#resetRunButton");

let text;

var incorrectChar = false;
var validInput = true;

const MAXWORDS = 30;
var textLength = 10;

async function showText() {
  text = await getTextFromApi(textLength);
  restText.innerHTML = text;
  const current = getCurrentChar();
  restText.innerHTML = restText.innerHTML.slice(1);
  textarea[0].insertBefore(current, restText);
  errorMessage.innerHTML = "";
  incorrectChar = false;
  newTextButton.blur();
  inputfield.blur();
}

function checkIfEnter(event) {
  if (event.key !== "Enter") {
    return;
  }
  checkTextLength();
  inputfield.blur();
}

function checkTextLength() {
  let current = document.querySelector(".main__textarea--current");
  textLength = inputfield.value;

  if (textLength > MAXWORDS) {
    errorMessage.innerHTML = "Max words: 30!";
    restText.innerHTML = "";
    current.innerHTML = "";
    validInput = false;
  }
  else if (textLength <= 0) {
    errorMessage.innerHTML = "That`s not possible!";
    restText.innerHTML = "";
    current.innerHTML = "";
    validInput = false;
  }
  else {
    validInput = true;

    removeCurrentsCorrectsIncorrects(current);
    showText();
  }
}

function checkKey(event) {
  if (validInput == false) {
    return;
  }

  if (inputfield === document.activeElement) {
    event.stopPropagation();
  }
  else {

    let current = document.querySelector(".main__textarea--current");

    if (event.key == current.innerHTML[0] && !incorrectChar) {
      current.className = "main__textarea--correct";
      current = getCurrentChar();
      restText.innerHTML = restText.innerHTML.slice(1);
      textarea[0].insertBefore(current, restText);
    }
    else if (event.key != current.innerHTML[0] && !incorrectChar) {
      incorrectChar = true;
    }
    else if (event.key == current.innerHTML[0] && incorrectChar) {
      current.className = "main__textarea--incorrect";
      current = getCurrentChar();
      restText.innerHTML = restText.innerHTML.slice(1);
      textarea[0].insertBefore(current, restText);
      incorrectChar = false;
    }

    if (restText.innerHTML == 0 && current.innerHTML == "undefined") {

      removeCurrentsCorrectsIncorrects(current);
      showText();
    }
  }
}

export function resetRun() {
  let current = document.querySelector(".main__textarea--current");
  // const restText = document.querySelector(".main__textarea--rest");
  // const textarea = document.querySelectorAll(".main__textarea");
  // const errorMessage = document.querySelector(".input__error");
  // const resetRunButton = document.querySelector("#resetRunButton");

  // const corrects = document.querySelectorAll('.main__textarea--correct');
  // const incorrects = document.querySelectorAll('.main__textarea--incorrect');

  // current.remove();

  // corrects.forEach(correctKey => {
  //   correctKey.remove();
  // });

  // incorrects.forEach(incorrectKey => {
  //   incorrectKey.remove();
  // });

  removeCurrentsCorrectsIncorrects(current);

  restText.innerHTML = text;
  current = getCurrentChar();
  restText.innerHTML = restText.innerHTML.slice(1);
  textarea[0].insertBefore(current, restText);
  errorMessage.innerHTML = "";
  resetRunButton.blur();
}

export function removeCurrentsCorrectsIncorrects(currentChar) {
  let current = currentChar;
  const corrects = document.querySelectorAll('.main__textarea--correct');
  const incorrects = document.querySelectorAll('.main__textarea--incorrect');

  current.remove();

  corrects.forEach(correctKey => {
    correctKey.remove();
  });

  incorrects.forEach(incorrectKey => {
    incorrectKey.remove();
  });
}

window.addEventListener("load", () => showText());
inputfield.addEventListener("keypress", (event) => checkIfEnter(event));
newTextButton.addEventListener("click", () => checkTextLength());
body.addEventListener("keydown", (event) => checkKey(event));
resetRunButton.addEventListener("click", () => resetRun());
