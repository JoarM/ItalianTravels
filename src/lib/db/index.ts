import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from "$env/static/private";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

//Connect to db
export const poolConnection = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD 
});

//Connect drizzle
export const db = drizzle(poolConnection);