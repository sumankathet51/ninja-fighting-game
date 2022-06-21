const player1 = new Character(
    new Vector({
        x: 0,
        y: 0,
    }),
    new Vector({
        x: 0,
        y: 0,
    }),
    (height = 150),
    (keys = {
        up: {
            key: "w",
            pressed: false,
        },
        bottom: {
            key: "s",
            pressed: false,
        },
        left: {
            key: "a",
            pressed: false,
        },
        right: {
            key: "d",
            pressed: false,
        },
    })
);
player1.initialize();

const player2 = new Character(
    (position = new Vector({
        x: 400,
        y: 100,
    })),
    (velocity = new Vector({
        x: 0,
        y: 0,
    })),
    (height = 150),
    (keys = {
        up: {
            key: "ArrowUp",
            pressed: false,
        },
        bottom: {
            key: "ArrowBottom",
            pressed: false,
        },
        left: {
            key: "ArrowLeft",
            pressed: false,
        },
        right: {
            key: "ArrowRight",
            pressed: false,
        },
    })
);
player2.initialize();

function animate() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    player1.update();
    player2.update();
    window.requestAnimationFrame(() => animate());
}
animate();

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case player1.keys.up.key:
            player1.keys.up.pressed = true;
            player1.lastKey = player1.keys.up.key;
            break;

        case player1.keys.bottom.key:
            player1.keys.bottom.pressed = true;
            player1.lastKey = player1.keys.bottom.key;
            break;

        case player1.keys.left.key:
            player1.keys.left.pressed = true;
            player1.lastKey = player1.keys.left.key;
            break;

        case player1.keys.right.key:
            player1.keys.right.pressed = true;
            player1.lastKey = player1.keys.right.key;
            break;

        case player2.keys.up.key:
            player2.keys.up.pressed = true;
            player2.lastKey = player2.keys.up.key;
            break;

        case player2.keys.bottom.key:
            player2.keys.bottom.pressed = true;
            player2.lastKey = player2.keys.bottom.key;
            break;

        case player2.keys.left.key:
            player2.keys.left.pressed = true;
            player2.lastKey = player2.keys.left.key;
            break;

        case player2.keys.right.key:
            player2.keys.right.pressed = true;
            player2.lastKey = player2.keys.right.key;
            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case player1.keys.up.key:
            player1.keys.up.pressed = false;
            break;

        case player1.keys.bottom.key:
            player1.keys.bottom.pressed = false;
            break;

        case player1.keys.left.key:
            player1.keys.left.pressed = false;

            break;

        case player1.keys.right.key:
            player1.keys.right.pressed = false;
            break;

        case player2.keys.up.key:
            player2.keys.up.pressed = false;
            break;

        case player2.keys.bottom.key:
            player2.keys.bottom.pressed = false;
            break;

        case player2.keys.left.key:
            player2.keys.left.pressed = false;
            break;

        case player2.keys.right.key:
            player2.keys.right.pressed = false;
            break;
    }
});