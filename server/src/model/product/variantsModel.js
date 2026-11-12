import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";

export default class variantsModel {
    constructor() { }

    // the function which creates the variant
    async createVariant(variantData) {
        const q = `INSERT INTO variants(product_id, price, cost_price, sku, barcode, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to create product variant in database, variantsModel.js file", variantData);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }
}