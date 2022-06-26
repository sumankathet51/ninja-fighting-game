import {
    bloodAnimation,
    bloodSpriteCoordinates,
    bloodSpriteHeight,
    bloodSpritewidth,
    canvas,
    context,
    DEFAULT_FPS,
    GRAVITY,
} from "./constants.js";
import { secondsToMiliseconds, updateHealth } from "./utilities.js";
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
        isFlipped = false,
        healthElement
    ) {
        this.position = position;

        this.velocity = velocity;

        this.height = height;

        this.width = width;

        this.keys = keys;

        this.lastKey;

        this.character = character;

        this.image = character.stand;

        this.positions = [
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

        this.deadPositions = [
            new Vector({ x: 90, y: 20 }),
            new Vector({ x: 400, y: 24 }),
            new Vector({ x: 530, y: 42 }),
            new Vector({ x: 87, y: 182 }),
            new Vector({ x: 242, y: 184 }),
            new Vector({ x: 395, y: 187 }),
            new Vector({ x: 65, y: 352 }),
            new Vector({ x: 217, y: 358 }),
            new Vector({ x: 367, y: 372 }),
        ];

        this.currentFrame = 0;

        this.framesElapsed = 0;

        this.framesHold = 5;

        this.increaseFrame = true;

        this.maxFrames = 9;

        this.isFlipped = isFlipped;

        this.isAttacking = false;

        this.attackBox = {
            offset: {
                x: 30,
                y: 25,
            },
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 50,
            height: 50,
        };

        this.health = 100;

        this.collision = false;

        this.isHit = false;

        this.dead = false;

        this.healthElement = healthElement;
    }

    /**
     * Draws the character in the canvas
     */
    draw() {
        if (this.isFlipped) {
            context.save();
            context.scale(-1, 1);

            this.attackBox.position.x =
                (this.position.x + this.width) * -1 + this.attackBox.offset.x;
            this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
        } else {
            this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
            this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
        }
        context.drawImage(
            this.image,
            this.dead ?
            this.deadPositions[this.currentFrame].x :
            this.positions[this.currentFrame].x,
            this.dead ?
            this.deadPositions[this.currentFrame].y :
            this.positions[this.currentFrame].y,
            // this.positions[this.currentFrame].y,
            this.width,
            this.height,
            this.isFlipped ? (this.position.x + this.width) * -1 : this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        // if (this.isHit) {
        //     context.drawImage(
        //         bloodAnimation,
        //         bloodSpriteCoordinates[this.currentFrame].x,
        //         bloodSpriteCoordinates[this.currentFrame].y,
        //         bloodSpritewidth,
        //         bloodSpriteHeight,
        //         this.isFlipped ? (this.position.x + this.width) * -1 : this.position.x,
        //         this.position.y + 30,
        //         this.width / 2,
        //         this.height / 2
        //     );
        // }

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
                    // if()
                    this.increaseFrame = false;
                }
            } else {
                if (this.currentFrame > 0) this.currentFrame--;
                if (this.currentFrame <= 0) {
                    this.increaseFrame = true;
                }
            }
            //  % this.maxFrames;
            this.framesElapsed = 0;
        }
    }

    /** Initialize the character */
    initialize() {
        this.draw();
    }

    /** update the character on each animation frame */
    update() {
        // if (this.dead) return;
        this.draw();
        this.animateFrames();
        if (this.dead) return;
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
            if (!this.isAttacking) this.image = this.character.walk;
            this.isFlipped = true;
        } else if (
            this.keys.right.pressed === true &&
            this.lastKey === this.keys.right.key &&
            this.position.x + this.velocity.x + this.width < canvas.width
        ) {
            if (!this.isAttacking) this.image = this.character.walk;
            this.velocity.x = 5;
            this.isFlipped = false;
        } else {
            if (!this.isAttacking) this.image = this.character.stand;
        }

        if (
            this.keys.up.pressed === true &&
            this.position.y + this.height + this.velocity.y >= canvas.height
        ) {
            this.velocity.y = -20;
            this.position.y += this.velocity.y;
        }

        if (this.keys.attack.pressed === true) {
            // this.image = this.character.attack;
            if (!this.isAttacking) this.attack();
            // this.framesHold = 2;
        }
        // console.log(this.collision);
        this.position.x += this.velocity.x;
    }

    /** Handle character attack */
    attack() {
        if (!this.dead) {
            this.currentFrame = 0;
            this.isAttacking = true;
            setTimeout(() => {
                this.collision = false;
                this.isAttacking = false;
                this.currentFrame = 0;
            }, (secondsToMiliseconds(1) / (DEFAULT_FPS / this.framesHold)) * this.maxFrames);
            this.image = this.character.attack;
        }
    }

    takeHit() {
        this.health -= 10;
        updateHealth(this.health, this.healthElement);

        if (this.health > 0) {
            // this.isHit = true;
            // setTimeout(() => {
            //     this.isHit = false;
            //     this.currentFrame = 0;
            // }, (secondsToMiliseconds(1) / (DEFAULT_FPS / this.framesHold)) * this.maxFrames);
        } else {
            this.dead = true;
            this.image = this.character.dead;
            return true;
        }
    }

    // animateBlood() {

    // }
}