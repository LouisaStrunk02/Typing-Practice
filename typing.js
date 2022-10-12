import { getTextFromApi } from "./getTextFromApi.js";

const textarea = document.querySelector(".main__textarea");
const inputfield = document.querySelector(".main__inputfield");
const errorMessage = document.querySelector(".input__error");
const newTextButton = document.querySelector("#newTextButton");

var text;

const MAXWORDS = 30;
var textLength = 10;

async function showText() {
  text = await getTextFromApi(textLength);
  textarea.innerHTML = text;
  errorMessage.innerHTML = "";
}

function checkIfEnter(event) {
  if (event.key !== "Enter") {
    return;
  }

  checkTextLength();
  inputfield.blur();
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
    showText();
  }
}

window.addEventListener("load", () => showText());
inputfield.addEventListener("keypress", (event) => checkIfEnter(event));
newTextButton.addEventListener("click", () => checkTextLength());
