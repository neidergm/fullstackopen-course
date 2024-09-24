import express from "express";

const app = express();

app.get("/ping", (_req, res) => {
    res.send("pong");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

