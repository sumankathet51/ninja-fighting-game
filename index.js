// const express = require("express");
const express = require("express");

const app = express();

app.use(express.json());
const path = require("path");
const Map = require("./config.js");

const level2 = require("./gameMap.json");
// const path = require("path");
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// import { Database } from "./config.js";

// const __filename = fileURLToPath(
//     import.meta.url);
// const __dirname = dirname(__filename);

app.use(express.static(__dirname + "/assets"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/src/index.html"));
});

app.get("/api/game/", async(req, res) => {
    const data = await Map.get();

    const gameMaps = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    // console.log(data);
    res.send({ msg: "success", gameMaps });
});

app.get("/api/game/store", async(req, res) => {
    const data = req.body;
    Map.add({
        name: data.name,
        obstacles: data.obstacles,
    });
    res.send({ msg: "success" });
});

app.listen(3000);