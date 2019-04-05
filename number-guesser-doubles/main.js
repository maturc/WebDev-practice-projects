"use strict";
var randomNum;
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
//button click functions
updateButton.addEventListener("click", function(){
    minRangeOut.innerText = minRange.value;
    maxRangeOut.innerText = maxRange.value;
    randomNumFunc(minRange.value, maxRange.value);
});
function randomNumFunc(min, max) {
    randomNum = Math.floor(Math.random() * (Number(max) - Number(min) + 1) + Number(min));
    console.log(randomNum);
}
submitButton.addEventListener("click", function(){
    challenger1Out.innerText = challenger1.value;
    challenger2Out.innerText = challenger2.value;
    guess1Out.innerText = guess1.value;
    guess2Out.innerText = guess2.value;
    highLow1.innerText = guessNumber(guess1);
    highLow2.innerText = guessNumber(guess2);
});
function guessNumber(guess) {
    if (Number(guess.value) == randomNum) {
        return "BOOM!";
    } else if (Number(guess.value) < randomNum){
        return "that's too low";
    }else {
        return "that's too high";
    }
}
resetButton.addEventListener("click", function () {
    randomNumFunc (minRangeOut.innerText, maxRangeOut.innerText);
    minRange.value = "";
    maxRange.value = "";
    minRangeOut.innerText = "-";
    maxRangeOut.innerText = "-";
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
});
clearButton.addEventListener("click", function () {
    challenger1.value = "";
    challenger2.value = "";
    guess1.value = "";
    guess2.value = "";
    clearButton.disabled = true;
    clearButton.classList.add("button-disabled");
    clearButton.classList.remove("button-hover");
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
