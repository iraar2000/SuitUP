import { Pool } from "pg"
import "dotenv/config";

// ==== postgresql database ====
export const Postgresql = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSERNAME,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
});




