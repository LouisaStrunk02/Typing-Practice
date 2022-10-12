const htmlTodaysNumberOfTexts = document.getElementById("todaysSets");
const htmlTotalNumberOfTexts = document.getElementById("totalSets");

let todaysNumberOfTexts = parseInt(localStorage.getItem("todaysNumberOfTexts") ?? 0);
let totalNumberOfTexts = parseInt(localStorage.getItem("totalNumberOfTexts") ?? 0);

export function getNumberOfTexts() {
  todaysNumberOfTexts += 1;
  localStorage.setItem("todaysNumberOfTexts", todaysNumberOfTexts);
  htmlTodaysNumberOfTexts.innerHTML = "Sets: " + todaysNumberOfTexts;
  totalNumberOfTexts += 1;
  localStorage.setItem("totalNumberOfTexts", totalNumberOfTexts);
  htmlTotalNumberOfTexts.innerHTML = "Sets: " + totalNumberOfTexts;
}
