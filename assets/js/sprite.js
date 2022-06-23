import Vector from "./vector.js";

export default class Sprite {
    constructor(
        // position = new Vector({ x: 0, y: 0 }),
        imageSource,
        height,
        width
        // offset = new Vector({ x: 0, y: 0 })
    ) {
        // this.position = position;
        this.image = new Image();
        this.image.src = imageSource;
        this.height = height;
        this.width = width;
        // this.offset = offset;
    }

    draw(position, offset) {
        context.drawImage(
            this.image,
            offset.x,
            offset.y,
            this.width,
            this.height,
            position.x,
            position.y,
            this.width,
            this.height
        );
    }
}