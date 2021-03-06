const inputContainer = document.getElementById("input-container");
const countDownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
const countDownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");
const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countDownTitle = "";
let countDownDate = "";
let countDownValue = new Date();
let countdownActive;
let saveCountDown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//Set Date Input Min with Todays Date

const today = new Date().toISOString().split("T")[0];

dateEl.setAttribute("min", today);

//Populate the countdown

function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    //Hide the input Container
    inputContainer.hidden = true;

    //if countDown has ended show complete

    if (distance < 0) {
      countDownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countDownTitle} finished on ${countDownDate}`;
      completeEl.hidden = false;
    } else {
      //Population CountDown
      countdownElTitle.textContent = `${countDownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countDownEl.hidden = false;
    }
  }, second);
}

//Take Values from form Inputs

function updateCountDown(e) {
  e.preventDefault();
  countDownTitle = e.srcElement[0].value;
  countDownDate = e.srcElement[1].value;
  //Get number version of current Date and Update Dom
  saveCountDown = {
    title: countDownTitle,
    date: countDownDate,
  };
  console.log(saveCountDown);
  localStorage.setItem("countdown", JSON.stringify(saveCountDown));
  if (countDownDate === "") {
    alert("Please Enter a Date");
  } else {
    countDownValue = new Date(countDownDate).getTime();
    updateDOM();
  }
}

//Reset All Values

function reset() {
  countDownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  //Stop the countdown
  clearInterval(countdownActive);
  countDownTitle = "";
  countDownDate = "";
  localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    saveCountDown = JSON.parse(localStorage.getItem("countdown"));
    countDownTitle = saveCountDown.title;
    countDownDate = saveCountDown.date;
    countDownValue = new Date(countDownDate).getTime();
    updateDOM()
  }
}

// Event Listeners

countDownForm.addEventListener("submit", updateCountDown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);


// on Load check local Storage


restorePreviousCountdown();