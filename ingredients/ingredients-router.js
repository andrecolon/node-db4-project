
const express = require('express');
const knex = require('knex');
const dbConfig = require('../data/db-config.js');
const knexConfig = require('../knexfile.js');
const { findRecipes } = require('../recipe/recipe-model.js');

// const db = require('../data/db-config');
const Ingredients = require('./ingredients-model');

const router = express.Router();

router.get('/', (req, res) => {
    Ingredients.find()
        .then(ing => {
            res.json(ing);
        })
        .catch(err => {
            res.status(500).json({ message: 'error getting ingrdients', error: err })
        })
});

router.get(':id/recipes', (req, res) => {
    const { id } = req.params;
    Ingredients.findRecipes(id)
        .then(Ingredients => {
            res.json(Ingredients)
        })
        .catch(err => {
            res.status(500).json({ message: "error getting ingredients for ingredients" })
        })
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;// Because we want to selct a specifi ID
    try {
        //const response = await db('ingredients').where('id', id).select('*');
        const [Ingredients] = await db('ingredients').where({ id });
        if (Ingredients) {
            res.json(Ingredients)
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
        //const sql = db('ingredients').insert(newPost).toString();
        // console.log(sql)
        const post = await db('ingredients').insert(newPost);
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
        const count = await db('ingredients').update(changes).where({ id });

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
        const count = await db('ingredients').where({ id }).del();

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