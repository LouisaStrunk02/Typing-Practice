body = document.getElementsByTagName("body")[0];
restText = document.querySelector(".main__textarea--rest");
errorMessage = document.querySelector(".input__error");
incorrectKey = false;
textLength = 10;
const MAXWORDS = 30;
const MINWORDS = 1;

async function getRandomText() {
  file = "https://random-word-api.herokuapp.com/word?number=" + textLength;
  response = await fetch(file);
  words = await response.json();
  text = words.join(" ");
  restText.innerHTML = text;
  current = document.createElement("SPAN");
  current.className = "main__textarea--current";
  current.innerHTML = restText.textContent[0];
  restText.textContent = restText.textContent.slice(1);
  textarea = document.getElementsByClassName("main__textarea");
  textarea[0].insertBefore(current, restText);
  errorMessage.innerHTML = "";
  incorrectKey = false;
  document.getElementById("newText").blur();
  document.getElementById("input").blur();
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
  textLength = document.getElementById("input").value;

  if (textLength > MAXWORDS) {
    errorMessage.innerHTML = "Max words: 30!";
    restText.innerHTML = "";
  }
  else if (textLength < MINWORDS) {
    errorMessage.innerHTML = "That`s impossible!";
    restText.innerHTML = "";
    current.innerHTML = "";
  }
  else {
    const corrects = document.querySelectorAll('.main__textarea--correct');
    const incorrects = document.querySelectorAll('.main__textarea--incorrect');

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

body.addEventListener("keydown", function checkKey(event) {

  if (event.key == current.textContent[0] && !incorrectKey) {
    current.className = "main__textarea--correct";
    current = document.createElement("SPAN");
    current.className = "main__textarea--current";
    current.textContent = restText.textContent[0];
    restText.textContent = restText.textContent.slice(1);
    textarea = document.getElementsByClassName("main__textarea");
    textarea[0].insertBefore(current, restText);
  }
  else if (event.key != current.textContent[0] && !incorrectKey) {
    incorrectKey = true;
  }
  else if (event.key == current.textContent[0] && incorrectKey) {
    current.className = "main__textarea--incorrect";
    current = document.createElement("SPAN");
    current.className = "main__textarea--current";
    current.textContent = restText.textContent[0];
    restText.textContent = restText.textContent.slice(1);
    textarea = document.getElementsByClassName("main__textarea");
    textarea[0].insertBefore(current, restText);
    incorrectKey = false;
  }
})

function resetRun() {
  const corrects = document.querySelectorAll('.main__textarea--correct');
  const incorrects = document.querySelectorAll('.main__textarea--incorrect');

  current.remove();

  corrects.forEach(correctKey => {
    correctKey.remove();
  });

  incorrects.forEach(incorrectKey => {
    incorrectKey.remove();
  });

  restText.innerHTML = text;
  current = document.createElement("SPAN");
  current.className = "main__textarea--current";
  current.innerHTML = restText.textContent[0];
  restText.textContent = restText.textContent.slice(1);
  textarea = document.getElementsByClassName("main__textarea");
  textarea[0].insertBefore(current, restText);
  errorMessage.innerHTML = "";
  incorrectKey = false;
  document.getElementById("resetRun").blur();
}
