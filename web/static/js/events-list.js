"use strict";

export class EventsList {
    constructor(list) {
        this.list = list;
    }

    updateList(payload) {
        var item = document.createElement("li");

        item.appendChild(document.createTextNode(`${payload.who} - ${payload.action}`));
        this.list.appendChild(item);

        this.list.scrollTop = this.list.scrollHeight;
    }
}
