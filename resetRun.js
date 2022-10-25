export function resetRun(text, removeAllChars, updateTextarea) {
  let currentChar = document.querySelector(".main__textarea--current");
  removeAllChars(currentChar);
  updateTextarea(text);
  resetRunButton.blur();
}
