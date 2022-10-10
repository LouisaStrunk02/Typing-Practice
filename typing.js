var textarea = document.querySelector(".main__textarea");
var errorMessage = document.querySelector(".input__error");

var textLength = 10;
const MAXWORDS = 30;

async function getFirstText() {
  getWordsFromApi();
}

function hitEnter(event) {
  if (event.key === "Enter") {
    getRandomWords();
  }
  else {
    return;
  }
}

async function getRandomWords() {
  textLength = document.getElementById("textLength").value;

  if (textLength > MAXWORDS) {
    errorMessage.innerHTML = "Max words: 30!";
    textarea.innerHTML = "";
  }
  else if (textLength <= 0) {
    errorMessage.innerHTML = "That`s impossible!";
    textarea.innerHTML = "";
  }
  else {
    getWordsFromApi();
  }
}

async function getWordsFromApi() {
  file = "https://random-word-api.herokuapp.com/word?number=" + textLength;
  response = await fetch(file);
  words = await response.json();
  text = words.join(" ");
  textarea.innerHTML = text;
  errorMessage.innerHTML = "";
}
