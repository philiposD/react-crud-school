const db = require("./index") // import the Database connection path;
const seq = db.sequelize;

module.exports = (seq, DataTypes) => {
  const StudentModules = seq.define("studentModules", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    scoreSimulation: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    scoreExam: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    registrationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });

  return StudentModules;
};
