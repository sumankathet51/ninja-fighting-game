import Character from "./character.js";

export class Ninja extends Character {
    /**
     * Create a Ninja Character
     * @param {Vector} position - The x and y Position Vector
     * @param {Vector} velocity - The x and y Velocity vector
     * @param {number} height - The height of the character
     * @param {number} width - The width of the character
     * @param {object} keys - The keys combination that the character use
     * @param {object} character - The character Images
     * @param {boolean=false} isFlipped - flag to check if the character needs to be flipped
     * @param {object} healthElement - Health bar DOM element
     * @param {object} deadPositions - Dead animation sprite
     * @param {boolean=false} isBot - Determine if the currenbt player is a player or a Bot
     */
    constructor(
        position = new Vector(0, 0),
        velocity = new Vector(0, 0),
        height,
        width,
        keys,
        character,
        isFlipped = false,
        healthElement,
        deadPositions,
        isBot = false
    ) {
        super();

        this.position = position;

        this.isBot = isBot;

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

        this.deadPositions = deadPositions;

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
}