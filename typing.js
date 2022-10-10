import { getWordsFromApi } from "./getWordsFromApi.js";

var textarea = document.querySelector(".main__textarea");
var inputfield = document.querySelector(".main__inputfield");
var errorMessage = document.querySelector(".input__error");
var newTextButton = document.querySelector("#newTextButton");

var textLength = 10;
const MAXWORDS = 30;

var text = await getWordsFromApi(textLength);

async function getRandomText() {
  text = await getWordsFromApi(textLength);
  textarea.innerHTML = text;
  errorMessage.innerHTML = "";
}

function checkIfEnter(event) {
  if (event.key === "Enter") {
    checkTextLength();
    inputfield.blur();
  }
  else {
    return;
  }
}

function checkTextLength() {
  textLength = inputfield.value;

  if (textLength > MAXWORDS) {
    errorMessage.innerHTML = "Max words: 30!";
    textarea.innerHTML = "";
  }
  else if (textLength <= 0) {
    errorMessage.innerHTML = "That`s impossible!";
    textarea.innerHTML = "";
  }
  else {
    getRandomText();
  }
}

document.addEventListener("load", getRandomText());
inputfield.addEventListener("keypress", (event) => checkIfEnter(event));
newTextButton.addEventListener("click", checkTextLength);
