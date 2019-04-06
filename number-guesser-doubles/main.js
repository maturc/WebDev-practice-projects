"use strict";
var randomNum;
var numGuesses1 = 0;
var numGuesses2 = 0;
//input fields
var minRange = document.getElementById("min-range");
var maxRange = document.getElementById("max-range");
var challenger1 = document.getElementById("challenger-1");
var challenger2 = document.getElementById("challenger-2");
var guess1 = document.getElementById("guess-1");
var guess2 = document.getElementById("guess-2");
//output fields
var minRangeOut = document.getElementById("min-range-output");
var maxRangeOut = document.getElementById("max-range-output");
var challenger1Out = document.getElementById("challenger-1-output");
var challenger2Out = document.getElementById("challenger-2-output");
var guess1Out = document.getElementById("guess-1-output");
var guess2Out = document.getElementById("guess-2-output");
var highLow1 = document.getElementById("high-low-1");
var highLow2 = document.getElementById("high-low-2");
//buttons
var updateButton = document.getElementById("update-button");
var submitButton = document.getElementById("submit-button");
var resetButton = document.getElementById("reset-button");
var clearButton = document.getElementById("clear-button");
var closeButton = document.getElementsByClassName("close");
//functions
window.onload = function() {
    document.getElementById("min-range").value = "";
    document.getElementById("max-range").value = "";
    document.getElementById("challenger-1").value = "";
    document.getElementById("challenger-2").value = "";
    document.getElementById("guess-1").value = "";
    document.getElementById("guess-2").value = "";
}
var timer = 0;
setInterval(function(){timer++;}, 1000);
randomNumFunc (minRangeOut.innerText, maxRangeOut.innerText);
function randomNumFunc(min, max) {
    randomNum = Math.floor(Math.random() * (Number(max) - Number(min) + 1) + Number(min));
    console.log(randomNum);
}
function guessNumber(guess, winner, numGuesses) {
    if (Number(guess.value) == randomNum) {
        createCard(winner, numGuesses);
        numGuesses1 = 0;
        numGuesses2 = 0;
        timer = 0;
        return "BOOM!";
    } else if (Number(guess.value) < randomNum){
        return "that's too low";
    }else {
        return "that's too high";
    }
}
var winnerCardParent = document.getElementsByClassName("right");
function createCard(winner, numGuesses) {
    winnerCardParent[0].innerHTML += `<div class="winner-box">
        <div class="flex-right">
            <h3 class="winner-box-small">${challenger1Out.innerText}</h3>
            <h3 class="winner-box-small font-weight-small">vs</h3>
            <h3 class="winner-box-small">${challenger2Out.innerText}</h3>
        </div>
        <hr class="hr-right">
        <div class="flex-right-column">
            <h1>${winner.innerText}</h1>
            <h1 class="font-weight-small">WINNER</h1>
        </div>
        <hr class="hr-right">
        <div class="flex-right">
            <h3 class="winner-box-small">${numGuesses} <span class="font-weight-small">GUESSES</span></h3>
            <h3 class="winner-box-small">${timer} <span class="font-weight-small">SECONDS</span></h3>
            <button class="close"></button>
        </div>
    </div>`;
}
//update button
updateButton.addEventListener("click", function(){
    minRangeOut.innerText = minRange.value;
    maxRangeOut.innerText = maxRange.value;
    randomNumFunc(minRange.value, maxRange.value);
    minRange.value = "";
    maxRange.value = "";
    timer = 0;
});
//submit button
submitButton.addEventListener("click", function(){
    challenger1Out.innerText = challenger1.value;
    challenger2Out.innerText = challenger2.value;
    guess1Out.innerText = guess1.value;
    guess2Out.innerText = guess2.value;
    numGuesses1++;
    numGuesses2++;
    highLow1.innerText = guessNumber(guess1, challenger1Out, numGuesses1);
    highLow2.innerText = guessNumber(guess2, challenger2Out, numGuesses2);
});
//clear button
clearButton.addEventListener("click", function () {
    challenger1.value = "";
    challenger2.value = "";
    guess1.value = "";
    guess2.value = "";
    clearButton.disabled = true;
    clearButton.classList.add("button-disabled");
    clearButton.classList.remove("button-hover");
    if (guess1Out.innerText == "-" || guess2Out.innerText == "-") {
        resetButton.disabled = true;
        resetButton.classList.add("button-disabled");
        resetButton.classList.remove("button-hover");
    }
});
var inputArray = [
    challenger1,
    challenger2,
    guess1,
    guess2
];
var arrayNum = 0;
inputArray.forEach(function(elem) {
    elem.addEventListener("input", function() {
        inputArray.forEach(function(el) {
        if (el.value == "") {
            arrayNum++;
        }});
        if (arrayNum < 4) {
            clearButton.disabled = false;
            clearButton.classList.remove("button-disabled");
            clearButton.classList.add("button-hover");
            arrayNum = 0;
        } else {
            clearButton.disabled = true;
            clearButton.classList.add("button-disabled");
            clearButton.classList.remove("button-hover");
            arrayNum = 0;
        }
    });
});
//reset button
resetButton.addEventListener("click", function() {
    randomNumFunc (minRangeOut.innerText, maxRangeOut.innerText);
    minRange.value = "";
    maxRange.value = "";
    minRangeOut.innerText = "1";
    maxRangeOut.innerText = "10";
    challenger1.value = "";
    challenger2.value = "";
    guess1.value = "";
    guess2.value = "";
    challenger1Out.innerText = "Challenger 1 Name";
    challenger2Out.innerText = "Challenger 2 Name";
    guess1Out.innerText = "-";
    guess2Out.innerText = "-";
    highLow1.innerText = "";
    highLow2.innerText = "";
    timer = 0;
});
resetButton.addEventListener("click", function() {
    challenger1.value = "";
    challenger2.value = "";
    guess1.value = "";
    guess2.value = "";
    clearButton.disabled = true;
    clearButton.classList.add("button-disabled");
    clearButton.classList.remove("button-hover");
    resetButton.disabled = true;
    resetButton.classList.add("button-disabled");
    resetButton.classList.remove("button-hover");
});
var arrayNum = 0;
inputArray.forEach(function(elem) {
    elem.addEventListener("input", function() {
        inputArray.forEach(function(el) {
            if (el.value == "") {
                arrayNum++;
        }});
        if (guess1Out.innerText == "-" || guess2Out.innerText == "-") {
            arrayNum++;
        }
        if (arrayNum < 5) {
            resetButton.disabled = false;
            resetButton.classList.remove("button-disabled");
            resetButton.classList.add("button-hover");
            arrayNum = 0;
        } else {
            resetButton.disabled = true;
            resetButton.classList.add("button-disabled");
            resetButton.classList.remove("button-hover");
            arrayNum = 0;
        }
    });
});
//closeButton
winnerCardParent[0].addEventListener("click", function(e){
    e.target.parentNode.parentNode.remove();
});