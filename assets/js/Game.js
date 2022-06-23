import Character from "./character.js";
import Vector from "./Vector.js";
import setKeyPressed from "./utilities.js";

class Game {
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
            75, {
                up: {
                    key: "w",
                    pressed: false,
                },
                bottom: {
                    key: "s",
                    pressed: false,
                },
                left: {
                    key: "a",
                    pressed: false,
                },
                right: {
                    key: "d",
                    pressed: false,
                },
            },
            characters[0]
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
            61, {
                up: {
                    key: "ArrowUp",
                    pressed: false,
                },
                bottom: {
                    key: "ArrowBottom",
                    pressed: false,
                },
                left: {
                    key: "ArrowLeft",
                    pressed: false,
                },
                right: {
                    key: "ArrowRight",
                    pressed: false,
                },
            },
            characters[1]
        );
        this.player2.initialize();
        // Background Image
        this.bgImage = new Image();
        this.bgImage.src = backgroundImages[0];

        this.addEvents();
        this.animate();

        // this.draw();
    }

    // draw() {
    //     this.bgImage = new Image();
    //     this.bgImage.addEventListener("load", () => {
    //     });

    //     console.log(this.bgImage);
    // }

    addEvents() {
        window.addEventListener("keydown", (event) => {
            setKeyPressed(event.key, this.player1);
            setKeyPressed(event.key, this.player2);
            // switch (event.key) {
            //     case player1.keys.up.key:
            //         player1.keys.up.pressed = true;
            //         player1.lastKey = player1.keys.up.key;
            //         break;

            //     case player1.keys.bottom.key:
            //         player1.keys.bottom.pressed = true;
            //         player1.lastKey = player1.keys.bottom.key;
            //         break;

            //     case player1.keys.left.key:
            //         player1.keys.left.pressed = true;
            //         player1.lastKey = player1.keys.left.key;
            //         break;

            //     case player1.keys.right.key:
            //         player1.keys.right.pressed = true;
            //         player1.lastKey = player1.keys.right.key;
            //         break;

            //     case player2.keys.up.key:
            //         player2.keys.up.pressed = true;
            //         player2.lastKey = player2.keys.up.key;
            //         break;

            //     case player2.keys.bottom.key:
            //         player2.keys.bottom.pressed = true;
            //         player2.lastKey = player2.keys.bottom.key;
            //         break;

            //     case player2.keys.left.key:
            //         player2.keys.left.pressed = true;
            //         player2.lastKey = player2.keys.left.key;
            //         break;

            //     case player2.keys.right.key:
            //         player2.keys.right.pressed = true;
            //         player2.lastKey = player2.keys.right.key;
            //         break;
            // }
        });

        window.addEventListener("keyup", (event) => {
            switch (event.key) {
                case this.player1.keys.up.key:
                    this.player1.keys.up.pressed = false;
                    break;

                case this.player1.keys.bottom.key:
                    this.player1.keys.bottom.pressed = false;
                    break;

                case this.player1.keys.left.key:
                    this.player1.keys.left.pressed = false;

                    break;

                case this.player1.keys.right.key:
                    this.player1.keys.right.pressed = false;
                    break;

                case this.player2.keys.up.key:
                    this.player2.keys.up.pressed = false;
                    break;

                case this.player2.keys.bottom.key:
                    this.player2.keys.bottom.pressed = false;
                    break;

                case this.player2.keys.left.key:
                    this.player2.keys.left.pressed = false;
                    break;

                case this.player2.keys.right.key:
                    this.player2.keys.right.pressed = false;
                    break;
            }
        });
    }

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

const game = new Game();
game.initialize();