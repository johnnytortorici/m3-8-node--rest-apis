'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const handlers = require('./handlers/clientHandlers');

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

// endpoints
app.get('/', (req, res) => res.redirect('/clients'));
app.get('/clients', handlers.handleClientList);
app.get('/clients/:id', handlers.handleClient);
app.post('/clients', handlers.handleAddClient);
app.delete('/clients/:id', handlers.handleDeleteClient);

app.listen(8000, () => console.log(`Listening on port 8000`));
