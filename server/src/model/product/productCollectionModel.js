import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";
import QueryCreator from "../../utils/queryCreator.js";

// the class which controlls the category table
export default class ProductCollectionModel {
    constructor() {
        this.queryCreator = new QueryCreator();
    }

    // the function which creates the productCollection in database
    async createProductCollection(prodColData) {
        const q = `INSERT INTO product_collection(product_id, collection_id) VALUES($1, $2) RETURNING *;`;
        return await postgresQueryHelper(q, "Internal server error, failed to create product collection, productCollectionModel.js file", prodColData);
    }

    // the function which retrieves the productCollection by collectionId and productId
    async retrieveProductCollectionByProdIdCollId(idsData) {
        const q = `SELECT * FROM product_collection WHERE product_id=$1 AND collection_id=$2;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve productCollection by prodId and collId", idsData);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] };
    }

}