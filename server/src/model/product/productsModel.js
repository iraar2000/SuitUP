import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";

// the class which controls the product table
export default class ProductModel {
    constructor() { }

    // the function which creates the product
    async createProduct(productData) {
        const q = `INSERT INTO products(name, description, create_by_id, sub_categ_id, brand_id, supplier_id) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to create the product in the database, productModel.js file", productData);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }

    // the function which retrieve the product by id
    async retrieveProductById(prodId) {
        const q = `SELECT * FROM products WHERE id=$1;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve product by ID, productModel.js file", [prodId]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] };
    }

    // retrieve products data
    async retrieveProductsData(dataIds) {

    }
} 