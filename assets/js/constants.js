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
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
};

const characters = [
    "./images/haku_kale/ninja_stand.png",
    "./images/pandu/ninja_stand.png",
    "./images/sundari/ninja.png",
    "./images/sikaru_maila/ninja.png",
];

const backgroundImages = ["./images/bg_1.jpg"];

const TOTAL_FRAMES = 9;