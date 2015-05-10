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

        this.tiles = {
            grass: this.loadTile("grass")
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
                this.context.drawImage(this.tiles.grass, x * TILE_SIZE, y * TILE_SIZE);
            }
        }
    }

    updateBoard(payload) {}
}
