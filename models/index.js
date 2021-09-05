const Account = require("./account.model");
const Role = require("./role.model");
const Book = require("./book.model");
const Author = require("./author.model");
const Category = require("./category.model");
const Rating = require("./rating.model");
const Rent = require("./rent.model");
const RentDetail = require("./rentDetail.model");
const RoleDetail = require("./roleDetail.model");

Account.hasOne(Role, { foreignKey: "fk_account" });
Role.belongsTo(Account, { foreignKey: "fk_account" });

RoleDetail.hasMany(Role, { foreignKey: "fk_roleDetail" });
Role.belongsTo(RoleDetail, { foreignKey: "fk_roleDetail" });

Author.hasMany(Book, { foreignKey: "fk_author" });
Book.belongsTo(Author, { foreignKey: "fk_author" });

Category.hasMany(Book, { foreignKey: "fk_category" });
Book.belongsTo(Category, { foreignKey: "fk_category" });

Book.hasMany(Rating, { foreignKey: "fk_book" });
Rating.belongsTo(Book, { foreignKey: "fk_book" });

Role.hasMany(Rating, { foreignKey: "fk_role" });
Rating.belongsTo(Role, { foreignKey: "fk_role" });

Rent.hasMany(RentDetail, { foreignKey: "fk_rent" });
RentDetail.belongsTo(Rent, { foreignKey: "fk_rent" });

Book.hasMany(RentDetail, { foreignKey: "fk_book" });
RentDetail.belongsTo(Book, { foreignKey: "fk_book" });

Role.hasMany(Rent, { foreignKey: "fk_role" });
Rent.belongsTo(Role, { foreignKey: "fk_role" });

module.exports = {
  Account,
  Role,
  Book,
  Author,
  Category,
  Rating,
  Rent,
  RentDetail,
  RoleDetail,
};
