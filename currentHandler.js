export function getCurrentChar() {
  const restText = document.querySelector(".main__textarea--rest");
  const currentChar = document.createElement("SPAN");
  currentChar.className = "main__textarea--current";
  currentChar.innerHTML = restText.innerHTML[0];

  return currentChar;
}

export function removeAllChars(currentChar) {
  removeCurrentChar(currentChar);
  removeCorrects();
  removeIncorrects();
}

function removeCurrentChar(currentChar) {
  currentChar.remove();
}

function removeCorrects() {
  const corrects = document.querySelectorAll('.main__textarea--correct');

  corrects.forEach(correctKey => {
    correctKey.remove();
  });
}

function removeIncorrects() {
  const incorrects = document.querySelectorAll('.main__textarea--incorrect');

  incorrects.forEach(incorrectKey => {
    incorrectKey.remove();
  });
}
