import { getCurrentChar } from "./currentHandler.js";

export function setText(current) {
  const textarea = document.querySelectorAll(".main__textarea");
  const restText = document.querySelector(".main__textarea--rest");
  const errorMessage = document.querySelector(".input__error");

  restText.innerHTML = restText.innerHTML.slice(1);
  textarea[0].insertBefore(current, restText);
  errorMessage.innerHTML = "";
}

export function updateTextarea(text) {
  const restText = document.querySelector(".main__textarea--rest");
  restText.innerHTML = text;
  const current = getCurrentChar();

  setText(current);
}
