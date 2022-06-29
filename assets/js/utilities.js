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
export function setTime(time) {
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