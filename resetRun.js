import { stopTimer } from "./time.js";

export function resetRun(text, removeCurrent, removeCorrectsIncorrects, updateTextarea) {
  stopTimer();
  let current = document.querySelector(".main__textarea--current");
  removeCurrent(current);
  removeCorrectsIncorrects();
  updateTextarea(text);
  resetRunButton.blur();
}
