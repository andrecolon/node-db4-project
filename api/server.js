const express = require('express');
const helmet = require('helmet');

const carRouter = require('../recipe/recipe-router');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/recipes', carRouter);

module.exports = server;
