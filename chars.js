const htmlTodaysChars = document.getElementById("todaysChars");

let todaysTypedChars = parseInt(localStorage.getItem("todaysTypedChars") ?? 0);

export function getTypedChars(text) {
  const charsInText = text.length;
  todaysTypedChars += charsInText;
  localStorage.setItem("todaysTypedChars", todaysTypedChars);
  htmlTodaysChars.innerHTML = "Chars typed: " + todaysTypedChars;
}
