//MVC Design pattern

const db = require('../data/db-config');


function find() {
    return db('recipe');
}

function findById(id) {
    return db('recipe').where({ id }).first();
}

function findRecipes() {
    return db('recipe');
}

function add() {
    return db('recipe').where({ id }).first();
}

function update() {
    return db('recipe').where({ id }).first();
}

function remove() {
    return db('recipe').where({ id }).first();
}



    module.exports = {
        find,
        findById,
        findRecipes,
        add,
        update,
        remove
    }