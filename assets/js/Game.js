import Character from "./character.js";
import Vector from "./Vector.js";
import {
    displayWinner,
    setKeyPressed,
    setTime,
    unsetKeyPressed,
} from "./utilities.js";
import {
    backgroundImages,
    characters,
    context,
    keys,
    playerHealthIndicator,
} from "./constants.js";

export default class Game {
    constructor(time = 59) {
            this.currentTime = time;
            this.gameOver = false;
        }
        /**
         * Initiliaze the game
         */
    initialize() {
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
            playerHealthIndicator[0]
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
            86,
            65,
            keys.character2,
            characters.character2,
            true,
            playerHealthIndicator[1]
        );
        this.player2.initialize();
        // Background Image
        this.bgImage = new Image();
        this.bgImage.src = backgroundImages[0];

        this.addEvents();
        this.animate();
        setInterval(this.timer, 1000);
    }

    /**
     * Add keyboard events
     */
    addEvents() {
        window.addEventListener("keydown", (event) => {
            setKeyPressed(event.key, this.player1, this.player2);
        });

        window.addEventListener("keyup", (event) => {
            unsetKeyPressed(event.key, this.player1, this.player2);
        });
    }

    /** Animate Players */
    animate() {
        if (this.gameOver) return;

        context.drawImage(this.bgImage, 0, 0);
        this.player1.update();

        this.player2.update();
        // console.log("position after update", this.player2.attackBox.position.x);
        this.checkCollision();
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    checkCollision() {
        if (
            this.player1.isAttacking &&
            Math.abs(this.player1.attackBox.position.x) <
            this.player2.position.x + this.player2.width &&
            Math.abs(
                this.player1.attackBox.position.x + this.player1.attackBox.width
            ) > this.player2.position.x &&
            this.player1.attackBox.position.y <
            this.player2.position.y + this.player2.height &&
            this.player1.attackBox.height + this.player1.attackBox.position.y >
            this.player2.position.y
        ) {
            console.log(
                Math.abs(
                    this.player1.attackBox.position.x + this.player1.attackBox.width
                ),
                this.player2.position.x
            );
            if (!this.player1.collision) {
                this.player1.collision = true;
                this.player2.takeHit();
            }
        }
        if (
            this.player2.isAttacking &&
            Math.abs(this.player2.attackBox.position.x) <
            this.player1.position.x + this.player1.width &&
            Math.abs(
                this.player2.attackBox.position.x + this.player2.attackBox.width
            ) > this.player1.position.x &&
            this.player2.attackBox.position.y <
            this.player1.position.y + this.player1.height &&
            this.player2.attackBox.height + this.player2.attackBox.position.y >
            this.player1.position.y
        ) {
            if (!this.player2.collision) {
                this.player2.collision = true;
                this.player1.takeHit();
            }
        }
    }

    timer = () => {
        if (this.currentTime < 0) {
            this.endGame();
            return;
        }
        setTime(this.currentTime);
        this.currentTime--;
    };

    endGame() {
        this.gameOver = true;
        if (this.player1.health > this.player2.health)
            displayWinner("Player 1 wins");
        else if (this.player1.health < this.player2.health)
            displayWinner("Player 2 wins");
        else displayWinner("Draw");
        window.cancelAnimationFrame(this.animationFrame);
    }
}