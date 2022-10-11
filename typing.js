import { getWordsFromApi } from "./getWordsFromApi.js";

const body = document.getElementsByTagName("body")[0];
const textarea = document.querySelectorAll(".main__textarea");
const restText = document.querySelector(".main__textarea--rest");
const inputfield = document.querySelector(".main__inputfield");
const errorMessage = document.querySelector(".input__error");
const newTextButton = document.querySelector("#newTextButton");
const resetRunButton = document.querySelector("#resetRunButton");

var text;
var current;
var corrects;
var incorrects;

var incorrectKey = false;
var pressedEnter = false;

const MAXWORDS = 30;
var textLength = 10;

async function getRandomText() {
  text = await getWordsFromApi(textLength);
  restText.innerHTML = text;
  current = getCurrentChar();
  restText.innerHTML = restText.innerHTML.slice(1);
  textarea[0].insertBefore(current, restText);
  errorMessage.innerHTML = "";
  incorrectKey = false;
  newTextButton.blur();
  inputfield.blur();
}

function checkIfEnter(event) {
  if (event.key === "Enter") {
    checkTextLength();
    inputfield.blur();
    pressedEnter = true;
  }
  else {
    pressedEnter = false;
    return;
  }
}

function checkTextLength() {
  textLength = inputfield.value;

  if (textLength > MAXWORDS) {
    errorMessage.innerHTML = "Max words: 30!";
    restText.innerHTML = "";
    current.innerHTML = "";
  }
  else if (textLength <= 0) {
    errorMessage.innerHTML = "That`s impossible!";
    restText.innerHTML = "";
    current.innerHTML = "";
  }
  else {
    corrects = document.querySelectorAll(".main__textarea--correct");
    incorrects = document.querySelectorAll(".main__textarea--incorrect");

    current.remove();

    corrects.forEach(correctKey => {
      correctKey.remove();
    })

    incorrects.forEach(incorrectKey => {
      incorrectKey.remove();
    })

    getRandomText();
  }
}

function checkKey(event) {

  if (inputfield === document.activeElement) {
    event.stopPropagation();
  }
  else {

    if (event.key == current.innerHTML[0] && !incorrectKey) {
      current.className = "main__textarea--correct";
      current = getCurrentChar();
      restText.innerHTML = restText.innerHTML.slice(1);
      textarea[0].insertBefore(current, restText);
    }
    else if (event.key != current.innerHTML[0] && !incorrectKey) {
      incorrectKey = true;
    }
    else if (event.key == current.innerHTML[0] && incorrectKey) {
      current.className = "main__textarea--incorrect";
      current = getCurrentChar();
      restText.innerHTML = restText.innerHTML.slice(1);
      textarea[0].insertBefore(current, restText);
      incorrectKey = false;
    }

    if (current.innerHTML == "undefined") {
      current.innerHTML = 0;
    }

    if (restText.innerHTML == 0 && current.innerHTML == 0) {
      corrects = document.querySelectorAll('.main__textarea--correct');
      incorrects = document.querySelectorAll('.main__textarea--incorrect');

      current.remove();

      corrects.forEach(correctKey => {
        correctKey.remove();
      });

      incorrects.forEach(incorrectKey => {
        incorrectKey.remove();
      });

      getRandomText();
    }
  }
}

function resetRun() {
  corrects = document.querySelectorAll('.main__textarea--correct');
  incorrects = document.querySelectorAll('.main__textarea--incorrect');

  current.remove();

  corrects.forEach(correctKey => {
    correctKey.remove();
  });

  incorrects.forEach(incorrectKey => {
    incorrectKey.remove();
  });

  restText.innerHTML = text;
  current = getCurrentChar();
  restText.innerHTML = restText.innerHTML.slice(1);
  textarea[0].insertBefore(current, restText);
  errorMessage.innerHTML = "";
  incorrectKey = false;
  resetRunButton.blur();
}

function getCurrentChar() {
  var currentChar;
  currentChar = document.createElement("SPAN");
  currentChar.className = "main__textarea--current";
  currentChar.innerHTML = restText.innerHTML[0];

  return currentChar;
}

document.addEventListener("load", getRandomText());
inputfield.addEventListener("keypress", (event) => checkIfEnter(event));
newTextButton.addEventListener("click", checkTextLength);
body.addEventListener("keydown", checkKey);
resetRunButton.addEventListener("click", resetRun);
