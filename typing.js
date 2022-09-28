body = document.getElementsByTagName("body")[0];
restText = document.querySelector(".main__textarea--rest");
errorMessage = document.querySelector(".input__error");

incorrectKey = false;
pressedEnter = false;
newTextGenerated = false;

numberOfIncorrectKeys = 0;
numberOfTexts = 0;
lastSetTime = 0
todaysTime = 0;
totalTime = 0;
lastSetCPM = 0;
todaysCPM = 0;

textLength = 10;
const MAXWORDS = 30;
const MINWORDS = 1;

async function getRandomText() {
  file = "https://random-word-api.herokuapp.com/word?number=" + textLength;
  response = await fetch(file);
  words = await response.json();
  text = words.join(" ");
  charsInText = text.length;
  restText.innerHTML = text;
  current = document.createElement("SPAN");
  current.className = "main__textarea--current";
  current.innerHTML = restText.textContent[0];
  restText.textContent = restText.textContent.slice(1);
  textarea = document.getElementsByClassName("main__textarea");
  textarea[0].insertBefore(current, restText);
  errorMessage.innerHTML = "";
  incorrectKey = false;
  document.getElementById("newText").blur();
  document.getElementById("input").blur();
  startTimer = true;
  newTextGenerated = true;
}

function hitEnter(event) {
  if (event.key === "Enter" && !pressedEnter) {
    getRandomWords();
    pressedEnter = true;
  }
  else {
    pressedEnter = false;
    return;
  }
}

async function getRandomWords() {
  textLength = document.getElementById("input").value;

  if (textLength > MAXWORDS) {
    errorMessage.innerHTML = "Max words: 30!";
    restText.innerHTML = "";
  }
  else if (textLength < MINWORDS) {
    errorMessage.innerHTML = "That`s impossible!";
    restText.innerHTML = "";
    current.innerHTML = "";
  }
  else {
    var corrects = document.querySelectorAll('.main__textarea--correct');
    var incorrects = document.querySelectorAll('.main__textarea--incorrect');

    current.remove();

    corrects.forEach(correctKey => {
      correctKey.remove();
    });

    incorrects.forEach(incorrectKey => {
      incorrectKey.remove();
    });

    getRandomText();
  }
}

function setTimer() {
  if (startTimer == true) {
    tempDate = new Date();
    startDate = tempDate;
    startTimer = false;
  }
}

body.addEventListener("keydown", function checkKey(event) {
  if (document.getElementById("input") === document.activeElement) {
    event.stopPropagation();
  }
  else if (newTextGenerated == false) {
    return;
  }
  else {
    setTimer();
    if (event.key == current.textContent[0] && !incorrectKey) {
      current.className = "main__textarea--correct";
      current = document.createElement("SPAN");
      current.className = "main__textarea--current";
      current.textContent = restText.textContent[0];
      restText.textContent = restText.textContent.slice(1);
      textarea = document.getElementsByClassName("main__textarea");
      textarea[0].insertBefore(current, restText);
    }
    else if (event.key != current.textContent[0] && !incorrectKey) {
      incorrectKey = true;
    }
    else if (event.key == current.textContent[0] && incorrectKey) {
      numberOfIncorrectKeys += 1;
      current.className = "main__textarea--incorrect";
      current = document.createElement("SPAN");
      current.className = "main__textarea--current";
      current.textContent = restText.textContent[0];
      restText.textContent = restText.textContent.slice(1);
      textarea = document.getElementsByClassName("main__textarea");
      textarea[0].insertBefore(current, restText);
      incorrectKey = false;
    }

    if (restText.textContent == 0 && current.textContent == 0) {
      newTextGenerated = false;

      numberOfTexts += 1;

      endDate = new Date();
      lastSetTime = Math.round(((endDate - startDate) / 1000 + Number.EPSILON) * 100) / 100;
      document.getElementById("lastSetTime").innerHTML = "Time: " + lastSetTime + " seconds";
      todaysTime += Math.round((lastSetTime + Number.EPSILON) * 100) / 100;
      document.getElementById("todaysTime").innerHTML = "Time: " + todaysTime + " seconds";
      // totalTime += lastSetTime;
      // document.getElementById("totalTime").innerHTML = "Time: " + totalTime + " seconds";

      lastSetCPM = Math.round((charsInText * (60 / lastSetTime)) + Number.EPSILON);
      document.getElementById("lastSetCPM").innerHTML = "CPM: " + lastSetCPM + "chars/minute";
      weightOfLastSetCPM = lastSetCPM * (1 / numberOfTexts);
      weightOfTodaysCPM = todaysCPM * (1 - 1 / numberOfTexts);
      todaysCPM = Math.round(weightOfLastSetCPM + weightOfTodaysCPM + Number.EPSILON);
      document.getElementById("todaysCPM").innerHTML = "CPM: " + todaysCPM + "chars/minute";
      // totalCPM = weightOfLastSetCPM + weightOfTodaysCPM;
      // document.getElementById("todaysCPM").innerHTML = "CPM: " + totalCPM + "chars/minute";

      wrongChars = Math.round(((numberOfIncorrectKeys / charsInText * 100) + Number.EPSILON) * 10) / 10;
      document.getElementById("lastSetWrongChars").innerHTML = "Wrong Chars: " + wrongChars + "%";
      numberOfIncorrectKeys = 0;

      document.getElementById("todaysSets").innerHTML = "Sets: " + numberOfTexts;

      var corrects = document.querySelectorAll('.main__textarea--correct');
      var incorrects = document.querySelectorAll('.main__textarea--incorrect');

      current.remove();

      corrects.forEach(correctKey => {
        correctKey.remove();
      });

      incorrects.forEach(incorrectKey => {
        incorrectKey.remove();
      });

      getRandomText();
    }
  }
})

function resetRun() {
  var corrects = document.querySelectorAll('.main__textarea--correct');
  var incorrects = document.querySelectorAll('.main__textarea--incorrect');

  current.remove();

  corrects.forEach(correctKey => {
    correctKey.remove();
  });

  incorrects.forEach(incorrectKey => {
    incorrectKey.remove();
  });

  restText.innerHTML = text;
  current = document.createElement("SPAN");
  current.className = "main__textarea--current";
  current.innerHTML = restText.textContent[0];
  restText.textContent = restText.textContent.slice(1);
  textarea = document.getElementsByClassName("main__textarea");
  textarea[0].insertBefore(current, restText);
  errorMessage.innerHTML = "";
  incorrectKey = false;
  document.getElementById("resetRun").blur();
}
