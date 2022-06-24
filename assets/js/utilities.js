export function setKeyPressed(eventKey, player1, player2) {
    switch (eventKey) {
        case player1.keys.up.key:
            player1.keys.up.pressed = true;
            break;

        case player1.keys.down.key:
            player1.keys.down.pressed = true;
            player1.lastKey = player1.keys.down.key;
            break;

        case player1.keys.left.key:
            player1.keys.left.pressed = true;
            player1.lastKey = player1.keys.left.key;
            break;

        case player1.keys.right.key:
            player1.keys.right.pressed = true;
            player1.lastKey = player1.keys.right.key;
            break;

        case player1.keys.attack.key:
            player1.keys.attack.pressed = true;
            break;

        case player2.keys.up.key:
            player2.keys.up.pressed = true;
            break;

        case player2.keys.down.key:
            player2.keys.down.pressed = true;
            player2.lastKey = player2.keys.down.key;
            break;

        case player2.keys.left.key:
            player2.keys.left.pressed = true;
            player2.lastKey = player2.keys.left.key;
            break;

        case player2.keys.right.key:
            player2.keys.right.pressed = true;
            player2.lastKey = player2.keys.right.key;
            break;

        case player2.keys.attack.key:
            player2.keys.attack.pressed = true;
            break;
    }
}

export function unsetKeyPressed(eventKey, player1, player2) {
    switch (eventKey) {
        case player1.keys.up.key:
            player1.keys.up.pressed = false;
            break;

        case player1.keys.down.key:
            player1.keys.down.pressed = false;
            break;

        case player1.keys.left.key:
            player1.keys.left.pressed = false;

            break;

        case player1.keys.right.key:
            player1.keys.right.pressed = false;
            break;

        case player1.keys.attack.key:
            player1.keys.attack.pressed = false;
            break;

        case player2.keys.up.key:
            player2.keys.up.pressed = false;
            break;

        case player2.keys.down.key:
            player2.keys.down.pressed = false;
            break;

        case player2.keys.left.key:
            player2.keys.left.pressed = false;
            break;

        case player2.keys.right.key:
            player2.keys.right.pressed = false;
            break;

        case player2.keys.attack.key:
            player2.keys.attack.pressed = false;
            break;
    }
}

export function secondsToMiliseconds(seconds) {
    return seconds * 1000;
}