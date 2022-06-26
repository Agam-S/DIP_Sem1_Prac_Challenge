const router = require('express').Router();
const mongoose = require('mongoose');
const verifyToken = require('../routes/verifyToken');
const Treatment = require('../models/treatment');
const Owner = require('../models/owner');

router.post('/', verifyToken, async (req, res) => {
    try {
        const newTreatment = new Treatment ({
            PetName: req.body.PetName,
            ProcedureID : req.body.ProcedureID,
            Date : req.body.Date,
            Notes : req.body.Notes,
            Payment : req.body.Payment,
            OwnerID : req.owner._id
    });
    const savedTreatment = await newTreatment.save();
    res.json(savedTreatment);
    } catch (error) {
        res.status(400).send(error);
    }
})
router.get('/', verifyToken, async (req, res) => {
    const Treatments = await Treatment.find({OwnerID: req.owner._id});
    res.send(Treatments);
});

module.exports = router;