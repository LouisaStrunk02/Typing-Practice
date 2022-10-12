import { getCurrentChar, removeAllChars } from "./currentHandler.js";
import { getTextFromApi } from "./getTextFromApi.js";
import { resetRun } from "./resetRun.js";
import { setText, updateTextarea } from "./textHandler.js";

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

    removeAllChars(current);
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
    const typedCorrectlyOnFirstTry = event.key == current.innerHTML[0] && !incorrectChar;
    const typedIncorrectlyOnFirstTry = event.key != current.innerHTML[0] && !incorrectChar;
    const typedCorrctlyAfterSeveralTries = event.key == current.innerHTML[0] && incorrectChar;

    if (typedCorrectlyOnFirstTry) {
      current.className = "main__textarea--correct";
      current = getCurrentChar();
      setText(current);
    }
    else if (typedIncorrectlyOnFirstTry) {
      incorrectChar = true;
    }
    else if (typedCorrctlyAfterSeveralTries) {
      current.className = "main__textarea--incorrect";
      current = getCurrentChar();
      setText(current);
      incorrectChar = false;
    }

    const isEndOfText = restText.innerHTML == 0 && current.innerHTML == "undefined";

    if (isEndOfText) {
      removeAllChars(current);
      showText();
    }
  }
}

window.addEventListener("load", () => showText());
inputfield.addEventListener("keypress", (event) => checkIfEnter(event));
newTextButton.addEventListener("click", () => checkTextLength());
body.addEventListener("keydown", (event) => checkKey(event));
resetRunButton.addEventListener("click", () => resetRun(text, removeAllChars, updateTextarea));
