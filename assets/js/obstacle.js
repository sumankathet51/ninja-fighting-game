import { context } from "./constants.js";
import Vector from "./vector.js";

export class Obstacle {
    constructor(x, y, height, width, image, isObstacle) {
        this.position = new Vector({ x: x, y: y });
        this.height = height;
        this.width = width;
        this.image = image;
        this.url = image.getAttribute("src");
        this.isObstacle = isObstacle;
    }

    draw = () => {
        context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        // console.log(
        //     this.image,
        //     this.position.x,
        //     this.position.y,
        //     this.width,
        //     this.height
        // );
    };
}