const Department = require("./department");

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      additionalPhone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      img: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
    },
    { timestamps: false }
  );

  Employee.associate = (models) => {
    Employee.belongsTo(models.Department, {
      foreignKey: {
        name: "departmentId",
        allowNull: false,
      },
    });
  };
  return Employee;
};
