import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";

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

    // the function which updates the variant specifications
    async updateVariantSpecification(variantId, data) {
        const keys = Object.keys(data);
        if (!keys.length) throw new Error("No fields to update.");

        const setters = keys.map((key, index) => `${key} = $${index + 3}`).join(',');
        const values = [variantId, ...Object.values(data)]

        const q = this.queryCreator.buildUpdatorQuery({
            table: "variant_specification",
            setters,
            where: "WHERE variant_id=$1 RETURNING *"
        });

        return await postgresQueryHelper(q, "Internal server error, failed to update variant specifications, variantSpecificationModel.js file", values);
    }
}