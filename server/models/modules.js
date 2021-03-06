const db = require("./index") // import the Database connection path;
const seq = db.sequelize;

module.exports = (seq, DataTypes) => {
  const Modules = seq.define("modules", {
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });

  return Modules;
};
