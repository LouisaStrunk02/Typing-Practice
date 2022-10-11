export function resetRun(removeCurrentsCorrectsIncorrects, updateTextarea) {
  let current = document.querySelector(".main__textarea--current");
  removeCurrentsCorrectsIncorrects(current);
  updateTextarea();
  resetRunButton.blur();
}
