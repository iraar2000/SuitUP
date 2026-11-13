import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";

// the class which controlls the category table
export default class BrandModel {
    constructor() { }

    // the function which creates the category in database
    async createBrand(brandData) {
        const q = `INSERT INTO brand(name, logo, details, address) VALUES($1, $2, $3, $4) RETURNING *;`;
        return await postgresQueryHelper(q, "Internal server error, failed to create brand, brandModel.js file", brandData);
    }
}