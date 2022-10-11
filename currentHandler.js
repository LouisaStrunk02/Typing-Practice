export function getCurrentChar() {
  const restText = document.querySelector(".main__textarea--rest");
  const currentChar = document.createElement("SPAN");
  currentChar.className = "main__textarea--current";
  currentChar.innerHTML = restText.innerHTML[0];

  return currentChar;
}

export function removeCurrentsCorrectsIncorrects(currentChar) {
  let current = currentChar;
  const corrects = document.querySelectorAll('.main__textarea--correct');
  const incorrects = document.querySelectorAll('.main__textarea--incorrect');

  current.remove();

  corrects.forEach(correctKey => {
    correctKey.remove();
  });

  incorrects.forEach(incorrectKey => {
    incorrectKey.remove();
  });
}
