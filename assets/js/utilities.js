import Character from "./character.js";
import {
    CURRENT_TIME,
    WINNER_CONTAINER,
    WINNER_STATEMENT,
} from "./constants.js";

/**
 *
 * @param {number} health - Total health of the player
 * @param {object} element - Health indicator element in the DOM
 */
export function updateHealth(health, element) {
    element.style.width = health + "%";
}

/**
 *
 * @param {number} time - Remaining Time
 */
export function updateTimer(time) {
    CURRENT_TIME.innerText = time;
}

/**
 *
 * @param {string} winner - Current Winner text
 */
export function displayWinner(winnerMessage, win) {
    // if(winner === "You Win!" )
    WINNER_CONTAINER.style.display = "block";
    WINNER_STATEMENT.innerText = winner;
}

export function killPlayer(player) {
    player.currentFrame = 0;
    player.framesElapsed = 0;
    player.dead = true;
    player.width = 89;
    player.height = 60;
    player.position.y += 20;
    player.image = player.character.dead;
}

/**
 *
 * @param {string} eventKey - Key that was pressed
 * @param {Character[]} players - Array of players
 */
export function setKeyPressed(eventKey, ...players) {
    players.forEach((player) => {
        switch (eventKey) {
            case player.keys.up.key:
                player.keys.up.pressed = true;
                player.isMoving = true;
                break;

            case player.keys.down.key:
                player.keys.down.pressed = true;
                player.lastKey = player.keys.down.key;
                break;

            case player.keys.left.key:
                player.keys.left.pressed = true;
                player.lastKey = player.keys.left.key;
                player.isMoving = true;
                break;

            case player.keys.right.key:
                player.keys.right.pressed = true;
                player.lastKey = player.keys.right.key;
                player.isMoving = true;
                break;

            case player.keys.attack.key:
                player.keys.attack.pressed = true;
                break;
        }
    });
}

/**
 *
 * @param {string} eventKey - Key that was pressed
 * @param {Character[]} players - Array of players
 */
export function unsetKeyPressed(eventKey, ...players) {
    players.forEach((player) => {
        switch (eventKey) {
            case player.keys.up.key:
                player.keys.up.pressed = false;
                player.isMoving = false;
                break;

            case player.keys.down.key:
                player.keys.down.pressed = false;
                break;

            case player.keys.left.key:
                player.keys.left.pressed = false;
                player.isMoving = false;
                break;

            case player.keys.right.key:
                player.keys.right.pressed = false;
                player.isMoving = false;
                break;

            case player.keys.attack.key:
                player.keys.attack.pressed = false;
                break;
        }
    });
}

export function secondsToMiliseconds(seconds) {
    return seconds * 1000;
}

export function calcDistance(point1, point2) {
    const dx = point1.position.x - point2.position.x;
    const dy = point1.position.y - point2.position.y;

    return Math.sqrt(dx * dx + dy * dy);
}

export function getMousePos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
        y: ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
    };
}

export function checkCollision(object1, object2) {
    // console.log(
    //     object1.position.x + object1.velocity.x <
    //     object2.position.x + object2.width,
    //     object1.position.x + object1.velocity.x + object1.width >
    //     object2.position.x,
    //     object1.position.y + object1.velocity.y < object2.position.y + 10,
    //     object1.height + object1.position.y + object1.velocity.y >
    //     object2.position.y
    // );
    if (
        object1.position.x < object2.position.x + object2.width &&
        object1.position.x + object1.width > object2.position.x &&
        object1.position.y + object1.height < object2.position.y + 20 &&
        object1.height + object1.position.y > object2.position.y
    ) {
        // console.log("Collision");
        return true;
    }
    return false;
}

// export function checkYCollision(object1, object2) {
//     console.log(
//         object2,
//         object1,
//         object1.position.x < object2.position.x + object2.width,
//         object1.position.x + object1.width > object2.position.x,
//         object1.position.y < object2.position.y + object2.height,
//         object1.height + object1.position.y >= object2.position.y
//     );
//     if (
//         object1.position.x < object2.position.x + object2.width &&
//         object1.position.x + object1.width > object2.position.x &&
//         object1.position.y < object2.position.y + object2.height &&
//         object1.height + object1.position.y > object2.position.y
//         // object1.height + object1.position.y >=
//         // object2.position.y
//     ) {
//         // console.log("Collision");
//         return true;
//     }
//     return false;
// }