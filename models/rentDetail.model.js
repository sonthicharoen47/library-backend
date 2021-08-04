const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConfig");

const RentDetail = sequelize.define(
  "RentDetail",
  {
    id_rentDetail: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    date_return: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "rentDetail",
    timestamps: false,
  }
);

module.exports = RentDetail;
