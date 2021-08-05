const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Transection = sequelize.define(
  "Transection",
  {
    id_transection: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "transection",
    timestamps: false,
  }
);

module.exports = Transection;
