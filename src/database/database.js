import Sequelize from "sequelize";

//export const sequelize = new Sequelize("database", "postgres", "", {
export const sequelize = new Sequelize("database", "mysql", "", {
  host: "localhost",
  dialect: "mysql",
});
