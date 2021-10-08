// import './db.js';
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

const { Sequelize, DataTypes, Model } = require('sequelize');
const models = require('./models');

models.sequelize.sync({logging: console.log, force: true}).then(result => {
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

}).catch(err => {
  console.log(err);
});


