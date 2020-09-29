
const express = require('express');
const knex = require('knex');
const dbConfig = require('../data/db-config.js');
const knexConfig = require('../knexfile.js');

// const db = require('../data/db-config');
const Recipes = require('./recipe-model');

const router = express.Router();

router.get('/', (req, res) => {
    Recipes.find()
    .then(recipe => {
            res.json(recipe);
        })
        .catch(err => {
            res.status(500).json({ message: 'error getting recipe', error: err })
        })
});

router.get(':id/recipes', (req, res) =>{
    const { id } = req.params;

    db('recipes as r')
    .join('ingredients as ing','ing.id', 'r.ing_id')
    .select('r.id')
    .where({recipe_id: id})
        .then(recipes =>{
         res.json(recipes)
     })
     .catch(err =>{
         res.status(500).json({message: "error getting ingredients for recipe"})
     })
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;// Because we want to selct a specifi ID
    try {
        //const response = await db('recipe').where('id', id).select('*');
        const [recipes] = await db('recipe').where({ id });
        if (recipes) {
            res.json(recipes)
        } else {
            res.status(404).json({ message: 'bad id' });
        }
        // see image in slack about {id}
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
});

router.post('/', async (req, res) => {

    const newPost = req.body;
    try {
        //const sql = db('recipe').insert(newPost).toString();
        // console.log(sql)
        const post = await db('recipe').insert(newPost);
        res.status(201).json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json()
    }

});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    try {
        const count = await db('recipe').update(changes).where({ id });

        if (count) {
            res.json({ updated: count })
        } else {
            res.status(500).json({ message: 'invalid ID' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "error uploading record" })
    }

});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const count = await db('recipe').where({ id }).del();

        if (count) {
            res.json({ deleted: count });
        } else {
            res.status(404).json({ message: 'Invalid ID' })

        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "error uploading record" })
    }
});

module.exports = router;