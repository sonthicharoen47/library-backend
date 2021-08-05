const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Author = sequelize.define(
  "Author",
  {
    id_author: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    author_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "author",
    timestamps: false,
  }
);

module.exports = Author;
