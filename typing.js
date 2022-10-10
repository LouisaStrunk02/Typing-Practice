const body = document.getElementsByTagName("body")[0];
var textarea = document.getElementsByClassName("main__textarea");
var restText = document.querySelector(".main__textarea--rest");
var errorMessage = document.querySelector(".input__error");
var moreDetails = document.getElementsByClassName("stats__moreDetails")[0];

var incorrectKey = false;
var pressedEnter = false;
var newTextGenerated = false;
var newDay = false;
var startTimer = false;

var textLength = 10;
const MAXWORDS = 30;
const MINWORDS = 1;

var numberOfIncorrectKeys = 0;
var todaysNumberOfTexts = parseInt(localStorage.getItem("todaysNumberOfTexts") ?? 0);
var totalNumberOfTexts = parseInt(localStorage.getItem("totalNumberOfTexts") ?? 0);
var lastSetTime = 0
var todaysTime = parseInt(localStorage.getItem("todaysTime") ?? 0);
var totalTime = parseInt(localStorage.getItem("totalTime") ?? 0);
var lastSetCPM = 0;
var todaysCPM = parseInt(localStorage.getItem("todaysCPM") ?? 0);
var totalCPM = parseInt(localStorage.getItem("totalCPM") ?? 0);
var lastSetWrongChars = 0;
var todaysWrongChars = parseInt(localStorage.getItem("todaysWrongChars") ?? 0);
var totalWrongChars = parseInt(localStorage.getItem("totalWrongChars") ?? 0);
var todaysTypedChars = parseInt(localStorage.getItem("todaysTypedChars") ?? 0);

if (localStorage.getItem("occurenceOfLetters") == null) {
  var occurenceOfLetters = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0, Space: 0 };
}
else if (localStorage.getItem("occurenceOfLetters") != null) {
  var occurenceOfLetters = JSON.parse(localStorage.getItem("occurenceOfLetters"));
}

if (localStorage.getItem("absoluteCorrects") == null) {
  var absoluteCorrects = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0, Space: 0 };
}
else if (localStorage.getItem("absoluteCorrects") != null) {
  var absoluteCorrects = JSON.parse(localStorage.getItem("absoluteCorrects"));
}

if (localStorage.getItem("relativeCorrects") == null) {
  var relativeCorrects = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, m: 0, n: 0, o: 0, p: 0, q: 0, r: 0, s: 0, t: 0, u: 0, v: 0, w: 0, x: 0, y: 0, z: 0, Space: 0 };
}
else if (localStorage.getItem("relativeCorrects") != null) {
  var relativeCorrects = JSON.parse(localStorage.getItem("relativeCorrects"));
}

moreDetails.innerHTML = localStorage.getItem("arrRelativeCorrects");

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
    current.innerHTML = "";
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

function stopTimer() {
  if (startTimer == false) {
    tempDate = 0;
    startDate = 0;
    startTimer = true;
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
      occurenceOfLetters[current.innerHTML] += 1;
      localStorage.setItem("occurenceOfLetters", JSON.stringify(occurenceOfLetters));
      absoluteCorrects[current.innerHTML] += 1;
      localStorage.setItem("absoluteCorrects", JSON.stringify(absoluteCorrects));
      relativeCorrects[current.innerHTML] = Math.round((absoluteCorrects[current.innerHTML] / occurenceOfLetters[current.innerHTML]) * 100);;
      localStorage.setItem("relativeCorrects", JSON.stringify(relativeCorrects));
      strRelativeCorrects = JSON.stringify(relativeCorrects);
      arrRelativeCorrects = strRelativeCorrects.split(",").join("%" + "<br />").replaceAll(`"`, ``).replaceAll(`{`, ``).replaceAll(`}`, ``);
      localStorage.setItem("arrRelativeCorrects", arrRelativeCorrects);
      moreDetails.innerHTML = arrRelativeCorrects;
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
      occurenceOfLetters[current.innerHTML] += 1;
      localStorage.setItem("occurendeOfLetters", JSON.stringify(occurenceOfLetters));
      relativeCorrects[current.innerHTML] = Math.round((absoluteCorrects[current.innerHTML] / occurenceOfLetters[current.innerHTML]) * 100);
      localStorage.setItem("relativeCorrects", JSON.stringify(relativeCorrects));
      strRelativeCorrects = JSON.stringify(relativeCorrects);
      arrRelativeCorrects = strRelativeCorrects.split(",").join("%" + "<br />").replaceAll(`"`, ``).replaceAll(`{`, ``).replaceAll(`}`, ``);
      localStorage.setItem("arrRelativeCorrects", arrRelativeCorrects);
      moreDetails.innerHTML = arrRelativeCorrects;
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

      getNumberOfTexts();
      getTime();
      getCharsPerMinute();
      getWrongChars();
      getTypedChars();

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
  stopTimer();
  numberOfIncorrectKeys = 0;

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
    newDay = true;
  }
  else {
    newDay = false;
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

  location.reload();
}

function resetAllData() {
  localStorage.clear();
  location.reload();
}
