import { getCurrentChar, removeCurrent, removeCorrectsIncorrects } from "./currentHandler.js";
import { getTextFromApi } from "./getTextFromApi.js";
import { resetRun } from "./resetRun.js";
import { setText, updateTextarea } from "./textHandler.js";

const body = document.getElementsByTagName("body")[0];
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
  updateTextarea(text);
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
    removeCorrectsIncorrects();
  }
  else if (textLength <= 0) {
    errorMessage.innerHTML = "That`s not possible!";
    restText.innerHTML = "";
    current.innerHTML = "";
    removeCorrectsIncorrects();
    validInput = false;
  }
  else {
    validInput = true;

    removeCurrent(current);
    removeCorrectsIncorrects();
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
      setText(current);
    }
    else if (event.key != current.innerHTML[0] && !incorrectChar) {
      incorrectChar = true;
    }
    else if (event.key == current.innerHTML[0] && incorrectChar) {
      current.className = "main__textarea--incorrect";
      current = getCurrentChar();
      setText(current);
      incorrectChar = false;
    }

    if (restText.innerHTML == 0 && current.innerHTML == "undefined") {
      removeCurrent(current);
      removeCorrectsIncorrects();
      showText();
    }
  }
}

window.addEventListener("load", () => showText());
inputfield.addEventListener("keypress", (event) => checkIfEnter(event));
newTextButton.addEventListener("click", () => checkTextLength());
body.addEventListener("keydown", (event) => checkKey(event));
resetRunButton.addEventListener("click", () => resetRun(text, removeCurrent, removeCorrectsIncorrects, updateTextarea));
