import { Postgresql } from "../config/db.js";

// the function helps to postgres query
export async function postgresQueryHelper(q, errorMessage, values = []) {
    try {
        const response = await Postgresql.query(q, values);
        if (response.command) return { status: 200, data: response.rows }
    } catch (error) {
        if (error.code === '23505') return { status: 409, data: { message: 'Data already exists.', details: error.detail } };
        return { status: 500, data: { error: errorMessage || "Internal server error", errorDetails: error } }
    }
}

// the function helps to do postgres query with a specific client connection
export async function clientPostgresQueryHelper(client, q, errorMessage, values = []) {
    try {
        const response = await client.query(q, values);
        return { status: 200, data: response.rows }
    } catch (error) {
        await client.query('ROLLBACK');
        return { status: 500, data: { error: errorMessage || "Internal server error", errorDetails: error } }
    }
}