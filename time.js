let htmlLastSetTime = document.getElementById("lastSetTime");
let htmlTodaysTime = document.getElementById("todaysTime");
let htmlTotalTime = document.getElementById("totalTime");

let lastSetTime = 0;
var todaysTime = parseInt(localStorage.getItem("todaysTime") ?? 0);
var totalTime = parseInt(localStorage.getItem("totalTime") ?? 0);

let startDate = 0;
let endDate = 0;

let setTimer = true;

export function startTimer() {
  if (setTimer == true) {
    startDate = new Date();
    setTimer = false;

    return startDate;
  }
}

export function stopTimer() {
  if (setTimer == false) {
    setTimer = true;
  }
}

export function getTime() {
  endDate = new Date();
  lastSetTime = Math.round(((endDate - startDate) / 1000 + Number.EPSILON) * 100) / 100;
  htmlLastSetTime.innerHTML = "Time: " + lastSetTime + " seconds";
  todaysTime = Math.round((lastSetTime + todaysTime + Number.EPSILON) * 100) / 100;
  localStorage.setItem("todaysTime", todaysTime);
  if (todaysTime > 60) {
    const todaysTimeMinutes = Math.round((todaysTime / 60) * 100) / 100;
    htmlTodaysTime.innerHTML = "Time: " + todaysTimeMinutes + " minutes";
  }
  else {
    htmlTodaysTime.innerHTML = "Time: " + todaysTime + " seconds";
  }

  totalTime = Math.round((lastSetTime + totalTime + Number.EPSILON) * 100) / 100;
  localStorage.setItem("totalTime", totalTime);
  if (totalTime > 60) {
    const totalTimeMinutes = Math.round((totalTime / 60) * 100) / 100;
    htmlTotalTime.innerHTML = "Time: " + totalTimeMinutes + " minutes";
  }
  else {
    htmlTotalTime.innerHTML = "Time: " + totalTime + " seconds";
  }
}
