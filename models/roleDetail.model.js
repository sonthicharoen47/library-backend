const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const RoleDetail = sequelize.define(
  "RoleDetail",
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
    tableName: "roleDetail",
    timestamps: false,
  }
);

module.exports = RoleDetail;
