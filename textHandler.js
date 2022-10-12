export function setText(current, restText, textarea, errorMessage) {
  restText.innerHTML = restText.innerHTML.slice(1);
  textarea[0].insertBefore(current, restText);
  errorMessage.innerHTML = "";
}

export function updateTextarea(text, restText, getCurrentChar, textarea, errorMessage) {
  restText.innerHTML = text;
  const current = getCurrentChar();
  setText(current, restText, textarea, errorMessage);
}
