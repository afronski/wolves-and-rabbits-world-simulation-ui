"use strict";

import { Socket } from "phoenix";

const IS_BACKGROUND_AUDIO_MUTED_KEY = "BackgroundAudioMuted";

let backgroundAudio = document.querySelector("#background-audio");

let startSimulation = document.querySelector("#start-simulation");
let stopSimulation = document.querySelector("#stop-simulation");

let App = {
    simulationState: false
};

let socket = new Socket("/communications");

socket.connect();
socket.join("controller", {}).receive("ok", channel => {
    console.info("Communication channel: attached, Channel:", channel);

    startSimulation.addEventListener("click", function () {
        startSimulation.setAttribute("disabled", true);
        stopSimulation.removeAttribute("disabled");

        App.simulationState = true;

        channel.push("start_simulation");
    });

    stopSimulation.addEventListener("click", function () {
        stopSimulation.setAttribute("disabled", true);
        startSimulation.removeAttribute("disabled");

        App.simulationState = false;

        channel.push("stop_simulation");
    });
});

stopSimulation.addEventListener("click", function () {
    stopSimulation.setAttribute("disabled", true);
    startSimulation.removeAttribute("disabled");

    App.simulationState = false;
});

document.addEventListener("DOMContentLoaded", function () {
    backgroundAudio.muted = JSON.parse(window.localStorage.getItem(IS_BACKGROUND_AUDIO_MUTED_KEY)) || false;

    backgroundAudio.loop = true;
    backgroundAudio.play();

    window.addEventListener("keydown", function (event) {
        var key = event.keyCode || event.which;

        // Mute background audio via "m" or "M" key.

        if (key === 77) {
            backgroundAudio.muted = !backgroundAudio.muted;
            window.localStorage.setItem(IS_BACKGROUND_AUDIO_MUTED_KEY, backgroundAudio.muted);
        }
    }, false);
});
