//MVC Design pattern

const db = require('../data/db-config');


function find() {
    return db('recipe');
}

function findById(id) {
    return db('recipe').where({ id }).first();
}

function findRecipes(id) {
    return db('recipes as r')
        .join('ingredients as ing', 'ing.id', 'r.ing_id')
        .select('r.id')
        .where({ recipe_id: id })
}


function add(recipe) {
    return db('recipe')
        .insert(recipe, 'id');
}

function update(id, changes) {
    return db('recipe')
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db('recipe')
        .where({ id })
        .del();
}




    module.exports = {
        find,
        findById,
        findRecipes,
        add,
        update,
        remove
    }