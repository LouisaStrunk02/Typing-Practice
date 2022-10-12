export function getCurrentChar() {
  const restText = document.querySelector(".main__textarea--rest");
  const currentChar = document.createElement("SPAN");
  currentChar.className = "main__textarea--current";
  currentChar.innerHTML = restText.innerHTML[0];

  return currentChar;
}

export function removeCurrent(currentChar) {
  let current = currentChar;

  current.remove();
}

export function removeCorrectsIncorrects() {
  const corrects = document.querySelectorAll('.main__textarea--correct');
  const incorrects = document.querySelectorAll('.main__textarea--incorrect');

  corrects.forEach(correctKey => {
    correctKey.remove();
  });

  incorrects.forEach(incorrectKey => {
    incorrectKey.remove();
  });
}
