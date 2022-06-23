import Vector from "./Vector.js";

export default class Character {
    constructor(
        position = new Vector(0, 0),
        velocity = new Vector(0, 0),
        height,
        width,
        keys,
        character,
        invert = false
    ) {
        this.position = position;
        this.velocity = velocity;
        this.height = height;
        this.width = width;
        this.keys = keys;
        this.lastKey;
        this.character = character;
        this.image = new Image();
        this.image.src = character.stand;
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
        this.currentFrame = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.increaseFrame = true;
        this.maxFrames = 9;
        this.invert = invert;
        // this.is_attacking = false;
        // console.log(this.width);
    }

    draw() {
        // context.clearRect(0, 0, canvas.width, canvas.height);
        // context.save();
        // context.translate(canvas.width, canvas.height);
        // context.rotate((180 * Math.PI) / 180);
        if (this.invert) {
            context.save();
            context.scale(-1, 1);
        }
        context.drawImage(
            this.image,
            this.standingPositions[this.currentFrame].x,
            this.standingPositions[this.currentFrame].y,
            this.width,
            this.height,
            this.invert ? (this.position.x + this.width) * -1 : this.position.x,
            // this.position.x,
            this.position.y,
            this.width,
            this.height
        );
        if (this.invert) context.restore();
        // context.restore();
    }

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

    initialize() {
        this.draw();
    }

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
            this.invert = true;
        } else if (
            this.keys.right.pressed === true &&
            this.lastKey === this.keys.right.key &&
            this.position.x + this.velocity.x + this.width < canvas.width
        ) {
            this.image.src = this.character.walk;
            this.velocity.x = 5;
            this.invert = false;
        } else if (
            this.keys.up.pressed === true &&
            // this.position.y + this.velocity.y - this.height >= 0 &&
            this.position.y + this.height + this.velocity.y >= canvas.height
        ) {
            this.velocity.y = -20;
            this.position.y += this.velocity.y;
        } else {
            this.image.src = this.character.stand;
        }

        if (this.keys.attack.pressed === true) {
            this.image.src = this.character.attack;

            // this.attack();
            // this.framesHold = 2;
        }

        this.position.x += this.velocity.x;
    }

    attack() {
        this.image.src = this.character.attack;
        this.framesHold = 2;
    }

    attackFinished() {
        this.framesHold = 5;
    }
}