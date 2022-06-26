const router = require('express').Router();
const mongoose = require('mongoose');
const verifyToken = require('../routes/verifyToken');
const Pet = require('../models/pet');

router.post('/', verifyToken, async (req, res) => {
    const newPet = new Pet ({
        PetName: req.body.PetName,
        Type: req.body.Type,
        OwnerID: req.owner._id
    });
    const savedPet = await newPet.save();
    res.json(savedPet);
})

router.get('/', verifyToken, async (req, res) => {
    const pets = await Pet.find({ OwnerID: req.owner._id });
    res.send(pets);
});

router.delete('/:_id', verifyToken, async (req, res) => {
    const pet = await Pet.findByIdAndDelete(req.params._id);
    res.send({msg: "Pet deleted", pet});
});

module.exports = router;