import Character from "./character.js";
import Vector from "./vector.js";

import {
    displayWinner,
    killPlayer,
    secondsToMiliseconds,
    setKeyPressed,
    unsetKeyPressed,
    updateTimer,
} from "./utilities.js";

import { canvas, DEFAULT_FPS, WINNER_CONTAINER } from "./constants.js";

export default class Game {
    constructor(time = 59, singleplayer) {
        this.currentTime = time;
        this.gameOver = false;
        this.singleplayer = singleplayer;
    }

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

    checkPlayerCollision = (attacker, defender) => {
        if (
            attacker.attackBox.position.x < defender.position.x + defender.width &&
            attacker.attackBox.position.x + attacker.attackBox.width >
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
        let winnerText = "";
        let win = false;
        if (this.player1.health > this.player2.health) {
            killPlayer(this.player2);
            if (this.singleplayer) {
                win = true;
                winnerText = "You Win!";
            } else winnerText = "Player 1 wins";
        } else if (this.player1.health < this.player2.health) {
            killPlayer(this.player1);
            if (this.singleplayer) winnerText = "You Lose!";
            else winnerText = "Player 2 wins";
        } else winnerText = "Draw";

        setTimeout(() => {
            window.cancelAnimationFrame(this.animationFrame);
            displayWinner(winnerText, win);
            canvas.style.display = "none";
        }, (secondsToMiliseconds(1) / (DEFAULT_FPS / this.player2.framesHold)) * this.player2.maxFrames);
    };
}