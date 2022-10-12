export function resetRun(text, removeCurrentsCorrectsIncorrects, updateTextarea) {
  let current = document.querySelector(".main__textarea--current");
  removeCurrentsCorrectsIncorrects(current);
  updateTextarea(text);
  resetRunButton.blur();
}
