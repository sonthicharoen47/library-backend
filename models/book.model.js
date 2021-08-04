const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConfig");
const Author = require("./author.model");
const Category = require("./category.model");

const Book = sequelize.define(
  "book",
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
    freezeTableName: true,
    timestamps: false,
  }
);

Book.belongsTo(Author, { foreignKey: "fk_author" });
Book.belongsTo(Category, { foreignKey: "fk_category" });

module.exports = Book;
