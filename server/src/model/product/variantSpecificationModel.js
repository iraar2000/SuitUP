import { postgresQueryHelper } from "../../utils/postgresHelperFunctions";

export default class VariantSpecificationModel {
    constructor() { }

    // the function which created the variant specification
    async createVariantSpecification(varSpecData) {
        const q = `INSERT INTO variant_specification(variant_id, specification_id, value) VALUES($1, $2, $3) RETURNING *;`;
        return postgresQueryHelper(q, "Internal server error, failed to create variant specification, variantSpecificationModel.js file", varSpecData);
    }

    // the function which returns the variant specification by variant id
    async retrieveVariantSpecification(variantId) {
        const q = `SELECT s.name, s.unit, vs.value 
            FROM variant_specification vs
            JOIN specification s ON vs.specification_id=s.id
            WHERE variant_id=$1;`;
        return await postgresQueryHelper(q, "Internal server error, failed to retrieve variant specification by variant id, variantSpecificationModel.js file", [variantId]);
    }
}