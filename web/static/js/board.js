"use strict";

const TILE_SIZE = 10;

export class Board {
    constructor(width, height, margin, canvas, loaded) {
        this.width = width;
        this.height = height;

        this.worldWidth = width / TILE_SIZE;
        this.worldHeight = height / TILE_SIZE;

        this.margin = margin / TILE_SIZE / 2;

        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.movement = {};
        this.tiles = {
            grass: this.loadTile("grass"),
            carrot: this.loadTile("carrot"),
            rabbit: this.loadTile("rabbit"),
            wolf: this.loadTile("wolf")
        };

        this.clearBackground();
        this.drawTerrain();

        loaded();
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
            for (let y = startingY; y < this.worldHeight - this.margin; ++y) {
                this.clear(x, y);
            }
        }
    }

    draw(tile, x, y) {
        this.context.drawImage(this.tiles[tile], x * TILE_SIZE, y * TILE_SIZE);
    }

    clear(x, y) {
        this.context.drawImage(this.tiles.grass, x * TILE_SIZE, y * TILE_SIZE);
    }

    updateBoard(payload) {
        if (payload.x) {
            payload.x += this.margin;
        }

        if (payload.y) {
            payload.y += this.margin;
        }

        switch(payload.action) {
            case "planted":
                this.draw("carrot", payload.x, payload.y);
                break;

            case "eaten":
                this.clear(payload.x, payload.y);
                break;

            case "born":
                this.movement[payload.id] = { x: payload.x, y: payload.y };
                this.draw(payload.who, payload.x, payload.y);
                break;

            case "move":
                let lastPosition = this.movement[payload.id];

                if (lastPosition) {
                    this.clear(lastPosition.x, lastPosition.y);
                }

                this.movement[payload.id] = { x: payload.x, y: payload.y };
                this.draw(payload.who, payload.x, payload.y);
                break;

            case "died":
                delete this.movement[payload.id];
                this.clear(payload.x, payload.y);
                break;
        }
    }
}
