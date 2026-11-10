import SpecificationModel from "../../model/product/specificationModel";
import VariantsImageModel from "../../model/product/variantImagesModel";
import variantsModel from "../../model/product/variantsModel";
import VariantSpecificationModel from "../../model/product/variantSpecificationModel";

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
        const variantResp = await variantModel.createVariant(variantData);

        // create the variant images
        for (let i = 0; i < variantImages.length; i++) {
            await createVariantImagesService([variantResp.data.id, variantImages[i], ''])
        }

        // creating the variant specification
        await createVariantSpecificationService([variantResp.data.id, spec.data.id, Object.values(specifications)[i]])
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create variant in database, variantsService.js file", errorDetails: error } };
    }
}

// the function which creats the variant images
export async function createVariantImagesService(variantImageData) {
    try {
        return await variantImageModel.createVariantImage(variantImageData)
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create variant image, variantsService.js file", errorDetails: error } };
    }
}

// the function which creates the specifications
export async function createSpecificationService(specificationData) {
    try {
        return await specificationModel.createSpecification(specificationData);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create specifications, variantService.js file", errorDetails: error } }
    }
}

// the function which creates the variant specification
export async function createVariantSpecificationService(variantId, specificationData) {
    try {
        for (let i = 0; i < Object.keys(specificationData).length; i++) {
            // console.log(Object.keys(specifications)[i], Object.values(specifications)[i])
            const spec = await specificationModel.retrieveSpecificationByName(Object.keys(specificationData)[i])
            await variantSpecificationModel.createVariantSpecification([variantId, spec.data.id, Object.values(specificationData)[i]])
        }
        return { status: 200, data: { message: "Created variant specification successfully!" } };
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create variant specification, variantService.js file", errorDetails: error } };
    }
}