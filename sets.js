let htmlTodaysNumberOfTexts = document.getElementById("todaysSets");
let htmlTotalNumberOfTexts = document.getElementById("totalSets");

var todaysNumberOfTexts = parseInt(localStorage.getItem("todaysNumberOfTexts") ?? 0);
var totalNumberOfTexts = parseInt(localStorage.getItem("totalNumberOfTexts") ?? 0);

export function getNumberOfTexts() {
  todaysNumberOfTexts += 1;
  localStorage.setItem("todaysNumberOfTexts", todaysNumberOfTexts);
  htmlTodaysNumberOfTexts.innerHTML = "Sets: " + todaysNumberOfTexts;
  totalNumberOfTexts += 1;
  localStorage.setItem("totalNumberOfTexts", totalNumberOfTexts);
  htmlTotalNumberOfTexts.innerHTML = "Sets: " + totalNumberOfTexts;
}
