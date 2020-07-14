'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const clientHandlers = require('./handlers/clientHandlers');
const hangmanHandlers = require('./handlers/hangmanHandlers');

const app = express()
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
app.use(morgan('tiny'))
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))

// endpoints Exercise 2
app.get('/', (req, res) => res.redirect('/clients'));
app.get('/clients', clientHandlers.handleClientList);
app.get('/clients/:id', clientHandlers.handleClient);
app.post('/clients', clientHandlers.handleAddClient);
app.delete('/clients/:id', clientHandlers.handleDeleteClient);

// endpoints Exercise 3
app.get('/hangman/word', hangmanHandlers.handleRandomWord);
app.get('/hangman/word/:id', hangmanHandlers.handleWordByID);
app.get('/hangman/guess/:id/:letter', hangmanHandlers.handleGuessLetter);

app.listen(8000, () => console.log(`Listening on port 8000`));
