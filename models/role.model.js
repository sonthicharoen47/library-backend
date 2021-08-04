const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../dbConfig");
const Account = require("./account.model");
const RoleDetail = require("./roleDetail.model");
const Role = sequelize.define(
  "Role",
  {
    id_role: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "role",
    timestamps: false,
  }
);

module.exports = Role;
