const db = require("./index") // import the Database connection path;
const seq = db.sequelize;

module.exports = (seq, DataTypes) => {
  const CourseModules = seq.define("courseModules", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    registrationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return CourseModules;
};
