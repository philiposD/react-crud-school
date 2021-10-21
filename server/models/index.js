'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const students = require('./students');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize.authenticate();

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.parents.hasMany(db.parentStudents, { as: 'data' });
db.students.hasMany(db.parentStudents);

// db.parentStudents.belongsTo(db.students, { as: 'data' });

db.parentStudents.belongsTo(db.students, { foreinKey: 'studentId' });
db.parentStudents.belongsTo(db.parents, { foreinKey: 'parentId' });

// db.students.belongsToMany(db.parents, { through: db.parentStudents });
// db.parents.belongsToMany(db.students, { through: db.parentStudents });

//SELECT * FROM students s LEFT JOIN parentStudents ps ON s.id = ps.studentId where ps.parentId =1;
//SELECT `students`.`id`, `students`.`firstName`, `students`.`lastName`, `students`.`dateOfBirth`, `students`.`email`, `students`.`phone`, `students`.`UID`, `students`.`school`, `students`.`class`, `students`.`createdAt`, `students`.`updatedAt`, `parentStudents`.`id` AS `parentStudents.id`, `parentStudents`.`createdAt` AS `parentStudents.createdAt`, `parentStudents`.`updatedAt` AS `parentStudents.updatedAt`, `parentStudents`.`parentId` AS `parentStudents.parentId`, `parentStudents`.`studentId` AS `parentStudents.studentId` FROM `students` AS `students` INNER JOIN `parentStudents` AS `parentStudents` ON `students`.`id` = `parentStudents`.`studentId` AND `parentStudents`.`parentId` = 1;
//https://stackoverflow.com/questions/20460270/how-to-make-join-queries-using-sequelize-on-node-js

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
