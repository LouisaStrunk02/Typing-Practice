const body = document.getElementsByTagName("body")[0];
var restText = document.querySelector(".main__textarea--rest");
var errorMessage = document.querySelector(".input__error");

var incorrectKey = false;
var pressedEnter = false;
var newTextGenerated = false;
var newDay = false;

// class Letter {
//   constructor(letter, occurenceOfLetter, firstTryCorrects) {
//     this.letter = letter;
//     this.occurenceOfLetter = occurenceOfLetter;
//     this.firstTryCorrects = firstTryCorrects;
//   }
// }

var numberOfIncorrectKeys = 0;
var todaysNumberOfTexts = parseInt(localStorage.getItem("todaysNumberOfTexts"));
var totalNumberOfTexts = parseInt(localStorage.getItem("totalNumberOfTexts"));
var lastSetTime = 0
var todaysTime = parseInt(localStorage.getItem("todaysTime"));
var totalTime = parseInt(localStorage.getItem("totalTime"));
var lastSetCPM = 0;
var todaysCPM = parseInt(localStorage.getItem("todaysCPM"));
var totalCPM = parseInt(localStorage.getItem("totalCPM"));
var lastSetWrongChars = 0;
var todaysWrongChars = parseInt(localStorage.getItem("todaysWrongChars"));
var totalWrongChars = parseInt(localStorage.getItem("totalWrongChars"));
var todaysTypedChars = parseInt(localStorage.getItem("todaysTypedChars"));

var textLength = 10;
const MAXWORDS = 30;
const MINWORDS = 1;

