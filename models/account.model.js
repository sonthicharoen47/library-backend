const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConfig");

module.exports = sequelize.define(
  "account",
  {
    id_account: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lastLogged: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    createdAt: "createdAt",
    updatedAt: "lastLogged",
  }
);
