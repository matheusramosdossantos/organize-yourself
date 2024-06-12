import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "211119Ocart@",
  database: "Organize_Yourself",
  // porta do BANCO DE DADOS
  port: "3300",
});
