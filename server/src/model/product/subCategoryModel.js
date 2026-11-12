import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";

export default class subCategoryModel {
    constructor() { }

    // create a sub category
    async createSubCategory(subCategData) {
        const q = `INSERT INTO sub_category(name, description, category_id) VALUES($1, $2, $3) RETURNING *;`;
        return await postgresQueryHelper(q, "Internal server error, failed to create a sub category in the database, subCategoryModel.js file", subCategData);
    }

    // retrieve a sub category by name
    async retrieveSubCategoryByName(name) {
        const q = `SELECT * FROM sub_catgeory WHERE name=$1;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve sub category by name, subCategoryModel.js file", [name]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] };
    }

    // retrieve a sub category by category id 
    async retrieveSubCategoryByCategId(categId) {
        const q = `SELECT * FROM sub_category WHERE category_id=$1;`;
        return await postgresQueryHelper(q, "Internal server error, failed to retrieve sub category by categoryId, subCategoryModel.js file", [categId]);
    }
}