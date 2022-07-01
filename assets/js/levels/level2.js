import Character from "../character.js";
import {
    canvas,
    characters,
    context,
    GRAVITY,
    keys,
    playerHealthIndicator,
} from "../constants.js";
import Game from "../game.js";
import { Obstacle } from "../obstacle.js";
import { calcDistance } from "../utilities.js";
import Vector from "../vector.js";
import data from "./gameMap.js";
export class Level2 extends Game {
    constructor() {
        super(59);
        this.bgImage = new Image();
        this.bgImage.src = "/images/BG.png";
        this.obstacles = [];
        // console.log(data)
        this.start();
        data.forEach((obstacleData) => {
            const image = new Image();
            image.src = obstacleData.url;
            const obstacle = new Obstacle(
                obstacleData.position.x,
                obstacleData.position.y,
                obstacleData.height,
                obstacleData.width,
                image,
                obstacleData.isObstacle
            );
            this.obstacles.push(obstacle);

            // this.singleplayer = isSinglePlayer;
        });
    }

    start() {
        canvas.style.display = "block";

        this.player1 = new Character(
            new Vector({
                x: 0,
                y: 0,
            }),
            new Vector({
                x: 0,
                y: 0,
            }),
            86,
            75,
            keys.character1,
            characters.ninja,
            false
            // playerHealthIndicator[0]
        );
        this.player2 = new Character(
            new Vector({
                x: 1024 - 400,
                y: 100,
            }),
            new Vector({
                x: 0,
                y: 0,
            }),
            89,
            65,
            keys.character2,
            characters.pandu,
            false,
            true
        );
        this.draw();
        this.player1.initialize();
        this.player2.initialize();
        // this.initialize();
        this.addEvents();
        this.animate();
        this.timeCounter = setInterval(this.timer, 1000);
        if (this.singleplayer)
            this.findPlayer = setInterval(this.findOpponent, 1000);
    }

    draw() {
        context.clearRect(
            this.player1.position.x,
            this.player1.position.y,
            this.player1.width,
            this.player1.height
        );
        context.clearRect(
            this.player2.position.x,
            this.player2.position.y,
            this.player2.width,
            this.player2.height
        );
        context.drawImage(this.bgImage, 0, 0);

        this.obstacles.forEach((obstacle) => {
            obstacle.draw();
            // console.log(obstacle);
            // this.singleplayer = isSinglePlayer;
        });
    }

    /** Animate Players */
    animate = () => {
        this.draw();
        if (this.player1.isMoving) {
            let currentObstacles = [];
            currentObstacles = this.obstacles.filter(
                (obstacle) =>
                obstacle.isObstacle && calcDistance(this.player1, obstacle) < 200
            );
            console.log(currentObstacles);

            this.player1.checkObstacleCollision(currentObstacles);
        }

        // if (this.player1.keys.up.pressed === false) {
        //     this.player1.velocity.y += GRAVITY;
        //     this.player1.isMoving = true;
        // }
        this.player1.update();
        if (this.singleplayer) {
            if (calcDistance(this.player2, this.player1) < this.player2.width) {
                this.player2.keys.left.pressed = false;
                this.player2.keys.right.pressed = false;
                this.player2.keys.attack.pressed = true;
            } else {
                this.player2.keys.attack.pressed = false;
            }
        }

        if (this.player2.isMoving) {
            let currentObstacles = [];
            currentObstacles = this.obstacles.filter(
                (obstacle) =>
                obstacle.isObstacle && calcDistance(this.player2, obstacle) < 200
            );
            this.player2.checkObstacleCollision(currentObstacles);
        }
        this.player2.update();

        if (
            this.player1.isAttacking &&
            this.player1.currentFrame > 2 &&
            this.player1.currentFrame < 7
        )
        // console.log("position after update", this.player2.attackBox.position.x);
            this.checkPlayerCollision(this.player1, this.player2);
        if (
            this.player2.isAttacking &&
            this.player2.currentFrame > 2 &&
            this.player2.currentFrame < 7
        )
            this.checkPlayerCollision(this.player2, this.player1);
        this.animationFrame = requestAnimationFrame(() => this.animate());
    };
}