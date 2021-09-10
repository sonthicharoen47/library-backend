const Account = require("./account.model");
const Role = require("./role.model");
const Book = require("./book.model");
const Author = require("./author.model");
const Category = require("./category.model");
const Rating = require("./rating.model");
const RoleDetail = require("./roleDetail.model");
const Borrow = require("./borrow.model");
const BorrowDetail = require("./borrowDetail");

//warning rating book role relation

Account.hasOne(Role, { foreignKey: "fk_account" });
Role.belongsTo(Account, { foreignKey: "fk_account" });

RoleDetail.hasMany(Role, { foreignKey: "fk_roleDetail" });
Role.belongsTo(RoleDetail, { foreignKey: "fk_roleDetail" });

Author.hasMany(Book, { foreignKey: "fk_author" });
Book.belongsTo(Author, { foreignKey: "fk_author" });

Category.hasMany(Book, { foreignKey: "fk_category" });
Book.belongsTo(Category, { foreignKey: "fk_category" });

Book.hasOne(Rating, { foreignKey: "fk_book" });
Rating.belongsTo(Book, { foreignKey: "fk_book" });

Role.hasOne(Rating, { foreignKey: "fk_role" });
Rating.belongsTo(Role, { foreignKey: "fk_role" });

Borrow.hasMany(BorrowDetail, { foreignKey: "fk_borrow" }); //1
BorrowDetail.belongsTo(Borrow, { foreignKey: "fk_borrow" });

Book.hasMany(BorrowDetail, { foreignKey: "fk_book" }); //2
BorrowDetail.belongsTo(Book, { foreignKey: "fk_book" });

Role.hasMany(Borrow, { foreignKey: "fk_role" }); //3
Borrow.belongsTo(Role, { foreignKey: "fk_role" });

module.exports = {
  Account,
  Role,
  Book,
  Author,
  Category,
  Rating,
  RoleDetail,
  Borrow,
  BorrowDetail,
};
