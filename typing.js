async function getFirstText() {
  file = "https://random-word-api.herokuapp.com/word?number=" + 10;
  words = await fetch(file);
  data = await words.json();
  text = data.join(" ");
  document.querySelector(".main__textarea").innerHTML = text;
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
  const MAXWORDS = 30;
  textLength = document.getElementById("textLength").value;

  if (textLength > MAXWORDS) {
    document.querySelector(".input__error").innerHTML = "Max words: 30!";
    document.querySelector(".main__textarea").innerHTML = "";
  }
  else if (textLength <= 0) {
    document.querySelector(".input__error").innerHTML = "That`s impossible!";
    document.querySelector(".main__textarea").innerHTML = "";
  }
  else {
    file = "https://random-word-api.herokuapp.com/word?number=" + textLength;
    words = await fetch(file);
    data = await words.json();
    text = data.join(" ");
    document.querySelector(".main__textarea").innerHTML = text;
    document.querySelector(".input__error").innerHTML = "";
  }
}
