import { postgresQueryHelper } from "../../utils/postgresHelperFunctions";

export default class VariantsImageModel {
    constructor() { }

    // the function which creates the variant images
    async createVariantImage(imageData) {
        const q = `INSERT INTO variant_images(variant_id, image_url, location) VALUES($1, $2, $3) RETURNING *;`;
        return await postgresQueryHelper(q, "Internal server error, failed to create variant image in the database, variantImagesModel.js", imageData);
    }
}