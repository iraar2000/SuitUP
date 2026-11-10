import ProductModel from "../../model/product/productsModel"
import { createVariantService } from "./variantsService";

const productModel = new ProductModel();

// the service function which creates the product
export async function createProductService(productData) {
    try {
        // remove variants from the product data
        const variants = productData.variants
        delete productData.variants;

        // creating the products
        const productResp = await productModel.createProduct(productData);

        // creating the variants of the product
        for (let i = 0; i < variants.length; i++) {
            await createVariantService([productResp.data.id, variants[i]]);
        }

    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create product, productService.js file", errorDetails: error } }
    }
}