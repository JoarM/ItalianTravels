import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
 
export const poolConnection = mysql.createPool({
  host: "host",
  user: "user",
  database: "database",
});
 
const db = drizzle(poolConnection);