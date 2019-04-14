"use strict";
var titleInput = document.getElementById("title-input");
var bodyInput = document.getElementById("body-input");
var saveButton = document.getElementById("save-button");
var ideaCardSection = document.getElementById("idea-card-section");
var menuOpenButton = document.getElementById("menu-open");
var menuCloseButton = document.getElementById("menu-close");
var menu = document.getElementById("menu-id");
var showStarredButton = document.getElementById("show-starred-button");
var searchBox = document.getElementById("search-box");
var filterSwill = document.getElementById("filter-swill");
var filterPlausible = document.getElementById("filter-plausible");
var filterGenius = document.getElementById("filter-genius");

titleInput.addEventListener("input", enableSaveButton);
bodyInput.addEventListener("input", enableSaveButton);
saveButton.addEventListener("click", saveIdea);
menuOpenButton.addEventListener("click", openMenu);
menuCloseButton.addEventListener("click", closeMenu);
showStarredButton.addEventListener("click", displayStarred);
searchBox.addEventListener("input", searchIdeas);
filterSwill.addEventListener("click", function(event) {
    filterIdeas(event, "Swill");
});
filterPlausible.addEventListener("click", function(event) {
    filterIdeas(event, "Plausible");
});
filterGenius.addEventListener("click", function(event) {
    filterIdeas(event, "Genius");
});

displayIdeas();

function displayIdeas() {
    for (let i = 0; i < localStorage.length; i++) {
        let ideaInstance = JSON.parse(localStorage.getItem(localStorage.key(i)));
        generateHtml(ideaInstance);
    }
    cardButtonEvents();
}
function displayStarred() {
    deleteAllIdeas();
    for (let i = 0; i < localStorage.length; i++) {
        let ideaInstance = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (ideaInstance.starred) {
            generateHtml(ideaInstance);
        }
    }
    cardButtonEvents();
}
function filterIdeas(event, quality) {
    event.preventDefault();
    deleteAllIdeas();
    for (let i = 0; i < localStorage.length; i++) {
        let ideaInstance = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (ideaInstance.quality == quality) {
            generateHtml(ideaInstance);
        }
    }
    cardButtonEvents();
}
function searchIdeas() {
    deleteAllIdeas();
    for (let i = 0; i < localStorage.length; i++) {
        let ideaInstance = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (ideaInstance.title.toLowerCase().includes(searchBox.value.toLowerCase())) {
            generateHtml(ideaInstance); 
        }
    }
    cardButtonEvents();
}
function generateHtml(ideaInstance) {
    let fav = "";
    if (ideaInstance.starred) {
        fav = " favorite-starred";
    }
    ideaCardSection.innerHTML += (`
        <div class="card">
            <header class="card-header">
                <div class="favorite${fav}"></div>
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
function deleteAllIdeas() {
    let cardCollection = document.getElementsByClassName("card");
    let len = cardCollection.length;
    for (let i = 0; i < len; i++) {
        cardCollection[0].remove();
    }
}
function enableSaveButton() {
    if (titleInput.value == "" || bodyInput.value == "") {
        saveButton.disabled = true;
    } else {
        saveButton.disabled = false;
    }
}
function saveIdea() {
    let ideaInstance = new Idea(titleInput.value, bodyInput.value);
    ideaInstance.saveToStorage();
    deleteAllIdeas();
    displayIdeas();
    cardButtonEvents();
}
/* Attach delete, upvote, downvote and starred button events to every card */
function cardButtonEvents() {
    for (let i = 0; i < ideaCardSection.childElementCount; i++) {
        /* Delete button event */
        ideaCardSection.children[i].getElementsByClassName("delete")[0].addEventListener("click", function(e){
            localStorage.removeItem(e.target.parentElement.parentElement.getElementsByClassName("card-title")[0].innerText);
            e.target.closest(".card").remove();
        });
        /* Upvote button event */
        ideaCardSection.children[i].getElementsByClassName("quality-up")[0].addEventListener("click", function(e){
            let title = e.target.parentElement.parentElement.getElementsByClassName("card-title")[0].innerText;
            let ideaInstance = JSON.parse(localStorage.getItem(title));
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
            e.target.closest(".card").getElementsByClassName("quality-label")[0].innerText = `Quality: ${ideaInstance.quality}`;
            localStorage.setItem(title, JSON.stringify(ideaInstance));
        });
        /* Downvote button event */
        ideaCardSection.children[i].getElementsByClassName("quality-down")[0].addEventListener("click", function(e){
            let title = e.target.parentElement.parentElement.getElementsByClassName("card-title")[0].innerText;
            let ideaInstance = JSON.parse(localStorage.getItem(title));
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
            e.target.closest(".card").getElementsByClassName("quality-label")[0].innerText = `Quality: ${ideaInstance.quality}`;
            localStorage.setItem(title, JSON.stringify(ideaInstance));
        });
        /* Starred button event */
        ideaCardSection.children[i].getElementsByClassName("favorite")[0].addEventListener("click", function(e){
            let title = e.target.parentElement.parentElement.getElementsByClassName("card-title")[0].innerText;
            let ideaInstance = JSON.parse(localStorage.getItem(title));
            if (ideaInstance.starred) {
                e.target.classList.remove("favorite-starred");
            } else {
                e.target.classList.add("favorite-starred");
            }
            ideaInstance.starred = !ideaInstance.starred;
            localStorage.setItem(title, JSON.stringify(ideaInstance));
        });
    }
}
function openMenu() {
    menu.style.display = "block";
}
function closeMenu() {
    menu.style.display = "none";
}