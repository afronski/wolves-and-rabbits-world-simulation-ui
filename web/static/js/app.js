"use strict";

import { Socket } from "phoenix";

const IS_BACKGROUND_AUDIO_MUTED_KEY = "BackgroundAudioMuted";

let backgroundAudio = document.querySelector("#background-audio");

let startSimulation = document.querySelector("#start-simulation");
let stopSimulation = document.querySelector("#stop-simulation");

let eventsList = document.querySelector("#events-list");

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

socket.join("events", {}).receive("ok", channel => {
    console.info("Events channel: attached, Channel:", channel);

    channel.on("incoming", payload => {
        var item = document.createElement("li");

        item.appendChild(document.createTextNode(`${payload.who} - ${payload.action}`));
        eventsList.appendChild(item);

        eventsList.scrollTop = eventsList.scrollHeight;
    });
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
