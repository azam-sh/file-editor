"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const LocalStorage = require("node-localstorage").LocalStorage, localStorage = new LocalStorage("./scratch");
// const sqlite3 = require("sqlite3").verbose();
// let db = new sqlite3.Database("./db/test.db")
// db.run('CREATE TABLE files(name text, content text)')
// db.close((err: any) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });
app.use(cors());
app.use(express.json());
let files = [];
const dataFromLC = JSON.parse(localStorage.getItem("files"));
if (dataFromLC) {
    files = dataFromLC;
}
app.get("/files", (req, res) => {
    res.send(files);
});
app.post("/file-create", (req, res) => {
    files.push(req.body);
    localStorage.setItem("files", JSON.stringify(files));
    res.send(JSON.stringify("file created"));
});
app.delete("/files/:id", (req, res) => {
    const { id } = req.params;
    files = files.filter((file) => {
        return file.id !== +id;
    });
    localStorage.setItem("files", JSON.stringify(files));
    res.send(JSON.stringify("file deleted"));
});
app.put("/files/:id", (req, res) => {
    const { id } = req.params;
    const updatedFile = req.body;
    const oldFile = files.find((file) => {
        return file.id === +id;
    });
    if (oldFile) {
        const index = files.indexOf(oldFile);
        files[index] = updatedFile;
    }
    localStorage.setItem("files", JSON.stringify(files));
    res.send(JSON.stringify("file updated"));
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
