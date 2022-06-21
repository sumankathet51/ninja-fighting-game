const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
context.fillStyle = "black";
context.fillRect(0, 0, canvas.width, canvas.height);

const GRAVITY = 0.9;