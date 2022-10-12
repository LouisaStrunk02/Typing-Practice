export function resetRun(text, removeAllChars, updateTextarea) {
  let current = document.querySelector(".main__textarea--current");
  removeAllChars(current);
  updateTextarea(text);
  resetRunButton.blur();
}
