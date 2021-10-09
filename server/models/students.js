const db = require("./index") // import the Database connection path
const seq = db.sequelize;

module.exports = (seq, DataTypes) => {
  const Students = seq.define("students", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    emailStudent: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    emailParent: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    phoneStudent: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    phoneParent: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    UID: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    parentName: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    school: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    class: {
      type: DataTypes.STRING(32),
      allowNull: true,
    }
  });

  return Students;
};
