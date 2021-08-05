const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Category = sequelize.define(
  "Category",
  {
    id_category: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "category",
    timestamps: false,
  }
);

module.exports = Category;
