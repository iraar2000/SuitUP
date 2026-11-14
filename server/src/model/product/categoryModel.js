import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";

// the class which controlls the category table
export default class CategoryModel {
    constructor() { }

    // the function which creates the category in database
    async createCategory(categData) {
        const q = `INSERT INTO category(name, description) VALUES($1, $2) RETURNING *;`;
        return await postgresQueryHelper(q, "Internal server error, failed to create category, categoryModel.js file", categData);
    }

    // the function which retrieve all categories in the database
    async retrieveAllCategory() {
        const q = `SELECT id, name, description FROM category;`
        return await postgresQueryHelper(q, "Internal server error, failed to retrieve all category from the database, categoryModel.js file");
    }

    // the function which retrieves the category by id
    async retrieveCategoryById(categId) {
        const q = `SELECT id, name, description FROM category WHERE id=$1;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve category by id, categoryModel.js file", [categId]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] }
    }
}