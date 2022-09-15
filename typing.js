file = "https://random-word-api.herokuapp.com/word?number=" + 3;

async function getRandomWords() {
  words = await fetch(file);
  data = await words.json();
  console.log(data);
}
