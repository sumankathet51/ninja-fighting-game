const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const GRAVITY = 0.9;

canvas.width = 1024;
canvas.height = 576;
context.fillStyle = "black";
context.fillRect(0, 0, canvas.width, canvas.height);

const keys = {
    w: "up",
    s: "down",
    a: "left",
    d: "right",
    f: "fight",
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    1: "fight",
};

const characters = {
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

const backgroundImages = ["./images/bg_1.jpg"];

const TOTAL_FRAMES = 9;