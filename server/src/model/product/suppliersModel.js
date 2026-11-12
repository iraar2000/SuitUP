import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";

// the class which controlls the category table
export default class SupplierModel {
    constructor() { }

    // the function which creates the category in database
    async createSupplier(supplierData) {
        const q = `INSERT INTO suppliers(name, address, logo_url, phone, email, website) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`;
        return await postgresQueryHelper(q, "Internal server error, failed to create category, categoryModel.js file", supplierData);
    }

    // the function which retrieves the category by id
    async retrieveSupplierById(supplierId) {
        const q = `SELECT id, name, address, logo_url, phone, email, website FROM suppliers WHERE id=$1;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve category by id, categoryModel.js file", [supplierId]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }


}