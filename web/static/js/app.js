"use strict";

import { Socket } from "phoenix";
import { EventsList } from "./events-list";
import { Board } from "./board";

const IS_BACKGROUND_AUDIO_MUTED_KEY = "BackgroundAudioMuted";

class App {
    constructor() {
        this.canvas = document.querySelector("#terrain");

        this.backgroundAudio = document.querySelector("#background-audio");

        this.startSimulation = document.querySelector("#start-simulation");
        this.stopSimulation = document.querySelector("#stop-simulation");

        this.audioMuted = JSON.parse(window.localStorage.getItem(IS_BACKGROUND_AUDIO_MUTED_KEY)) || false;
        this.simulationState = this.canvas.getAttribute("data-world-simulation-started") === "true";

        this.events = null;
        this.board = null;

        if (this.simulationState) {
            this.startSimulation.setAttribute("disabled", true);
            this.stopSimulation.removeAttribute("disabled");
        }
    }

    initialize() {
        let width = parseInt(this.canvas.getAttribute("width"), 10);
        let height = parseInt(this.canvas.getAttribute("height"), 10);

        let margin = parseInt(this.canvas.getAttribute("data-world-margin"), 10);

        let eventsList = document.querySelector("#events-list");

        this.events = new EventsList(eventsList);
        this.board = new Board(width, height, margin, this.canvas, () => { this.connect() });
    }

    connect() {
        let socket = new Socket("/communications");

        socket.connect();

        socket.join("controller", {}).receive("ok", channel => {
            console.info("Communication channel: attached, Channel:", channel);

            this.startSimulation.addEventListener("click", () => {
                this.startSimulation.setAttribute("disabled", true);
                this.stopSimulation.removeAttribute("disabled");

                this.simulationState = true;

                channel.push("start_simulation");
            });

            this.stopSimulation.addEventListener("click", () => {
                this.stopSimulation.setAttribute("disabled", true);
                this.startSimulation.removeAttribute("disabled");

                this.simulationState = false;

                channel.push("stop_simulation");
            });
        });

        socket.join("events", {}).receive("ok", channel => {
            console.info("Events channel: attached, Channel:", channel);

            channel.on("incoming", payload => {
                this.events.updateList(payload);
                this.board.updateBoard(payload);
            });
        });
    }

    playMusic() {
        this.backgroundAudio.muted = this.audioMuted;

        this.backgroundAudio.loop = true;
        this.backgroundAudio.play();

        window.addEventListener("keydown", (event) => {
            let key = event.keyCode || event.which;

            // Mute background audio via "m" or "M" key.

            if (key === 77) {
                this.audioMuted = !this.audioMuted;
                this.backgroundAudio.muted = this.audioMuted;

                window.localStorage.setItem(IS_BACKGROUND_AUDIO_MUTED_KEY, this.audioMuted);
            }
        }, false);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let app = new App();

    app.playMusic();
    app.initialize();
});
