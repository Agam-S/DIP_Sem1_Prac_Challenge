const router = require('express').Router();
const mongoose = require('mongoose');
const verifyToken = require('../routes/verifyToken');
const Procedure = require('../models/procedure');
const Owner = require('../models/owner');

router.post('/', verifyToken, async (req, res) => {
    const owner = await Owner.findOne({ _id: req.owner._id });
    if (owner.Role != 'Admin') {
        res.status(401).send({msg: "You are not authorized to perform this action"});
    }
    else {
    const newPro = new Procedure ({
        Description : req.body.Description,
        Price : req.body.Price
    });
    const savedPro = await newPro.save();
    res.json(savedPro);
    }
})

router.get('/', verifyToken, async (req, res) => {
    const Procedures = await Procedure.find();
    res.send(Procedures);
});


module.exports = router;