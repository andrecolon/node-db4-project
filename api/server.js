const express = require('express');
const helmet = require('helmet');

const recipeRouter = require('../recipe/recipe-router');
// const ingredientsRouter = require('../recipe/ingredients-router');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/recipes', recipeRouter);
// server.use('/api/ingredients', recipeRouter);


module.exports = server;
