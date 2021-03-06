'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
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

db.students.hasMany(db.parents);
db.parents.hasMany(db.parentStudents);
db.students.hasMany(db.parentStudents);

// db.parentStudents.hasMany(db.parents);
// db.parentStudents.hasMany(db.students);

// db.groups.hasMany(db.students);
// db.groups.hasMany(db.professors);
// db.students.hasMany(db.studentModules);
// db.modules.hasMany(db.studentModules);
// db.courses.belongsToMany(db.modules, { through: 'courseModules', onDelete: 'NO ACTION', onUpdate: 'NO ACTION' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
