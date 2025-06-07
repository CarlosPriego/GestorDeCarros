import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("DBConcesionaria", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
  port: process.env.PORTMYSQL || 3306,
});

// sequelize requiere que ya se halla creado una base de datos
