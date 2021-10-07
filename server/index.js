// import './db.js';
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

const { Sequelize, DataTypes, Model } = require('sequelize');
const models = require('./models');

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });


models.sequelize.sync().then(result => {
  console.log(result);
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

  console.log(models);
  app.get("/api", (req, res) => {
    // let asd = models['Users'].findAll();
    // console.log(asd);
    console.log(models);
    models.users.findAll().then(data => {
      console.log(data);
      res.json({ message: "Hello from server!!!", users: JSON.stringify({asd: data}, null, 2) });
    });


  });

}).catch(err => {
  console.log(err);
});



//DATABASE
// const sequelize = new Sequelize('crud_boilerplate', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
//   logging: console.log,
// });

// async function connect() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// connect();

// class Users extends Model {}

// Users.init({
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   phone: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
// }, {tableName: 'Users'});

// sequelize.define('Users', {
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   phone: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
// }, {tableName: 'Users'});

// sequelize.sync();




