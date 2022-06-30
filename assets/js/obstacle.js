export class Obstacle {
    constructor(x, y, height, width, image, isObstacle) {
        this.position = new Vector({ x: x, y: y });
        // console.log(new Vector({ x: x, y: y }));
        this.height = height;
        this.width = width;
        this.image = image;
        this.url = image.getAttribute("src");
        this.isObstacle = isObstacle;
    }
}