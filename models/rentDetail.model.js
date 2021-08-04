const { DataTypes } = require("sequelize");
const { sequelize } = require("../dbConfig");
const Rent = require("./rent.model");

const RentDetail = sequelize.define(
  "rentDetail",
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
    freezeTableName: true,
    timestamps: false,
  }
);

RentDetail.belongsTo(Rent, { foreignKey: "fk_rent" });
RentDetail.belongsTo(Book, { foreignKey: "fk_book" });

module.exports = RentDetail;
