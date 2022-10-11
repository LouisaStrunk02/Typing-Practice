export function resetRun(text, getCurrentChar) {
  let current = document.querySelector(".main__textarea--current");
  const restText = document.querySelector(".main__textarea--rest");
  const textarea = document.querySelectorAll(".main__textarea");
  const errorMessage = document.querySelector(".input__error");
  const resetRunButton = document.querySelector("#resetRunButton");

  const corrects = document.querySelectorAll('.main__textarea--correct');
  const incorrects = document.querySelectorAll('.main__textarea--incorrect');

  current.remove();

  corrects.forEach(correctKey => {
    correctKey.remove();
  });

  incorrects.forEach(incorrectKey => {
    incorrectKey.remove();
  });

  // removeCurrentsCorrectsIncorrects(current);

  restText.innerHTML = text;
  current = getCurrentChar();
  restText.innerHTML = restText.innerHTML.slice(1);
  textarea[0].insertBefore(current, restText);
  errorMessage.innerHTML = "";
  resetRunButton.blur();
}
