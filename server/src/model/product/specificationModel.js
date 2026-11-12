import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";

// the class which manages the specification table
export default class SpecificationModel {
    constructor() { }

    // the function which creates the specifications
    async createSpecification(specificationData) {
        const q = `INSERT INTO specification(name, unit) VALUES($1, $2) RETURNING *;`;
        return await postgresQueryHelper(q, "Internal server error, failed to create specifications, specificationModel.js file", specificationData);
    }

    // the function which retrieves the specification by name from database
    async retrieveSpecificationByName(name) {
        const q = `SELECT id, name, unit FROM specification WHERE name=$1;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve specification by name, specificationModel.js file", [`${name}`.toLowerCase()]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] };
    }
}