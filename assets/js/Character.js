class Character {
    constructor(
        position = new Vector(0, 0),
        velocity = new Vector(0, 0),
        height,
        keys
    ) {
        this.position = position;
        this.velocity = velocity;
        this.height = height;
        this.keys = keys;
        this.lastKey;
    }

    draw() {
        context.fillStyle = "red";
        context.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    initialize() {
        this.draw();
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y >= canvas.height)
            this.velocity.y = 0;
        else this.velocity.y += GRAVITY;

        this.velocity.x = 0;
        if (
            this.keys.left.pressed === true &&
            this.lastKey === this.keys.left.key
        ) {
            this.velocity.x = -1;
        } else if (
            this.keys.right.pressed === true &&
            this.lastKey === this.keys.right.key
        ) {
            this.velocity.x = 1;
        }
        // console.log(this.velocity);
    }
}