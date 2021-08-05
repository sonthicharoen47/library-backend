const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Rent = sequelize.define(
  "Rent",
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
    tableName: "rent",
    timestamps: false,
  }
);

module.exports = Rent;
