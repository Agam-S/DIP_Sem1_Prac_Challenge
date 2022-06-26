const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const Owner = require('../models/owner');
const jwt = require('jsonwebtoken');
const verifyToken = require('../routes/verifyToken');

router.post("/login", async (req, res) => {
  
    const owner = await Owner.findOne({ Email: req.body.Email });
    if (!owner) return res.status(400).send("Email not found ://");
  
    const correctPass = await bcrypt.compare(req.body.Password, owner.Password);
    if (!correctPass) return res.status(400).send("Password is Invalid ://");
  
    const token = jwt.sign({ _id: owner._id }, "DIPLOMA_SECRET_KEY");
  
    res.json({ token: token, owner: owner});  
});

router.post("/signin", async (req, res) => {
  
    const ownerExists = await Owner.findOne({ Email: req.body.Email });
    if (ownerExists) return res.status(400).send("Email/ User already exists");
  
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.Password, salt);

    const owner = new Owner({
        Surname: req.body.Surname,
        Firstname: req.body.Firstname,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Password: hashPassword,
        Role: req.body.Role
      });
      try {
        const savedUser = await owner.save();
        res.send({ savedUser });
      } catch (err) {
        res.status(404).send(err);
      }
    });


router.get("/", (req, res) => {
    res.send({ message: "Wvewvwelcome to this PRAC" });
    });


router.put("/update", verifyToken, async (req, res)=>{
  try {
  const updateOwner = await Owner.findByIdAndUpdate(req.owner._id, {Surname: req.body.Surname,
    Firstname: req.body.Firstname,
    Phone: req.body.Phone,
    Email: req.body.Email});

    res.send("Owner updated");
  } catch {
    res.status(400).send("Error updating owner");
  }
  });


module.exports = router;