window.addEventListener("load", function showStats() {
  checkIfNewDay();
  if (newDay) {
    resetTodaysData();
    newDay = false;
  }

  document.getElementById("todaysSets").innerHTML = "Sets: " + localStorage.todaysNumberOfTexts;
  document.getElementById("totalSets").innerHTML = "Sets: " + localStorage.totalNumberOfTexts;
  document.getElementById("todaysChars").innerHTML = "Chars typed: " + localStorage.todaysTypedChars;
  document.getElementById("todaysTime").innerHTML = "Time: " + localStorage.todaysTime;
  document.getElementById("totalTime").innerHTML = "Time: " + localStorage.totalTime;
  document.getElementById("todaysCPM").innerHTML = "CPM: " + localStorage.todaysCPM + " chars/minute";
  document.getElementById("totalCPM").innerHTML = "CPM: " + localStorage.totalCPM + " chars/minute";
  document.getElementById("todaysWrongChars").innerHTML = "Mistake ratio: " + localStorage.todaysWrongChars + " %";
  document.getElementById("totalWrongChars").innerHTML = "Mistake ratio: " + localStorage.totalWrongChars + " %";
})

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

  // letters = [charsInText];
  // i = 0;
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

      // letters[i] = new Letter(current.innerHTML, 0, 0);
      // letters[i].occurenceOfLetter += 1;
      // letters[i].firstTryCorrects += 1;
      // console.log(letters[0]);
      // i += 1;
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

      // letters[i] = new Letter(current.innerHTML, 0, 0);
      // letters[i].occurenceOfLetter += 1;
      // console.log(letters[0]);
      // i += 1;
    }

    if (restText.textContent == 0 && current.textContent == 0) {
      newTextGenerated = false;

      getNumberOfTexts();
      getTime();
      getCharsPerMinute();
      getWrongChars();
      getTypedChars();

      // for (let i = 0; i < charsInText; i++) {
      //   for (let j = i + 1; j < charsInText; j++) {
      //     if (letters[i].letterLetter == letters[j].letterLetter) {
      //       letters[i].occurenceOfLetter = letters[i].occurenceOfLetter + letters[j].occurenceOfLetter;
      //       letters[i].firstTryCorrects = letters[i].firstTryCorrects + letters[j].firstTryCorrects;
      //       console.log("hi", letters[i].letterLetter, letters[i].occurenceOfLetter, letters[i].firstTryCorrects);
      //     }
      //   }
      // }

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

function getNumberOfTexts() {
  todaysNumberOfTexts += 1;
  localStorage.setItem("todaysNumberOfTexts", todaysNumberOfTexts);
  document.getElementById("todaysSets").innerHTML = "Sets: " + todaysNumberOfTexts;
  totalNumberOfTexts += 1;
  localStorage.setItem("totalNumberOfTexts", totalNumberOfTexts);
  document.getElementById("totalSets").innerHTML = "Sets: " + totalNumberOfTexts;
}

function getTime() {
  endDate = new Date();
  lastSetTime = Math.round(((endDate - startDate) / 1000 + Number.EPSILON) * 100) / 100;
  document.getElementById("lastSetTime").innerHTML = "Time: " + lastSetTime + " seconds";
  todaysTime = Math.round((lastSetTime + todaysTime + Number.EPSILON) * 100) / 100;
  localStorage.setItem("todaysTime", todaysTime);
  document.getElementById("todaysTime").innerHTML = "Time: " + todaysTime + " seconds";
  totalTime = Math.round((lastSetTime + totalTime + Number.EPSILON) * 100) / 100;
  localStorage.setItem("totalTime", totalTime);
  document.getElementById("totalTime").innerHTML = "Time: " + totalTime + " seconds";
}

function getCharsPerMinute() {
  lastSetCPM = Math.round((charsInText * (60 / lastSetTime)) + Number.EPSILON);
  document.getElementById("lastSetCPM").innerHTML = "CPM: " + lastSetCPM + "chars/minute";
  todaysWeightOfLastSetCPM = lastSetCPM * (1 / todaysNumberOfTexts);
  todaysWeightOfTodaysCPM = todaysCPM * (1 - 1 / todaysNumberOfTexts);
  todaysCPM = Math.round(todaysWeightOfLastSetCPM + todaysWeightOfTodaysCPM + Number.EPSILON);
  localStorage.setItem("todaysCPM", todaysCPM);
  document.getElementById("todaysCPM").innerHTML = "CPM: " + todaysCPM + "chars/minute";
  totalWeightOfLastSetCPM = lastSetCPM * (1 / totalNumberOfTexts);
  totalWeightOfTodaysCPM = totalCPM * (1 - 1 / totalNumberOfTexts);
  totalCPM = Math.round(totalWeightOfLastSetCPM + totalWeightOfTodaysCPM + Number.EPSILON);
  localStorage.setItem("totalCPM", totalCPM);
  document.getElementById("totalCPM").innerHTML = "CPM: " + totalCPM + "chars/minute";
}

function getWrongChars() {
  lastSetWrongChars = Math.round(((numberOfIncorrectKeys / charsInText * 100) + Number.EPSILON) * 10) / 10;
  document.getElementById("lastSetWrongChars").innerHTML = "Wrong Chars: " + lastSetWrongChars + "%";
  numberOfIncorrectKeys = 0;
  todaysWeightOfLastSetWrongChars = lastSetWrongChars * (1 / todaysNumberOfTexts);
  todaysWeightOfTodaysWrongChars = todaysWrongChars * (1 - 1 / todaysNumberOfTexts);
  todaysWrongChars = Math.round((todaysWeightOfLastSetWrongChars + todaysWeightOfTodaysWrongChars + Number.EPSILON) * 100) / 100;
  localStorage.setItem("todaysWrongChars", todaysWrongChars);
  document.getElementById("todaysWrongChars").innerHTML = "Mistake ratio: " + todaysWrongChars + "%";
  totalWeightOfLastSetWrongChars = lastSetWrongChars * (1 / totalNumberOfTexts);
  totalWeightOfTodaysWrongChars = totalWrongChars * (1 - 1 / totalNumberOfTexts);
  totalWrongChars = Math.round((totalWeightOfLastSetWrongChars + totalWeightOfTodaysWrongChars + Number.EPSILON) * 100) / 100;
  localStorage.setItem("totalWrongChars", totalWrongChars);
  document.getElementById("totalWrongChars").innerHTML = "Mistake ratio: " + totalWrongChars + "%";
}

function getTypedChars() {
  todaysTypedChars += charsInText;
  localStorage.setItem("todaysTypedChars", todaysTypedChars);
  document.getElementById("todaysChars").innerHTML = "Chars typed: " + todaysTypedChars;
}

function checkIfNewDay() {
  var lastDay = parseInt(localStorage.getItem("lastDay"));
  var lastMonth = parseInt(localStorage.getItem("lastMonth"));
  var lastYear = parseInt(localStorage.getItem("lastYear"));

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  if (currentDay > lastDay || currentMonth > lastMonth || currentYear > lastYear) {
    console.log(">");
    newDay = true;
  }
  else {
    console.log("=");
  }
  lastDay = currentDay;
  localStorage.setItem("lastDay", lastDay);
  lastMonth = currentMonth;
  localStorage.setItem("lastMonth", lastMonth);
  lastYear = currentYear;
  localStorage.setItem("lastYear", lastYear);
}

function resetTodaysData() {
  localStorage.todaysNumberOfTexts = 0;
  localStorage.todaysTime = 0;
  localStorage.todaysCPM = 0;
  localStorage.todaysWrongChars = 0;
  localStorage.todaysTypedChars = 0;

  document.getElementById("todaysSets").innerHTML = "Sets: " + localStorage.todaysNumberOfTexts;
  document.getElementById("todaysChars").innerHTML = "Chars typed: " + localStorage.todaysTypedChars;
  document.getElementById("todaysTime").innerHTML = "Time: " + localStorage.todaysTime;
  document.getElementById("todaysCPM").innerHTML = "CPM: " + localStorage.todaysCPM + " chars/minute";
  document.getElementById("todaysWrongChars").innerHTML = "Mistake ratio: " + localStorage.todaysWrongChars + " %";
}

function resetAllData() {
  localStorage.todaysNumberOfTexts = 0;
  localStorage.totalNumberOfTexts = 0;
  lastSetTime = 0;
  localStorage.todaysTime = 0;
  localStorage.totalTime = 0;
  lastSetCPM = 0;
  localStorage.todaysCPM = 0;
  localStorage.totalCPM = 0;
  lastSetWrongChars = 0;
  localStorage.todaysWrongChars = 0;
  localStorage.totalWrongChars = 0;
  localStorage.todaysTypedChars = 0;

  document.getElementById("todaysSets").innerHTML = "Sets: " + localStorage.todaysNumberOfTexts;
  document.getElementById("totalSets").innerHTML = "Sets: " + localStorage.totalNumberOfTexts;
  document.getElementById("todaysChars").innerHTML = "Chars typed: " + localStorage.todaysTypedChars;
  document.getElementById("lastSetTime").innerHTML = "Time: " + lastSetTime;
  document.getElementById("todaysTime").innerHTML = "Time: " + localStorage.todaysTime;
  document.getElementById("totalTime").innerHTML = "Time: " + localStorage.totalTime;
  document.getElementById("lastSetCPM").innerHTML = "CPM: " + lastSetCPM;
  document.getElementById("todaysCPM").innerHTML = "CPM: " + localStorage.todaysCPM + " chars/minute";
  document.getElementById("totalCPM").innerHTML = "CPM: " + localStorage.totalCPM + " chars/minute";
  document.getElementById("lastSetWronChars").innerHTML = "Wrong Chars: " + lastSetWrongChars;
  document.getElementById("todaysWrongChars").innerHTML = "Mistake ratio: " + localStorage.todaysWrongChars + " %";
  document.getElementById("totalWrongChars").innerHTML = "Mistake ratio: " + localStorage.totalWrongChars + " %";
}
