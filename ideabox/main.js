"use strict";
var titleInput = document.getElementById("title-input");
var bodyInput = document.getElementById("body-input");
var saveButton = document.getElementById("save-button");
var ideaCardSection = document.getElementById("idea-card-section");

titleInput.addEventListener("input", enableSaveButton);
bodyInput.addEventListener("input", enableSaveButton);
saveButton.addEventListener("click", saveIdea);

for (let i = 0; i < localStorage.length; i++) {
    displayIdeas(i);
}
function displayIdeas(key) {
    let ideaInstance = JSON.parse(localStorage.getItem(localStorage.key(key)));
    ideaCardSection.innerHTML += (`
        <div class="card">
            <header class="card-header">
                <div class="favorite"></div>
                <div class="delete"></div>
            </header>
            <main class="card-main">
                <h2 class="card-title">${ideaInstance.title}</h2>
                <p class="card-body">${ideaInstance.body}</p>
            </main>
            <footer class="quality">
                <div class="quality-up"></div>
                <span class="quality-label">Quality: ${ideaInstance.quality}</span>
                <div class="quality-down"></div>
            </footer>
        </div>
    `);
}
function enableSaveButton() {
    if (titleInput.value == "" || bodyInput.value == "") {
        saveButton.disabled = true;
    } else {
        saveButton.disabled = false;
    }
}
function saveIdea() {
    let ideaInstance = new Idea(titleInput.value, bodyInput.value); //make this a function perhaps
    ideaInstance.saveToStorage();
}
function deleteIdea() {
    for (let i = 0; i < ideaCardSection.childElementCount; i++) {
        /* Delete button event */
        ideaCardSection.children[i].getElementsByClassName("delete")[0].addEventListener("click", function(e){
            localStorage.removeItem(e.target.parentElement.parentElement.getElementsByClassName("card-title")[0].innerText);
            e.target.closest(".card").remove();
        });
        /* Upvote button event */
        ideaCardSection.children[i].getElementsByClassName("quality-up")[0].addEventListener("click", function(e){
            let title = e.target.parentElement.parentElement.getElementsByClassName("card-title")[0].innerText;
            let ideaInstance = JSON.parse(localStorage.getItem(localStorage.key(title)));
            switch (ideaInstance.quality) {
                case "Swill":
                    ideaInstance.quality = "Plausible";
                    break;
                case "Plausible":
                    ideaInstance.quality = "Genius";
                    break;
                default:
                    break;
            }
            localStorage.setItem(title, JSON.stringify(ideaInstance));
        });
        /* Downvote button event */
        ideaCardSection.children[i].getElementsByClassName("quality-down")[0].addEventListener("click", function(e){
            let title = e.target.parentElement.parentElement.getElementsByClassName("card-title")[0].innerText;
            let ideaInstance = JSON.parse(localStorage.getItem(localStorage.key(title)));
            switch (ideaInstance.quality) {
                case "Plausible":
                    ideaInstance.quality = "Swill";
                    break;
                case "Genius":
                    ideaInstance.quality = "Plausible";
                    break;
                default:
                    break;
            }
            localStorage.setItem(title, JSON.stringify(ideaInstance));
        });
    }
}
deleteIdea();