import Character from "./character.js";

import Vector from "./Vector.js";

import {
    calcDistance,
    displayWinner,
    killPlayer,
    secondsToMiliseconds,
    setKeyPressed,
    unsetKeyPressed,
    updateTimer,
} from "./utilities.js";

import {
    backgroundImages,
    canvas,
    characters,
    context,
    DEFAULT_FPS,
    keys,
    playerHealthIndicator,
    WINNER_CONTAINER,
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
            characters.ninja,
            false,
            playerHealthIndicator[0]
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
            playerHealthIndicator[1],
            isSinglePlayer
        );

        this.player1.initialize();
        this.player2.initialize();
        // Background Image
        this.bgImage = new Image();
        this.bgImage.src = backgroundImages[0];

        this.addEvents();
        this.animate();
        this.timeCounter = setInterval(this.timer, 1000);
        if (this.singleplayer)
            this.findPlayer = setInterval(this.findOpponent, 1000);
    };

    findOpponent = () => {
        const dx = this.player2.position.x - this.player1.position.x;

        this.player2.destinationPosition =
            this.player1.position.x + this.player1.width;

        if (dx > 0) {
            this.player2.keys.left.pressed = true;
            this.player2.lastKey = this.player2.keys.left.key;
        } else if (dx < 0) {
            // player.keys.left.pressed = true;
            this.player2.lastKey = this.player2.keys.right.key;
            this.player2.keys.right.pressed = true;
        }
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
        // console.log(calcDistance(this.player2, this.player1));
        // console.log(isSinglePlayer);
        if (this.singleplayer) {
            if (calcDistance(this.player2, this.player1) < this.player2.width) {
                this.player2.keys.left.pressed = false;
                this.player2.keys.right.pressed = false;
                this.player2.keys.attack.pressed = true;
            } else {
                this.player2.keys.attack.pressed = false;
            }
        }
        this.player2.update();

        if (
            this.player1.isAttacking &&
            this.player1.currentFrame > 2 &&
            this.player1.currentFrame < 7
        )
        // console.log("position after update", this.player2.attackBox.position.x);
            this.checkCollision(this.player1, this.player2);
        if (
            this.player2.isAttacking &&
            this.player2.currentFrame > 2 &&
            this.player2.currentFrame < 7
        )
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
        updateTimer(this.currentTime);
        this.currentTime--;
    };

    /**
     * Game Over and winner Logic
     */
    endGame = () => {
        this.gameOver = true;
        clearInterval(this.timeCounter);
        clearInterval(this.findPlayer);
        if (this.player1.health > this.player2.health) {
            killPlayer(this.player2);
            displayWinner("Player 1 wins");
        } else if (this.player1.health < this.player2.health) {
            killPlayer(this.player1);
            displayWinner("Player 2 wins");
        } else displayWinner("Draw");

        setTimeout(() => {
            window.cancelAnimationFrame(this.animationFrame);
        }, (secondsToMiliseconds(1) / (DEFAULT_FPS / this.player2.framesHold)) * this.player2.maxFrames);
        canvas.style.display = "none";
        WINNER_CONTAINER.style.display = "block";
    };
}