"use strict";
class Idea {
    constructor (title, body) {
        this.title = title;
        this.body = body;
        this.starred = false;
        this.quality = "Swill";
    }
    saveToStorage() {
        localStorage.setItem(this.title, JSON.stringify(this));
    }
    deleteFromStorage() {
        localStorage.removeItem(this.title, JSON.stringify(this));
    }
    updateIdea() {
        localStorage.setItem(this.title, JSON.stringify(this));
    }
    updateQuality() {
        localStorage.setItem();
    }
}