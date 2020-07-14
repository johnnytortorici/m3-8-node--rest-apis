const { v4: uuidv4 } = require('uuid');
const { clients } = require('../data/clients');

// write your handlers here...
const handleClientList = (req, res) => {
    res.status(200).json(clients);
};

const handleClient = (req, res) => {
    // define url param as id
    const _id = req.params.id;
    // assign client if ids match
    const client = clients.find((client) => {
        return client.id === _id;
    });
    // if client is defined, return client object
    if (client !== undefined) {
        res.status(200).json(client);
    } else {
        res.status(404).json('No client exists with that ID!');
    }
};

const handleAddClient = (req, res) => {
    // function to check email for existing client match
    const checkExisting = (newClient) => {
        let clientExists = false;
        clients.forEach((client) => {
            if (client.email === newClient.email) clientExists = true;
        });
        return clientExists;
    };
    const newClient = req.body;
    if (checkExisting(newClient)) {
        res.status(400).json('Client already exists!');
    } else {
        newClient.id = uuidv4();
        clients.push(newClient);
        res.status(201).json(newClient);
    }
};

const handleDeleteClient = (req, res) => {
    const _id = req.params.id;

    const deleteClient = clients.find((client) => {
        return client.id === _id;
    });
    if (deleteClient !== undefined) {
        let clientIndex = clients.indexOf(deleteClient);
        clients.splice(clientIndex, 1);
        res.status(200).json(deleteClient);
    } else {
        res.status(404).json('No client exists with that ID!');
    }
};

module.exports = { handleClientList, handleClient, handleAddClient, handleDeleteClient };