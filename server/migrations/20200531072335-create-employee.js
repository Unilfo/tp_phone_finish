// npx sequelize migration:create --name NAME_TYT
// npx sequelize db:migrate

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Employees",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.DataTypes.INTEGER,
        },
        fio: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        position: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        departmentId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Departments",
            key: "id",
          },
        },
        additionalPhone: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        note: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        img: {
          type: Sequelize.DataTypes.BLOB,
          allowNull: true,
        },
      },
      { timestamps: false }
    );
  },
  down: (queryInterface /*, Sequelize */) => {
    return queryInterface.dropTable("Employees");
  },
};
