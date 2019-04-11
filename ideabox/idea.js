class Idea {
    constructor (title, body) {
        this.title = title;
        this.body = body;
        this.starred = false;
        this.qualityList = ['Swill', 'Plausible', 'Genius'];
        this.quality = this.qualityList[0];
    }
    saveToStorage() {
        localStorage.setItem();
    }
    deleteFromStorage() {
        localStorage.removeItem();
    }
    updateIdea() {
        localStorage.setItem();
    }
    updateQuality() {
        localStorage.setItem();
    }
}