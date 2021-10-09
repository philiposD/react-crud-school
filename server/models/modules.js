const db = require("./index") // import the Database connection path;
const seq = db.sequelize;

module.exports = (seq, DataTypes) => {
  const Groups = seq.define("groups", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    simulationTest: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exam: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });

  return Groups;
};
