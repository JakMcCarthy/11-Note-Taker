// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

// Handling Asynchronous Processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Setting Up server
const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Middleware
app.use(express.static("docs"));


// API Route | "get" request
app.get("/api/notes", function(req, res) {
    readFileAsync("./db/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});


// API Route | "POST" request
app.post("/api/notes", function(req,res) {
    const note = req.body;
    readFileAsync("./db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes        
    }).then(function(notes) {
        writeFileAsync("./db/db.json", JSON.stringify(notes))
        res.json(note);
    })
});

// API Route DELETE Request
app.delete("/api/notes/:id",function(req, req) {
    const idToDelete = parseInt(req.param.id);
    readFileAsync("./db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        const newNotesData = []
        for (let i=0; i<notes.length; i++) {
            if(idToDelete !== notes[i].id) {
                newNotesData.push(notes[i])
            }
        }
        return newNotesData
    }).then(function(notes) {
        writeFileAsync("./db/db.json", JSON.stringify(notes))
        res.send('save successful');
    })
})

//HTML Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./docs/notes.html"));
});

app.get("/", function(req, res) {
            res.sendFile(path.join(__dirname, "./docs/index.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./docs/index.html"));
});

// Listening Function
app.listen(PORT,() => {
        console.log("App is listening on PORT" + PORT);
    });