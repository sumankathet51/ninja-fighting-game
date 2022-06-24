import { canvas, context, GRAVITY } from "./constants.js";
import Vector from "./Vector.js";

/** Class Representating a character iof the Game */
export default class Character {
    /**
     * Create a Character
     * @param {Vector} position - The x and y Position Vector
     * @param {Vector} velocity - The x and y Velocity vector
     * @param {number} height - The height of the character
     * @param {number} width - The width of the character
     * @param {object} keys - The keys combination that the character use
     * @param {object} character - The character Images
     * @param {boolean=false} isFlipped - flag to check if the character needs to be flipped
     */
    constructor(
        position = new Vector(0, 0),
        velocity = new Vector(0, 0),
        height,
        width,
        keys,
        character,
        isFlipped = false
    ) {
        /**
         * @type {Vector}
         */
        this.position = position;
        /**
         * @type {Vector}
         */
        this.velocity = velocity;
        /**
         * @type {number}
         */
        this.height = height;
        /**
         * @type {number}
         */
        this.width = width;
        /**
         * @type {object}
         */
        this.keys = keys;
        /**
         * @type {boolean}
         */
        this.lastKey;
        /**
         * @type {object}
         */
        this.character = character;
        /**
         * @type {Image}
         */
        this.image = new Image();
        this.image.src = character.stand;
        /**
         * @type {Array}
         */
        this.standingPositions = [
            new Vector({ x: 76, y: 12 }),
            new Vector({ x: 400, y: 12 }),
            new Vector({ x: 561, y: 12 }),
            new Vector({ x: 76, y: 175 }),
            new Vector({ x: 238, y: 175 }),
            new Vector({ x: 400, y: 175 }),
            new Vector({ x: 76, y: 336 }),
            new Vector({ x: 238, y: 336 }),
            new Vector({ x: 400, y: 336 }),
        ];
        /**
         * @type {number}
         */
        this.currentFrame = 0;
        /**
         * @type {number}
         */
        this.framesElapsed = 0;
        /**
         * @type {number}
         */
        this.framesHold = 5;
        /**
         * @type {boolean}
         */
        this.increaseFrame = true;
        /**
         * @type {number}
         */
        this.maxFrames = 9;
        /**
         * @type {boolean}
         */
        this.isFlipped = isFlipped;
        /**
         * @type {boolean}
         */
        this.is_attacking = false;
    }

    /**
     * Draws the character in the canvas
     */
    draw() {
        // context.clearRect(0, 0, canvas.width, canvas.height);
        // context.save();
        // context.translate(canvas.width, canvas.height);
        // context.rotate((180 * Math.PI) / 180);
        if (this.isFlipped) {
            context.save();
            context.scale(-1, 1);
        }
        context.drawImage(
            this.image,
            this.standingPositions[this.currentFrame].x,
            this.standingPositions[this.currentFrame].y,
            this.width,
            this.height,
            this.isFlipped ? (this.position.x + this.width) * -1 : this.position.x,
            // this.position.x,
            this.position.y,
            this.width,
            this.height
        );
        if (this.isFlipped) context.restore();
        // context.restore();
    }

    /** handle Character animation / Movements after certain frames */
    animateFrames() {
        this.framesElapsed++;
        if (this.framesElapsed >= this.framesHold) {
            if (this.increaseFrame === true) {
                this.currentFrame++;
                if (this.currentFrame >= this.maxFrames - 1) {
                    this.increaseFrame = false;
                }
            } else {
                this.currentFrame--;
                if (this.currentFrame <= 0) {
                    this.increaseFrame = true;
                }
            }
            //  % this.maxFrames;
            this.framesElapsed = 0;
        }
        // console.log(this.framesElapsed);
    }

    /** Initialize the character */
    initialize() {
        this.draw();
    }

    /** update the character on each animation frame */
    update() {
        this.draw();
        this.animateFrames();

        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y >= canvas.height)
            this.velocity.y = 0;
        else this.velocity.y += GRAVITY;

        this.velocity.x = 0;
        // console.log(this.position.x + this.velocity.x, canvas.width);
        if (
            this.keys.left.pressed === true &&
            this.lastKey === this.keys.left.key &&
            this.position.x + this.velocity.x > 0
        ) {
            this.velocity.x = -5;
            this.image.src = this.character.walk;
            this.isFlipped = true;
        } else if (
            this.keys.right.pressed === true &&
            this.lastKey === this.keys.right.key &&
            this.position.x + this.velocity.x + this.width < canvas.width
        ) {
            this.image.src = this.character.walk;
            this.velocity.x = 5;
            this.isFlipped = false;
        } else {
            this.image.src = this.character.stand;
        }

        if (
            this.keys.up.pressed === true &&
            this.position.y + this.height + this.velocity.y >= canvas.height
        ) {
            this.velocity.y = -20;
            this.position.y += this.velocity.y;
        }

        if (this.keys.attack.pressed === true) {
            // this.image.src = this.character.attack;

            this.attack();
            // this.framesHold = 2;
        }

        this.position.x += this.velocity.x;
    }

    /** Handle character attack */
    attack() {
        this.image.src = this.character.attack;
        // this.framesHold = 2;
    }
}