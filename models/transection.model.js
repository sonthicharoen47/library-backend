const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConfig");
const Rent = require("./rent.model");
const Role = require("./role.model");

const Transection = sequelize.define(
  "transection",
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
    freezeTableName: true,
    timestamps: false,
  }
);

Transection.belongsTo(Role, { foreignKey: "fk_role" });
Transection.belongsTo(Rent, { foreignKey: "fk_rent" });

module.exports = Transection;
