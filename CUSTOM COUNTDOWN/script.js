const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date_picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-btn');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-btn');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
// THIS IS AN OBJECT
let savedCountdown;

const secs = 1000;
const mins = secs * 60;
const hour = mins * 60;
const day = hour * 24; 

const today = new Date().toISOString().split('T')[0];

// SET DATE INPUT MINIMUM WITH TODAY'S DATE
dateEl.setAttribute('min', today);

// POPULATE COUNTDWN & COMPLETE UI
function updateDOM(){
countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / mins);
    const seconds = Math.floor((distance % mins) / secs);

    // HIDE INPUT
    inputContainer.hidden = true;

    // IF THE COUNTDOWN ENDS, SHOW COMPLETE
    if(distance < 0) {
        countdownEl.hidden = true;
        clearInterval(countdownActive);
        completeElInfo.textContent = `${countdownTitle} FINISHED ON ${countdownDate}`;
        completeEl.hidden = false;
    }
    else{
    // ELSE SHOW THE COUNTDOWN IN PROGRESS
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;
    completeEl.hidden = true;
    countdownEl.hidden = false;
    }
 }, secs);
}   

// TAKE VALUES FROM FORM INPUT
function updateCountdown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    // CREATING AN OBJECT WHICH WILL RETURN THE TITLE & DATE
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    // SAVE TO LOCAL STORAGE
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // MAKE SURE THAT A DATE IS SELECTED
    if(countdownDate === ''){
        alert('Please Select A Date');
    }   
    else{
        // GET NUMBER VERSION OF CURRENT DATE & UPDATE DOM
        countdownValue = new Date(countdownDate).getTime();
        //DISPLAYS THE MILISECONDS SINCE 1/1/1970
        updateDOM();
    }
}

// RESET ALL VALUES
function reset(){
    // HIDE COUNTDOWNS & SHOW INPUT
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // STOP THE COUNTDOWN
    clearInterval(countdownActive);
    // RESET VALUES
    countdownTitle = '';
    countdownDate = '';
    // RESET THE LOCAL STORAGE
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown(){
    // GET COUNTDOWN FROM LOCAL STORAGE IF AVAILABLE
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// EVENT LISTENERS
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// ON LOAD CHECK LOCAL STORAGE
restorePreviousCountdown();


