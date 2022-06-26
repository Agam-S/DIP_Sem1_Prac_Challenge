const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');


const auth = require("./routes/auth");
const pet = require("./routes/pet");
const procedure = require("./routes/procedure");
const treatment = require("./routes/treatment");
const staff = require("./routes/staff");


mongoose.connect(
    "mongodb+srv://admin:admin1234@prac.r7c5f.mongodb.net/dip-challenge?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    () => {
      console.log("Connected to DB");
    }
);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
mongoose.Promise = global.Promise;
app.use("/auth", auth)
app.use("/pet", pet)
app.use("/procedure", procedure)
app.use("/treatment", treatment)
app.use("/staff", staff)

const server = app.listen(8080, () => {
    const port = server.address().port;
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    res.send({ message: "Welcome to this PRAC" });
  });