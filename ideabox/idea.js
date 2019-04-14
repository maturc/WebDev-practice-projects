"use strict";
class Idea {
    constructor (title, body) {
        this.title = String(title);
        this.body = String(body);
        this.starred = false;
        this.quality = "Swill";
    }
    saveToStorage() {
        localStorage.setItem(this.title, JSON.stringify(this));
    }
}