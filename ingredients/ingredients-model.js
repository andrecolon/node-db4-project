//MVC Design pattern

const db = require('../data/db-config');


function find() {
    return db('ingredients');
}

function findById(id) {
    return db('ingredients').where({ id }).first();
}

function findRecipes(id) {
    return db('recipe as r')
        .join('ingredients as ing', 'ing.id', 'r.ing_id')
        .select('r.id')
        .where({ ingredients_id: id })
}

function add(ingredient) {
    return db('ingredients')
    .insert(ingredient, 'id');
}

function update(id, changes) {
    return db('ingredients')
    .where({ id })
    .update(changes);
}

function remove(id) {
    return db('ingredients')
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