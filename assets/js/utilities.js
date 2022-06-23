export default function setKeyPressed(eventKey, player) {
    for (let key in player.keys) {
        if (player.keys[key].key === eventKey) {
            player.keys[keys[eventKey]].pressed = true;
            player.lastKey = player.keys[keys[eventKey]].key;
        }
    }
}