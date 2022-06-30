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
    ninja: {
        stand: new Image(),
        walk: new Image(),
        hit: new Image(),
        attack: new Image(),
        dead: new Image(),
        positions: [
            new Vector({ x: 76, y: 12 }),
            new Vector({ x: 400, y: 12 }),
            new Vector({ x: 561, y: 12 }),
            new Vector({ x: 76, y: 175 }),
            new Vector({ x: 238, y: 175 }),
            new Vector({ x: 400, y: 175 }),
            new Vector({ x: 76, y: 336 }),
            new Vector({ x: 238, y: 336 }),
            new Vector({ x: 400, y: 336 }),
        ],
        deadPositions: [
            new Vector({ x: 80, y: 13 }),
            new Vector({ x: 384, y: 20 }),
            new Vector({ x: 65, y: 181 }),
            new Vector({ x: 231, y: 180 }),
            new Vector({ x: 395, y: 187 }),
            new Vector({ x: 371, y: 187 }),
            new Vector({ x: 217, y: 358 }),
            new Vector({ x: 55, y: 346 }),
            new Vector({ x: 525, y: 68 }),
        ],
    },
    pandu: {
        stand: new Image(),
        walk: new Image(),
        hit: new Image(),
        attack: new Image(),
        dead: new Image(),
        positions: [
            new Vector({ x: 76, y: 12 }),
            new Vector({ x: 400, y: 12 }),
            new Vector({ x: 561, y: 12 }),
            new Vector({ x: 76, y: 175 }),
            new Vector({ x: 238, y: 175 }),
            new Vector({ x: 400, y: 175 }),
            new Vector({ x: 76, y: 336 }),
            new Vector({ x: 238, y: 336 }),
            new Vector({ x: 400, y: 336 }),
        ],

        deadPositions: [
            new Vector({ x: 76, y: 12 }),
            new Vector({ x: 400, y: 12 }),
            new Vector({ x: 561, y: 12 }),
            new Vector({ x: 76, y: 175 }),
            new Vector({ x: 238, y: 175 }),
            new Vector({ x: 400, y: 175 }),
            new Vector({ x: 76, y: 336 }),
            new Vector({ x: 238, y: 336 }),
            new Vector({ x: 400, y: 336 }),
        ],
    },
};

characters.ninja.stand.src = "./images/ninja/ninja_stand.png";
characters.ninja.walk.src = "./images/ninja/ninja_run.png";
characters.ninja.hit.src = "./images/ninja/ninja_hit.png";
characters.ninja.attack.src = "./images/ninja/ninja_attack.png";
characters.ninja.dead.src = "./images/ninja/ninja_dead.png";

characters.pandu.stand.src = "./images/pandu/ninja_stand.png";
characters.pandu.walk.src = "./images/pandu/ninja_run.png";
characters.pandu.hit.src = "./images/pandu/ninja_hit.png";
characters.pandu.attack.src = "./images/pandu/ninja_attack.png";
characters.pandu.dead.src = "./images/pandu/ninja_dead.png";

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