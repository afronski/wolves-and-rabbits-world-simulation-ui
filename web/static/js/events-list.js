"use strict";

export class EventsList {
    constructor(list) {
        this.list = list;

        this.references = [];
        this.maxLength = 30;
    }

    updateList(payload) {
        let item = document.createElement("li");
        item.appendChild(document.createTextNode(`${payload.who}, ${payload.action}`));

        this.list.appendChild(item);
        this.references.push(item);

        if (this.references.length > this.maxLength) {
            this.list.removeChild(this.references.shift());
        }
    }
}
