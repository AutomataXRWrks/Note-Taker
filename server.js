const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid')
const { error } = require('console');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());

app.get('/notes' , (req,res)=>{
    res.sendFile(path.join(__dirname,'/public/notes.html'));
});


app.get('/api/notes', (req,res) => {
    fs.readFile('./db/db.json', 'utf8', (error,data) => {
        res.send(data);
    })
})

app.post('/api/notes', (req,res) => {
    fs.readFile('./db/db.json', 'utf8', (error,data) => {
    const newNote = req.body;
    newNote.id = uniqid();
    const notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (error,data) =>{
        res.json(newNote);
    });
    })
})


app.delete('/api/notes/:id', (req,res) => {
    fs.readFile('./db/db.json', 'utf8', (error,data) => {
    const notes = JSON.parse(data);
    const updatedNotes = notes.filter(note => note.id !== req.params.id);
    fs.writeFile('./db/db.json', JSON.stringify(updatedNotes), (error,data) =>{
        res.json(notes);
    });
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/index.html'));
});

app.listen(PORT, () =>  console.log(`Example app listening at http://localhost:${PORT}`) );

