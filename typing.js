var textarea = document.querySelector(".main__textarea");
var errorMessage = document.querySelector(".input__error");

var textLength = 10;
const MAXWORDS = 30;

async function getWordsFromApi() {
  var file = "https://random-word-api.herokuapp.com/word?number=" + textLength;
  var response = await fetch(file);
  var words = await response.json();
  var text = words.join(" ");
  textarea.innerHTML = text;
  errorMessage.innerHTML = "";
}

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

function getRandomWords() {
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
