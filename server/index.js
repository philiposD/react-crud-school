// import './db.js';
const express = require("express");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const app = express();

const { Sequelize, DataTypes, Model } = require('sequelize');
const models = require('./models');
const Student = require('./models/students');
var cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

let forceDB = false

models.sequelize.sync({logging: console.log, force: forceDB}).then(result => {

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

  // console.log(models);
  app.get("/api", (req, res) => {
    // console.log(models);
    models.students.findAll().then(data => {
      // console.log(data);
      res.json({ message: "Hello from server!!!", data: data });
    });
  });

  app.post("/students/add", jsonParser, (req, res) => {
    console.log('/students/add req.body: ',req.body);
    models.students.build(req.body).save();
    res.send('Student inserted');
  });

}).catch(err => {
  console.log(err);
});


