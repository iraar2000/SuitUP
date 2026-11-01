import mysql from "mysql2/promise";
import { Pool, Client } from "pg"
import "dotenv/config";

// creating a connection using DataBase UR
// ==== mysql database ====
export const Mysql = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
})


// ==== postgresql database ====
export const Postgresql = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
})




