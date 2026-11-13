import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";

// the class which controlls the category table
export default class CollectionModel {
    constructor() { }

    // the function which creates the collection in database
    async createCollection(collectionData) {
        console.log(collectionData);
        const q = `INSERT INTO collection(name, season, creator, image) VALUES($1, $2, $3, $4) RETURNING *;`;
        return await postgresQueryHelper(q, "Internal server error, failed to create collection, collectionModel.js file", collectionData);
    }

    // the function which retrieve the collection in the database
    async retrieveCollectionById(collectionId) {
        const q = `SELECT * FROM collection WHERE id=$1;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve collection by ID, collectionModel.js file", [collectionId]);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] };
    }
}