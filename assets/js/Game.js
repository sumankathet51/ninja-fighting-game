import Character from "./character.js";

import Vector from "./Vector.js";

import {
    displayWinner,
    secondsToMiliseconds,
    setKeyPressed,
    setTime,
    unsetKeyPressed,
} from "./utilities.js";

import {
    backgroundImages,
    characters,
    context,
    DEFAULT_FPS,
    keys,
    playerHealthIndicator,
} from "./constants.js";

export default class Game {
    constructor(time = 59) {
            this.currentTime = time;
            this.gameOver = false;
            this.singleplayer = false;
        }
        /**
         * Initiliaze the game
         */
    initialize = (isSinglePlayer) => {
        this.singleplayer = isSinglePlayer;
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
            characters.character1,
            false,
            playerHealthIndicator[0], [
                new Vector({ x: 90, y: 20 }),
                new Vector({ x: 400, y: 24 }),
                new Vector({ x: 87, y: 182 }),
                new Vector({ x: 242, y: 184 }),
                new Vector({ x: 395, y: 187 }),
                new Vector({ x: 65, y: 352 }),
                new Vector({ x: 217, y: 358 }),
                new Vector({ x: 367, y: 372 }),
                new Vector({ x: 530, y: 42 }),
            ]
        );
        this.player1.initialize();
        // Player 2
        this.player2 = new Character(
            new Vector({
                x: 1024 - 80,
                y: 100,
            }),
            new Vector({
                x: 0,
                y: 0,
            }),
            89,
            65,
            this.singleplayer ? "" : keys.character2,
            characters.character2,
            true,
            playerHealthIndicator[1], [
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
            isSinglePlayer
        );
        this.player2.initialize();
        // Background Image
        this.bgImage = new Image();
        this.bgImage.src = backgroundImages[0];

        this.addEvents();
        this.animate();
        this.timeCounter = setInterval(this.timer, 1000);
        if (this.singleplayer)
            this.timeCounter = setInterval(this.findOpponent, 1000);
    };

    findOpponent = () => {
        console.log(this.player1.position.x, this.player2.position.x);
    };

    /**
     * Add keyboard events
     */
    addEvents = () => {
        if (this.singleplayer) {
            window.addEventListener("keydown", (event) => {
                setKeyPressed(event.key, this.player1);
            });
            window.addEventListener("keyup", (event) => {
                unsetKeyPressed(event.key, this.player1);
            });
        } else {
            window.addEventListener("keydown", (event) => {
                setKeyPressed(event.key, this.player1, this.player2);
            });
            window.addEventListener("keyup", (event) => {
                unsetKeyPressed(event.key, this.player1, this.player2);
            });
        }
    };

    /** Animate Players */
    animate = () => {
        context.drawImage(this.bgImage, 0, 0);
        this.player1.update();

        this.player2.update();
        // console.log("position after update", this.player2.attackBox.position.x);
        if (this.player1.isAttacking)
            this.checkCollision(this.player1, this.player2);
        if (this.player2.isAttacking)
            this.checkCollision(this.player2, this.player1);
        this.animationFrame = requestAnimationFrame(() => this.animate());
    };

    checkCollision = (attacker, defender) => {
        if (
            Math.abs(attacker.attackBox.position.x) <
            defender.position.x + defender.width &&
            Math.abs(attacker.attackBox.position.x + attacker.attackBox.width) >
            defender.position.x &&
            attacker.attackBox.position.y < defender.position.y + defender.height &&
            attacker.attackBox.height + attacker.attackBox.position.y >
            defender.position.y
        ) {
            if (!attacker.collision) {
                attacker.collision = true;
                if (defender.takeHit()) this.endGame();
            }
        }
    };

    timer = () => {
        if (this.currentTime < 0) {
            this.endGame();
            return;
        }
        setTime(this.currentTime);
        this.currentTime--;
    };

    endGame = () => {
        this.gameOver = true;
        clearInterval(this.timeCounter);
        if (this.player1.health > this.player2.health) {
            this.player2.currentFrame = 0;
            this.player2.framesElapsed = 0;
            this.player2.dead = true;
            this.player2.width = 89;
            this.player2.height = 60;
            this.player2.position.y += 20;
            this.player2.image = this.player2.character.dead;
            displayWinner("Player 1 wins");
        } else if (this.player1.health < this.player2.health) {
            this.player1.currentFrame = 0;
            this.player1.framesElapsed = 0;
            this.player1.dead = true;
            this.player1.width = 89;
            this.player1.height = 64;
            this.player1.position.y += 20;
            this.player1.image = this.player1.character.dead;
            displayWinner("Player 2 wins");
        } else displayWinner("Draw");
        setTimeout(() => {
            window.cancelAnimationFrame(this.animationFrame);
        }, (secondsToMiliseconds(1) / (DEFAULT_FPS / this.player2.framesHold)) * this.player2.maxFrames);
    };
}