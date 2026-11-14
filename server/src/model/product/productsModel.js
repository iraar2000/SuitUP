import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";
import QueryCreator from "../../utils/queryCreator.js";

// the class which controls the product table
export default class ProductModel {
    constructor() {
        this.queryCreator = new QueryCreator();
    }

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
        const q = this.queryCreator.buildProductRetrievalQuery({ where: "WHERE p.id=$1" });
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve product by ID, productModel.js file", [prodId]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] };
    }

    // the function which retrieve all product by offset
    async retrieveProductByOffset(condition = {}, limit = 10, offset) {
        // the conditions
        const cond = Object.keys(condition).map((cond, index) => {
            if (cond === 'brand') return `b.id=$${index + 3}`;
            else if (cond === 'supplier') return `s.id=$${index + 3}`
            else if (cond === 'category') return `c.id=$${index + 3}`
            else if (cond === 'subCategory') return `sc.id=$${index + 3}`
            else if (cond === 'collection') return `col.id=$${index + 3}`
        })

        // query creator
        const q = this.queryCreator.buildProductRetrievalQuery({
            where: `WHERE ${cond.join(' AND ')}`,
            limit: "LIMIT $1",
            offset: "OFFSET $2",
            includeVariant: true,
            includeCollection: !!condition.collection
        });

        return await postgresQueryHelper(q, "Internal server error, failed to retrieve products by offset, productsModel.js file", [limit, offset, ...Object.values(condition)]);
    }

    // the function

} 