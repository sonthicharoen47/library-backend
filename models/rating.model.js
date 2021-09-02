const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Rating = sequelize.define(
  "Rating",
  {
    id_rating: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "rating",
    timestamps: false,
  }
);

module.exports = Rating;
