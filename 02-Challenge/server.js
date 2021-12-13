// Dependencies
import express, { urlencoded, json, static } from "express";
import { join } from "path";
import { readFile, writeFile } from "fs";
import { promisify } from 'util"';
import { allowedNodeEnvironmentFlags } from "process";

// Handling Asynchronous Processes
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

// Setting Up server
const app = express();
const PORT = process.env.PORT || 5500;

app.use(urlencoded({ extended: true }));
app.use(json());

// Static Middleware
app.use(static("./develop/public"));


// API Route | "get" request
app.get("/api/notes", function(req, res) {
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});


// API Route | "POST" request
app.post("/api/notes", function(req,res) {
    const note = req.body;
    readFileAsync("./developed/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        note.push(note);
        return notes        
    }).then(function(notes) {
        writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
        res.json(note);
    })
});

// API Route DELETE Request
app.delete("/api/notes/:id",function(req, req) {
    const idToDelete = parseInt(req.param.id);
    readFileAsync("./develop/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        const newNotesData = []
        for (let i=0; i<notes.length; i++) {
            if(idToDelete !== notes[i].id) {
                newNotesData.push(notes[i])
            }
        }
        return newNotesData
    }).then(function(notes) {
        writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
        res.send('save successful');
    })
})

//HTML Routes
app.get("/notes", function(req, res) {
    res.sendFile(join(__dirname, "./develop/public/notes.html"));
});

app.get("/", function(req, res) {
            res.sendFile(join(__dirname, "./develop/public/index.html"));
});

app.get("+", function(req, res) {
    res.sendFile(join(__dirname, ".develop/public/index.html"));
});

// Listening Function
app.listen(PORT,() => {
        console.log("App is listening on PORT" + PORT);
    });