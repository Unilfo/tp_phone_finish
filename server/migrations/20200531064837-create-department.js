'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Departments',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.DataTypes.INTEGER
        },
        name_dp: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
        key_dp: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false
        }
      },
      { timestamps: false }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Departments');
  }
};
