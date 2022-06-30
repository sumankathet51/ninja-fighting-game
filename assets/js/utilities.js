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
export function displayWinner(winner) {
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
                break;

            case player.keys.down.key:
                player.keys.down.pressed = true;
                player.lastKey = player.keys.down.key;
                break;

            case player.keys.left.key:
                player.keys.left.pressed = true;
                player.lastKey = player.keys.left.key;
                break;

            case player.keys.right.key:
                player.keys.right.pressed = true;
                player.lastKey = player.keys.right.key;
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
                break;

            case player.keys.down.key:
                player.keys.down.pressed = false;
                break;

            case player.keys.left.key:
                player.keys.left.pressed = false;

                break;

            case player.keys.right.key:
                player.keys.right.pressed = false;
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

export function calcDistance(...players) {
    const dx = players[0].position.x - players[1].position.x;
    const dy = players[0].position.y - players[1].position.y;

    return Math.sqrt(dx * dx + dy * dy);
}

export function getMousePos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
        y: ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
    };
}