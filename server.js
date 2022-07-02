//load env variables
if  (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

//Import Dependencies
const express  = require('express')
const cors = require('cors');
const connectToDb = require ("./config/connectToDb")
const notesController = require("./controllers/notesController");

//Create an express App
const app = express()

//Configure Express app
app.use(express.json());
app.use(cors());

//Connect to DB
connectToDb();

//Routing
app.get('/notes', notesController.fetchNotes);
app.get('/notes/:id', notesController.fetchNotes)
app.post('/notes', notesController.createNote);
app.put('/notes/:id', notesController.updateNote);
app.delete("/notes/:id", notesController.deleteNote);


//start our server
app.listen(process.env.PORT);