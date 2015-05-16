"use strict";

const TILE_SIZE = 40;

export class Board {
    constructor(width, height, margin, canvas, loadedCallback) {
        this.width = width;
        this.height = height;

        this.worldWidth = width / TILE_SIZE;
        this.worldHeight = height / TILE_SIZE;

        this.margin = margin / TILE_SIZE / 2;

        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.movement = {};
        this.placement = [];
        this.tiles = {
            grass: this.loadTile("grass"),
            carrot: this.loadTile("carrot"),
            rabbit: this.loadTile("rabbit"),
            wolf: this.loadTile("wolf")
        };

        this.clearBackground();
        this.drawTerrain();

        loadedCallback();
    }

    loadTile(name) {
        return document.querySelector(`#${name}`);
    }

    clearBackground() {
        this.context.fillStyle = "#256D7B";
        this.context.fillRect(0, 0, this.width, this.height);
    }

    drawTerrain() {
        let startingX = this.margin;
        let startingY = this.margin;

        for (let x = startingX; x < this.worldWidth - this.margin; ++x) {
            this.placement[x - this.margin] = [];

            for (let y = startingY; y < this.worldHeight - this.margin; ++y) {
                this.placement[x - this.margin][y - this.margin] = [];

                this.clear(x, y);
            }
        }
    }

    draw(tile, x, y) {
        this.context.drawImage(this.tiles[tile], x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    clear(x, y) {
        this.context.drawImage(this.tiles.grass, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    trackMovement(id, x, y) {
        this.movement[id] = { x, y };
    }

    untrackMovement(id) {
        delete this.movement[id];
    }

    getLastPosition(id) {
        return this.movement[id];
    }

    removeFromCell(x, y, id) {
        let placement = this.placement[x - this.margin - 1][y - this.margin - 1];

        if (!placement || placement.length === 0) {
            return;
        }

        let results = placement.filter((e) => e.id !== id);
        let overriding = null;

        if (results.filter((e) => e.who === "carrot").length > 0) {
            overriding = "carrot";
        }

        if (results.filter((e) => e.who === "rabbit").length > 0) {
            overriding = "rabbit";
        }

        if (results.filter((e) => e.who === "wolf").length > 0) {
            overriding = "wolf";
        }

        if (results.length === 0) {
            this.clear(x, y);
        } else {
            this.draw(overriding, x, y);
        }

        this.placement[x - this.margin - 1][y - this.margin - 1] = results;
    }

    drawGhost(payload, color) {
        this.context.globalAlpha = 0.4;
        this.context.fillStyle = color;
        this.context.fillRect(payload.x * TILE_SIZE, payload.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        this.context.globalAlpha = 1.0;
    }

    addToCell(x, y, object) {
        this.placement[x - this.margin - 1][y - this.margin - 1].push(object);
        this.draw(object.who, x, y);
    }

    updateBoard(payload) {
        let result = null;
        let lastPosition = null;

        if (payload.x) {
            payload.x += this.margin;
        }

        if (payload.y) {
            payload.y += this.margin;
        }

        switch(payload.action) {
            case "planted":
                this.addToCell(payload.x, payload.y, { who: payload.who, id: payload.id });
                break;

            case "born":
                this.addToCell(payload.x, payload.y, { who: payload.who, id: payload.id });
                this.trackMovement(payload.id, payload.x, payload.y);

                if (window.debug) {
                    this.drawGhost(payload, "#FFFFFF");
                }
                break;

            case "move":
                lastPosition = this.getLastPosition(payload.id);

                if (lastPosition) {
                    this.removeFromCell(lastPosition.x, lastPosition.y, payload.id);
                }

                this.addToCell(payload.x, payload.y, { who: payload.who, id: payload.id });
                this.trackMovement(payload.id, payload.x, payload.y);
                break;

            case "eaten":
                this.removeFromCell(payload.x, payload.y, payload.id);

                if (window.debug) {
                    this.drawGhost(payload, "#0000FF");
                }
                break;

            case "died":
                this.removeFromCell(payload.x, payload.y, payload.id);

                lastPosition = this.getLastPosition(payload.id);
                this.removeFromCell(lastPosition.x, lastPosition.y, payload.id);

                this.untrackMovement(payload.id);

                if (window.debug) {
                    this.drawGhost(payload, "#FF0000");
                }
                break;
        }
    }
}
