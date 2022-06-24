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
        stand: "./images/haku_kale/ninja_stand.png",
        walk: "./images/haku_kale/ninja_run.png",
        hit: "./images/haku_kale/ninja_hit.png",
        attack: "./images/haku_kale/ninja_attack.png",
    },
    character2: {
        stand: "./images/pandu/ninja_stand.png",
        walk: "./images/pandu/ninja_run.png",
        hit: "./images/pandu/ninja_hit.png",
        attack: "./images/pandu/ninja_attack.png",
    },
};

/**
 * @const {Array} - Holds the background image to be used
 */
export const backgroundImages = ["./images/bg_1.jpg"];

/**
 * @const {number} - Holds the total number of frames
 */
export const TOTAL_FRAMES = 9;