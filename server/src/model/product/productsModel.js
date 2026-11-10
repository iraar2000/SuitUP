import { postgresQueryHelper } from "../../utils/postgresHelperFunctions";

// the class which controls the product table
export default class ProductModel {
    constructor() { }

    // the function which creates the product
    async createProduct(productData) {
        const q = `INSERT INTO products(name, description, create_by_id, category_id, brand_id, supplier_id) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to create the product in the database, productModel.js file", productData);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the function which updates the product
} 