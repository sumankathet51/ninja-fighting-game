import Vector from "./vector.js";

/**
 * @const {object} - Holds the html canvas element
 */
export const canvas = document.getElementById("canvas");

/**
 * @const {CanvasRenderingContext2D} - Holds the context of the html canvas
 */
export const context = canvas.getContext("2d");

/**
 * @const {number} - Holds the acceleration due to gravity value to be sued in the game
 */
export const GRAVITY = 0.9;

canvas.width = 1024;
canvas.height = 576;
context.fillStyle = "black";
context.fillRect(0, 0, canvas.width, canvas.height);

/**
 * @const {object} - Holds the keys combination to be used by each characters
 */
export const keys = {
    character1: {
        up: {
            key: "w",
            pressed: false,
        },
        down: {
            key: "s",
            pressed: false,
        },
        left: {
            key: "a",
            pressed: false,
        },
        right: {
            key: "d",
            pressed: false,
        },
        attack: {
            key: "e",
            pressed: false,
        },
    },

    character2: {
        up: {
            key: "i",
            pressed: false,
        },
        down: {
            key: "k",
            pressed: false,
        },
        left: {
            key: "j",
            pressed: false,
        },
        right: {
            key: "l",
            pressed: false,
        },
        attack: {
            key: "o",
            pressed: false,
        },
    },
};

/**
 * @const {object} - Holds the sprite images of each characters
 */
export const characters = {
    character1: {
        stand: new Image(),
        walk: new Image(),
        hit: new Image(),
        attack: new Image(),
        dead: new Image(),
    },
    character2: {
        stand: new Image(),
        walk: new Image(),
        hit: new Image(),
        attack: new Image(),
        dead: new Image(),
    },
};

characters.character1.stand.src = "./images/ninja/ninja_stand.png";
characters.character1.walk.src = "./images/ninja/ninja_run.png";
characters.character1.hit.src = "./images/ninja/ninja_hit.png";
characters.character1.attack.src = "./images/ninja/ninja_attack.png";
characters.character1.dead.src = "./images/ninja/ninja_dead.png";

characters.character2.stand.src = "./images/pandu/ninja_stand.png";
characters.character2.walk.src = "./images/pandu/ninja_run.png";
characters.character2.hit.src = "./images/pandu/ninja_hit.png";
characters.character2.attack.src = "./images/pandu/ninja_attack.png";
characters.character2.dead.src = "./images/pandu/ninja_dead.png";

export const playerHealthIndicator = document.querySelectorAll(
    ".healthbar__availableHealth"
);

export const bloodAnimation = new Image();
bloodAnimation.src = "./images/blood_animation.png";

export const bloodSpriteCoordinates = [
    new Vector({ x: 1168, y: 200 }),
    new Vector({ x: 1592, y: 176 }),
    new Vector({ x: 1024, y: 664 }),
    new Vector({ x: 1560, y: 680 }),
    new Vector({ x: 528, y: 1192 }),
    new Vector({ x: 1064, y: 1192 }),
    new Vector({ x: 1576, y: 1192 }),
    new Vector({ x: 1080, y: 1696 }),
    new Vector({ x: 1592, y: 1696 }),
];

export const bloodSpriteHeight = 200;
export const bloodSpritewidth = 344;
/**
 * @const {Array} - Holds the background image to be used
 */
export const backgroundImages = [(new Image().src = "./images/bg_1.jpg")];

/**
 * @const {number} - Holds the total number of frames
 */
export const TOTAL_FRAMES = 9;

export const DEFAULT_FPS = 60;

export const CURRENT_TIME = document.getElementById("time");

export const WINNER_CONTAINER = document.querySelector(".winner");

export const WINNER_STATEMENT = document.getElementById("winner__Declaration");