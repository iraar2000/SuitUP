import { createProductService } from "../service/product/productsService";
import { createVariantService } from "../service/product/variantsService";

// the function which controlls the creation of the product
export async function createProductController(req, res) {
    try {
        const response = await createProductService(req.body);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create the product in the database, productController.js file", errorDetails: error });
    }
}

// the function which controlls the creation of the product variants
export async function createProductVariantsController(req, res) {
    try {
        const response = await createVariantService([req.params.prodId, ...Object.values(req.body)])
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create product variants, productController.js file", errorDetails: error });
    }
}

// the function which creates the variant specification
export async function createVariantSpecificationController(req, res) {
    try {

    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create variant specifications, productController.js file", errorDetails: error });
    }
}