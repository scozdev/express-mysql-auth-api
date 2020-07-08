import Sequelize from "sequelize";
import { sequelize } from "../../clients/sequelize";

export const User = sequelize.define("users", {
  uuid: { type: Sequelize.STRING, primaryKey: true },
  username: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  password: Sequelize.STRING,
});
