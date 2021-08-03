const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConfig");

module.exports = sequelize.define(
  "roleDetail",
  {
    id_roleDetail: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
