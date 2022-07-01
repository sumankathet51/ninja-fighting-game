import data from "./levels/gameMap.js";
import { Obstacle } from "./obstacle.js";
import { getMousePos } from "./utilities.js";

export class MapEditor {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.selectedImage = 0;
        this.obstacles = [];
        this.isDragging = false;
        this.startX;
        this.startY;
        this.canvas.width = 1024;
        this.canvas.height = 576;
        this.currentIndex = 0;
        this.grid = true;
        this.draw();
        this.addEventListeners();
    }

    draw = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(
            document.getElementById("bg"),
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
        this.obstacles.forEach((obstacle) => {
            this.context.drawImage(
                obstacle.image,
                obstacle.position.x,
                obstacle.position.y,
                obstacle.width,
                obstacle.height
            );
        });

        if (this.grid) {
            for (let x = 0; x < 1024; x += 50) {
                this.context.moveTo(x, 0);
                this.context.lineTo(x, 576);
            }

            for (let y = 0; y < 576; y += 50) {
                this.context.moveTo(0, y);
                this.context.lineTo(1024, y);
            }
            this.context.lineWidth = 1;
            this.context.strokeStyle = "#ddd";
            this.context.stroke();
        }
    };

    selectImage = (image, isObstacle) => {
        const obstacle = new Obstacle(
            200,
            200,
            image.height,
            image.width,
            image,
            isObstacle
        );
        this.obstacles.push(obstacle);
        this.draw();
    };

    mouseDown = (event) => {
        event.preventDefault();

        const mouseCoordinates = getMousePos(this.canvas, event);

        this.startX = mouseCoordinates.x;
        this.startY = mouseCoordinates.y;
        this.obstacles.forEach((obstacle, index) => {
            if (this.checkMousePosition(this.startX, this.startY, obstacle)) {
                this.currentIndex = index;
                this.isDragging = true;
                return;
            }
        });
    };

    mouseUp = (event) => {
        if (!this.isDragging) return;
        event.preventDefault();
        this.isDragging = false;
        // console.log(event);
    };

    mouseOut = (event) => {
        if (!this.isDragging) return;
        event.preventDefault();
        this.isDragging = false;
        // console.log(isDragging);
    };

    mouseMove = (event) => {
        if (!this.isDragging) return;
        event.preventDefault();
        const mouseCoordinates = getMousePos(this.canvas, event);
        const x = mouseCoordinates.x;
        const y = mouseCoordinates.y;

        const dx = x - this.startX;
        const dy = y - this.startY;

        const currentObstacle = this.obstacles[this.currentIndex];
        currentObstacle.position.x += dx;
        currentObstacle.position.y += dy;

        this.draw();

        this.startX = x;
        this.startY = y;
    };

    checkMousePosition = (x, y, obstacle) => {
        if (
            x > obstacle.position.x &&
            x < obstacle.position.x + obstacle.width &&
            y > obstacle.position.y &&
            y < obstacle.position.y + obstacle.height
        ) {
            return true;
        }
        return false;
    };

    deleteBlock = (event) => {
        event.preventDefault();
        const mouseCoordinates = getMousePos(this.canvas, event);
        this.startX = mouseCoordinates.x;
        this.startY = mouseCoordinates.y;
        this.obstacles.forEach((obstacle, index) => {
            if (this.checkMousePosition(this.startX, this.startY, obstacle)) {
                this.obstacles = this.obstacles.filter((value, index) => {
                    return value !== obstacle;
                });
                this.draw();
                return;
            }
        });
    };

    addEventListeners = () => {
        this.canvas.addEventListener("mousedown", this.mouseDown);
        this.canvas.addEventListener("mouseup", this.mouseUp);
        this.canvas.addEventListener("mouseout", this.mouseOut);
        this.canvas.addEventListener("mousemove", this.mouseMove);
        this.canvas.addEventListener("dblclick", this.deleteBlock);
        this.canvas.addEventListener("click", (e) => {
            if (!this.selectedImage) return;
            const obstacle = new Obstacle(
                e.offsetX,
                e.offsetY,
                this.selectedImage.width,
                this.selectedImage.height,
                this.selectedImage
            );
            this.obstacles.push(obstacle);
            this.draw();
        });
    };

    createLevel = () => {
        // let obData = JSON.stringify(this.obstacles);
        // console.log(obData);
        fetch("http://localhost:3000/api/game/store/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: "Level",
                    obstacles: this.obstacles,
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        // console.log(obstacles);
    };

    toggleGrid = () => {
        console.log("Hello");
        if (this.grid) {
            this.grid = false;
        } else {
            this.grid = true;
        }
        this.draw();
    };
}