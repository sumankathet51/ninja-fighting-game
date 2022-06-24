import Character from "./character.js";
import Vector from "./Vector.js";
import { setKeyPressed, unsetKeyPressed } from "./utilities.js";
import { backgroundImages, characters, context, keys } from "./constants.js";

export default class Game {
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
            characters.character1
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
            61,
            keys.character2,
            characters.character2,
            true
        );
        this.player2.initialize();
        // Background Image
        this.bgImage = new Image();
        this.bgImage.src = backgroundImages[0];

        this.addEvents();
        this.animate();
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
        // context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(this.bgImage, 0, 0);
        // console.log(this.bgImage);

        // context.fillStyle = "red";
        this.player1.update();

        // context.fillStyle = "blue";
        this.player2.update();

        requestAnimationFrame(() => this.animate());
    }
}