import {
    bgPositions,
    canvas,
    context,
    OBSTACLE_CONTAINER,
    TIMER,
    WINNER_CONTAINER,
} from "./constants.js";
import { MapEditor } from "./levelEditor.js";
import { Level1 } from "./levels/level1.js";
import { Level2 } from "./levels/level2.js";

const bgAnimation = document.querySelector(".ninja-animation");
const startScreen = document.querySelector(".startUpScreen");
const playerControls = document.querySelectorAll(".player-controls");

let counter = 0;
let add = true;
let settingsOPen = false;
let game;

let mapEditor = new MapEditor(canvas, context);
let ninjaAnimation;

function startUpAnimation() {
    ninjaAnimation = setInterval(() => {
        if (counter >= bgPositions.length - 1) add = false;
        if (counter <= 0) add = true;

        bgAnimation.style.backgroundPosition = `-${bgPositions[counter].x}px -${bgPositions[counter].y}px`;
        if (add) counter++;
        else counter--;
    }, 100);
}

window.addEventListener("load", () => {
    startUpAnimation();
});

const startButtons = document.querySelectorAll(".start-btn");
startButtons.forEach((startButton) => {
    startButton.addEventListener("click", function() {
        startScreen.style.left = "-100%";
        clearInterval(ninjaAnimation);
        setTimeout(() => {
            if (this.dataset.mode === "singlePlayer") {
                OBSTACLE_CONTAINER.style.display = "none";
                TIMER.style.display = "block";
                game = new Level1(true);
                // game = new Level2();
                game.start();
            } else if (this.dataset.mode === "multiPlayer") {
                OBSTACLE_CONTAINER.style.display = "none";
                TIMER.style.display = "block";
                game = new Level1(false);
                game.start();
            } else {
                const obstacleElements = document.querySelectorAll(
                    ".obstacles__img-container img"
                );
                canvas.style.display = "block";
                mapEditor.draw();
                obstacleElements.forEach((obstacle) => {
                    obstacle.addEventListener("dblclick", function() {
                        mapEditor.selectImage(this, true);
                        mapEditor.draw();
                    });
                });
                OBSTACLE_CONTAINER.style.display = "flex";
                TIMER.style.display = "none";
            }
            // game.initialize(this.dataset.singleplayer === "true");
        }, 1000);
    });
});

document.getElementById("toggleGrid").addEventListener("click", () => {
    mapEditor.toggleGrid();
});

document.getElementById("createLevel").addEventListener("click", () => {
    mapEditor.createLevel();
});

document.getElementById("restartGame").addEventListener("click", () => {
    WINNER_CONTAINER.style.display = "none";
    clearInterval(game.timeCounter);
    if (game.singleplayer) clearInterval(game.findPlayer);
    cancelAnimationFrame(game.animationFrame);
    game.start();
});

document.getElementById("main-menu").addEventListener("click", () => {
    startUpAnimation();
    canvas.style.display = "none";
    WINNER_CONTAINER.style.display = "none";
    startScreen.style.left = "50%";
    if (game) {
        clearInterval(game.timeCounter);
        if (game.singleplayer) clearInterval(game.findPlayer);
        cancelAnimationFrame(game.animationFrame);
    }
});

document.querySelector(".menu").addEventListener("click", () => {
    canvas.style.display = "none";
    WINNER_CONTAINER.style.display = "none";
    startScreen.style.left = "50%";
});

document.getElementById("new-game").addEventListener("click", () => {
    WINNER_CONTAINER.style.display = "none";
    game = new Level2();
});

document.querySelector(".settings__icon").addEventListener("click", () => {
    if (settingsOPen) {
        settingsOPen = false;
        playerControls.forEach((control) => {
            control.style.opacity = "1";
        });
    } else {
        settingsOPen = true;
        playerControls.forEach((control) => {
            control.style.opacity = "0";
        });
    }
});