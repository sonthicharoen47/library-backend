const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const BorrowDetail = sequelize.define(
  "BorrowDetail",
  {
    id_borrowDetail: {
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
    tableName: "borrowDetail",
    timestamps: false,
  }
);

module.exports = BorrowDetail;
