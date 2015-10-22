"use strict";

import { Socket } from "deps/phoenix/web/static/js/phoenix";

import { EventsList } from "./events-list";
import { Board } from "./board";

const APP_STATE_KEY = "ApplicationState";
const DEFAULT_STATE = {
    audio: true,
    debug: false
};

class App {
    constructor() {
        this.canvas = document.querySelector("#terrain");

        this.backgroundAudio = document.querySelector("#background-audio");

        this.startSimulation = document.querySelector("#start-simulation");
        this.stopSimulation = document.querySelector("#stop-simulation");

        this.state = JSON.parse(window.localStorage.getItem(APP_STATE_KEY)) || DEFAULT_STATE;
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
        this.board = new Board(width, height, margin, this.canvas, () => {
            this.connect();
        });
    }

    stop() {
        this.stopSimulation.setAttribute("disabled", true);
        this.startSimulation.removeAttribute("disabled");

        this.simulationState = false;
    }

    start() {
        this.startSimulation.setAttribute("disabled", true);
        this.stopSimulation.removeAttribute("disabled");

        this.simulationState = true;
    }

    connect() {
        let socket = new Socket("/communications", { params: { token: window.userToken } });

        socket.connect();

        let controller = socket.channel("controller", {});

        controller.on("stop_simulation", () => {
            this.stop();
        });

        controller.on("start_simulation", () => {
            this.start();
        });

        controller.join().receive("ok", response => {
            console.info("Communication channel - attached, Response:", response);

            this.startSimulation.addEventListener("click", () => {
                this.start();
                controller.push("start_simulation");
            });

            this.stopSimulation.addEventListener("click", () => {
                this.stop();
                controller.push("stop_simulation");
            });
        });

        let events = socket.channel("events", {});

        events.on("incoming", payload => {
            this.events.updateList(payload);
            this.board.updateBoard(payload);

            if (this.state.debug) {
                console.debug("Event:", payload);
            }
        });

        events.join().receive("ok", response => {
            console.info("Events channel - attached, Response:", response);
        });
    }

    playMusic() {
        this.backgroundAudio.muted = !this.state.audio;

        this.backgroundAudio.loop = true;
        this.backgroundAudio.play();

        window.addEventListener("keydown", (event) => {
            let key = event.keyCode || event.which;

            // Mute background audio via "m" or "M" key.

            if (key === 77) {
                this.state.audio = !this.state.audio;
                this.backgroundAudio.muted = !this.state.audio;

                window.localStorage.setItem(APP_STATE_KEY, JSON.stringify(this.state));
            }

            // Mute background audio via "d" or "D" key.

            if (key === 68) {
                this.state.debug = !this.state.debug;
                window.debug = this.state.debug;

                window.localStorage.setItem(APP_STATE_KEY, JSON.stringify(this.state));
            }
        }, false);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let app = new App();

    window.debug = app.state.debug;

    app.playMusic();
    app.initialize();
});
