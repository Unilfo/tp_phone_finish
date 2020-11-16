module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define('Department', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name_dp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        key_dp: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        { timestamps: false }
    );

    Department.associate = function (models) {
        models.Department.hasMany(models.Employee, {
            onDelete: 'cascade',
            foreignKey: {
                name: "departmentId",
                allowNull: false
            }
        });
    };

    return Department;
};
