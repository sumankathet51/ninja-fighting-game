// const express = require("express");
import express from "express";

const app = express();
// const path = require("path");
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + "/assets"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/src/index.html"));
});

app.listen(3000);