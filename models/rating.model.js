const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConfig");
const Role = require("./role.model");
const Book = require("./book.model");

const Rating = sequelize.define(
  "rating",
  {
    id_rating: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Comment: {
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

Rating.belongsTo(Role, { foreignKey: "fk_role" });
Rating.belongsTo(Book, { foreignKey: "fk_book" });

module.exports = Rating;
