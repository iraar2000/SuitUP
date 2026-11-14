import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";

export default class VariantsImageModel {
    constructor() { }

    // the function which creates the variant images
    async createVariantImage(variantId, imageData) {
        const q = `INSERT INTO variant_images(variant_id, image_url, location) VALUES($1, $2, $3) RETURNING *;`;
        return await postgresQueryHelper(q, "Internal server error, failed to create variant image in the database, variantImagesModel.js", [variantId, ...imageData]);
    }

    // the function which retrieve the variant images by varianrId
    async retrieveImagesByVariantId(variantId) {
        const q = `SELECT image_url, location FROM variant_images WHERE variant_id=$1;`;
        return await postgresQueryHelper(q, "Internal server error, failed to retrieve the variant images, variantImagesModel.js file", [variantId]);
    }
}