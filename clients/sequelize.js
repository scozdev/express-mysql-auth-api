import Sequelize from "sequelize";

export const sequelize = new Sequelize("community", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
