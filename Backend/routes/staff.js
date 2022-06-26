const router = require('express').Router();
const mongoose = require('mongoose');
const verifyToken = require('../routes/verifyToken');
const Treatment = require('../models/treatment');
const Owner = require('../models/owner');

router.post('/treatment', verifyToken, async (req, res) => {
    const owner = await Owner.findOne({ _id: req.owner._id });
    if (owner.Role != 'Admin') {
        res.status(401).send({msg: "You are not authorized to perform this action"});
    }
    else {
    try {
        const newTreatment = new Treatment ({
            PetName: req.body.PetName,
            ProcedureID : req.body.ProcedureID,
            Date : req.body.Date,
            Notes : req.body.Notes,
            Payment : req.body.Payment,
            Paid : req.body.Paid,
            OwnerID : req.body._id
    });
    const savedTreatment = await newTreatment.save();
    res.json(savedTreatment);
    } catch (error) {
        res.status(400).send(error);
    }
}
})
router.get('/allUsers', verifyToken, async (req, res) => {
    const owner = await Owner.findOne({ _id: req.owner._id });
    if (owner.Role != 'Admin') {
        res.status(401).send({msg: "You are not authorized to perform this action"});
    }
    else{
    const owners = await Owner.find({});
    res.send(owners);
}
});
router.put("/updateTreat/:_id", verifyToken, async (req, res)=>{
    const owner = await Owner.findOne({ _id: req.owner._id });
    if (owner.Role != 'Admin') {
        res.status(401).send({msg: "You are not authorized to perform this action"});
    }
    else{
    try {
    const updateTreat = await Treatment.findByIdAndUpdate(req.params._id, {PetName: req.body.PetName,
        ProcedureID : req.body.ProcedureID,
        Date : req.body.Date,
        Notes : req.body.Notes,
        Payment : req.body.Payment,
        Paid : req.body.Paid,
        OwnerID : req.body._id});
  
      res.send(updateTreat);
    } catch {
      res.status(400).send("Error updating treatment");
    }
    }
    });

router.get("/treatment/:OwnerID", verifyToken, async (req, res)=>{
    const owner = await Owner.findOne({ _id: req.owner._id });
    if (owner.Role != 'Admin') {
        res.status(401).send({msg: "You are not authorized to perform this action"});
    }
    else{
    try {
    const treatment = await Treatment.find({OwnerID: req.params.OwnerID});
    res.send(treatment);
    } catch {
        res.status(400).send("Error getting treatment");
    }
    }
    });

module.exports = router;