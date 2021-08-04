const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConfig");
const Role = require("./role.model");

const Rent = sequelize.define(
  "rent",
  {
    id_rent: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Rent.belongsTo(Role, { foreignKey: "fk_role" });

module.exports = Rent;
