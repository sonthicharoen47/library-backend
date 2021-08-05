const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Book = sequelize.define(
  "Book",
  {
    id_book: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "book",
    timestamps: false,
  }
);

module.exports = Book;
