import SpecificationModel from "../../model/product/specificationModel.js";
import VariantsImageModel from "../../model/product/variantImagesModel.js";
import variantsModel from "../../model/product/variantsModel.js";
import VariantSpecificationModel from "../../model/product/variantSpecificationModel.js";

const variantModel = new variantsModel();
const variantSpecificationModel = new VariantSpecificationModel();
const variantImageModel = new VariantsImageModel();
const specificationModel = new SpecificationModel()

// the function which creates the variant
export async function createVariantService(variantData) {
    try {
        // remove the variant images
        const variantImages = variantData.images;
        delete variantData.images;

        // remove the variant specification
        const specifications = variantData.specifications;
        delete variantData.specifications;

        // create the variant
        const variantResp = await variantModel.createVariant(Object.values(variantData));
        if (variantResp.status !== 200) return variantResp;

        // create the variant images
        const viResp = await createVariantImagesService(variantResp.data.id, variantImages)
        if (viResp.status !== 201) return viResp;

        // creating the variant specification
        const varSpecResp = await createVariantSpecificationService(variantResp.data.id, specifications);
        if (varSpecResp.status !== 200) return varSpecResp;

        return { status: 201, data: { message: "Created variant successfully!" } }
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create variant in database, variantsService.js file", errorDetails: error } };
    }
}

// the function which creats the variant images
export async function createVariantImagesService(variantId, variantImageData) {
    try {
        // check if the variant exists
        const vResp = await variantModel.retrieveVariantById(variantId);
        if (vResp.status !== 200) return vResp;

        // create the images then
        for (let i = 0; i < variantImageData.length; i++) {
            await variantImageModel.createVariantImage(variantId, [variantImageData[i], ""]);
        }
        return { status: 201, data: { message: "Create the variant image successfully!" } }
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create variant image, variantsService.js file", errorDetails: error } };
    }
}

// the function which creates the specifications
export async function createSpecificationService(specificationData) {
    try {
        return await specificationModel.createSpecification([specificationData.name, specificationData.unit]);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create specifications, variantService.js file", errorDetails: error } }
    }
}

// the function which creates the variant specification
export async function createVariantSpecificationService(variantId, specificationData) {
    try {
        // check if the variant exists
        const vResp = await variantModel.retrieveVariantById(variantId);
        if (vResp.status !== 200) return vResp;

        // create variant specification
        for (let i = 0; i < Object.keys(specificationData).length; i++) {
            const spec = await specificationModel.retrieveSpecificationByName(Object.keys(specificationData)[i])
            await variantSpecificationModel.createVariantSpecification([variantId, spec.data.id, Object.values(specificationData)[i]])
        }
        return { status: 200, data: { message: "Created variant specification successfully!" } };
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create variant specification, variantService.js file", errorDetails: error } };
    }
}