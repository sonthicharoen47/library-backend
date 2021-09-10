const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Borrow = sequelize.define(
  "Borrow",
  {
    id_borrow: {
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
    tableName: "borrow",
    timestamps: false,
  }
);

module.exports = Borrow;
