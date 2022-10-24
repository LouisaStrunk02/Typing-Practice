import { getCurrentChar, removeAllChars } from "./currentHandler.js";
import { getTextFromApi } from "./getTextFromApi.js";
import { resetRun } from "./resetRun.js";
import { removeCurrentCharFromRestText, updateTextarea } from "./textHandler.js";

const body = document.getElementsByTagName("body")[0];
const restText = document.querySelector(".main__textarea--rest");
const inputfield = document.querySelector(".main__inputfield");
const errorMessage = document.querySelector(".input__error");
const newTextButton = document.querySelector("#newTextButton");
const resetRunButton = document.querySelector("#resetRunButton");

let text;

var incorrectChar = false;
var textLengthInValidArea = true;

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
  let currentChar = document.querySelector(".main__textarea--current");
  textLength = inputfield.value;

  if (textLength > MAXWORDS) {
    errorMessage.innerHTML = "Max words: 30!";
    restText.innerHTML = "";
    currentChar.innerHTML = "";
    textLengthInValidArea = false;
  }
  else if (textLength <= 0) {
    errorMessage.innerHTML = "That`s not possible!";
    restText.innerHTML = "";
    currentChar.innerHTML = "";
    textLengthInValidArea = false;
  }
  else {
    textLengthInValidArea = true;

    removeAllChars(currentChar);
    showText();
  }
}

function checkKey(event) {
  if (textLengthInValidArea == false) {
    return;
  }

  inputfieldIsClicked = inputfield === document.activeElement
  if (inputfieldIsClicked) {
    event.stopPropagation();
  }
  else {
    let currentChar = document.querySelector(".main__textarea--current");
    const typedCorrectlyOnFirstTry = event.key == currentChar.innerHTML[0] && !incorrectChar;
    const typedIncorrectlyOnFirstTry = event.key != currentChar.innerHTML[0] && !incorrectChar;
    const typedCorrctlyAfterSeveralTries = event.key == currentChar.innerHTML[0] && incorrectChar;

    if (typedCorrectlyOnFirstTry) {
      currentChar.className = "main__textarea--correct";
      currentChar = getCurrentChar();
      removeCurrentCharFromRestText(currentChar);
    }
    else if (typedIncorrectlyOnFirstTry) {
      incorrectChar = true;
    }
    else if (typedCorrctlyAfterSeveralTries) {
      currentChar.className = "main__textarea--incorrect";
      currentChar = getCurrentChar();
      removeCurrentCharFromRestText(currentChar);
      incorrectChar = false;
    }

    const isEndOfText = restText.innerHTML == 0 && currentChar.innerHTML == "undefined";

    if (isEndOfText) {
      removeAllChars(currentChar);
      showText();
    }
  }
}

window.addEventListener("load", () => showText());
inputfield.addEventListener("keypress", (event) => checkIfEnter(event));
newTextButton.addEventListener("click", () => checkTextLength());
body.addEventListener("keydown", (event) => checkKey(event));
resetRunButton.addEventListener("click", () => resetRun(text, removeAllChars, updateTextarea));
