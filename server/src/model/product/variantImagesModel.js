import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";
import QueryCreator from "../../utils/queryCreator.js";

export default class VariantsImageModel {
    constructor() {
        this.queryCreator = new QueryCreator();
    }

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

    // the function which updates the variant image
    async updateImageByVariantId(variantId, data) {
        const keys = Object.keys(data);
        if (!keys.length) throw new Error("No fields to update.");

        const setters = keys.map((key, index) => `${key} = $${index + 3}`).join(',');
        const values = [variantId, ...Object.values(data)]

        const q = this.queryCreator.buildUpdatorQuery({
            table: "variant_images",
            setters,
            where: "WHERE variant_id=$1 AND id=$2 RETURNING *"
        });

        return await postgresQueryHelper(q, "Internal server error, failed to update the variant image, variantImages.js file", values);
    }
}