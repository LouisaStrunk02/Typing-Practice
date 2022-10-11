export function getCurrentChar() {
  const restText = document.querySelector(".main__textarea--rest");
  const currentChar = document.createElement("SPAN");
  currentChar.className = "main__textarea--current";
  currentChar.innerHTML = restText.innerHTML[0];

  return currentChar;
}
