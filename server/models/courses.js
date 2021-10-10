const db = require("./index") // import the Database connection path;
const seq = db.sequelize;

module.exports = (seq, DataTypes) => {
  const Courses = seq.define("courses", {
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
    total: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });

  return Courses;
};
