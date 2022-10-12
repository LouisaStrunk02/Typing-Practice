export async function getTextFromApi(textLength) {
  const file = "https://random-word-api.herokuapp.com/word?number=" + textLength;
  const response = await fetch(file);
  const words = await response.json();
  const text = words.join(" ");

  return text;
}
