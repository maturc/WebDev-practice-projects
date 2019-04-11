var titleInput = document.getElementById("title-input");
var bodyInput = document.getElementById("body-input");
var saveButton = document.getElementById("save-button");
var ideaCardSection = document.getElementById("idea-card-section");

titleInput.addEventListener("input", enableSaveButton);
bodyInput.addEventListener("input", enableSaveButton);
saveButton.addEventListener("click", saveIdea);

displayIdeas();

function enableSaveButton() {
    if (titleInput.value == "" || bodyInput.value == "") {
        saveButton.disabled = true;
    } else {
        saveButton.disabled = false;
    }
}
function saveIdea() {
    var ideaInstance = new Idea(titleInput.value, bodyInput.value);
    localStorage.setItem(ideaInstance.title, JSON.stringify(ideaInstance));
}
function displayIdeas() {
    ideaCardSection.innerHTML += (`
        <div class="card">
            <header class="card-header">
                <div class="favorite"></div>
                <div class="delete"></div>
            </header>
            <main class="card-main">
                <h2 class="card-title">Test test</h2>
                <p class="card-body">SDSADASDASDAS ppsdpapdsapsdas sdasdas dsad.</p>
            </main>
            <footer class="quality">
                <div class="quality-up"></div>
                <span class="quality-label">Test quality</span>
                <div class="quality-down"></div>
            </footer>
        </div>
    `);
}