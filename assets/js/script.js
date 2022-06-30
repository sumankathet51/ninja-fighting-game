import { canvas, context } from "./constants.js";
import Game from "./game.js";
import { MapEditor } from "./levelEditor.js";
import { Level1 } from "./levels/level1.js";
import { Level2 } from "./levels/level2.js";
import { Obstacle } from "./obstacle.js";
import Vector from "./vector.js";

const bgAnimation = document.querySelector(".ninja-animation");
const startScreen = document.querySelector(".startUpScreen");
const bgPositions = [
    new Vector({ x: 1330, y: 2771 }),
    new Vector({ x: 513, y: 2742 }),
    new Vector({ x: 101, y: 2721 }),
    new Vector({ x: 910, y: 2691 }),
    new Vector({ x: 2594, y: 2265 }),
    new Vector({ x: 2567, y: 1883 }),
    new Vector({ x: 2610, y: 1057 }),
    new Vector({ x: 2606, y: 1447 }),
    new Vector({ x: 2184, y: 1449 }),
    new Vector({ x: 2574, y: 627 }),
    new Vector({ x: 2590, y: 217 }),
    new Vector({ x: 2184, y: 2267 }),
    new Vector({ x: 1786, y: 2267 }),
    new Vector({ x: 1360, y: 2267 }),
    new Vector({ x: 954, y: 2267 }),
    new Vector({ x: 546, y: 2267 }),
    new Vector({ x: 954, y: 2267 }),
    new Vector({ x: 2185, y: 1037 }),
    new Vector({ x: 2185, y: 627 }),
    new Vector({ x: 2183, y: 217 }),
    new Vector({ x: 2185, y: 627 }),
    new Vector({ x: 979, y: 1857 }),
    new Vector({ x: 551, y: 1857 }),
    new Vector({ x: 134, y: 1862 }),
    new Vector({ x: 1757, y: 1480 }),
    new Vector({ x: 115, y: 1485 }),
    new Vector({ x: 1790, y: 1063 }),
];
let counter = 0;
let add = true;
const ninjaAnimation = setInterval(() => {
    if (counter >= bgPositions.length - 1) add = false;
    if (counter <= 0) add = true;

    bgAnimation.style.backgroundPosition = `-${bgPositions[counter].x}px -${bgPositions[counter].y}px`;
    if (add) counter++;
    else counter--;
    // console.log(bgPositions[counter], counter);
}, 100);

const startButtons = document.querySelectorAll(".start-btn");
startButtons.forEach((startButton) => {
    startButton.addEventListener("click", function() {
        startScreen.style.left = "-100%";
        clearInterval(ninjaAnimation);
        setTimeout(() => {
            const level1 = new Level1(this.dataset.singleplayer === "true");
            // game.initialize(this.dataset.singleplayer === "true");
        }, 1000);
    });
});

// const mapEditor = new MapEditor(canvas, context);

// const obstacleElements = document.querySelectorAll(
//     ".obstacles__img-container img"
// );
// obstacleElements.forEach((obstacle) => {
//     obstacle.addEventListener("dblclick", function() {
//         // const obstacle = new Obstacle(
//         //     200,
//         //     200,
//         //     this.height,
//         //     this.width,
//         //     this,
//         //     true
//         // );
//         mapEditor.selectImage(this, true);
//         mapEditor.draw();
//         console.log(this);
//     });
// });