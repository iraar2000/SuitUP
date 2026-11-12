import { assignProductToCollectionService, createProductBrandService, createProductCategoryService, createProductCollectionService, createProductService, createProductSubCategoryService, createProductSupplierService } from "../service/product/productsService.js";
import { createReviewService } from "../service/product/reviewService.js";
import { createSpecificationService, createVariantImagesService, createVariantService, createVariantSpecificationService } from "../service/product/variantsService.js";

// the function which controlls the creation of the product
export async function createProductController(req, res) {
    try {
        const response = await createProductService(req.body);
        console.log(response)
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.log(error);
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
        const response = await createVariantSpecificationService(req.params.variantId, req.body);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create variant specifications, productController.js file", errorDetails: error });
    }
}

// the function which creates the specifications
export async function createSpecificationController(req, res) {
    try {
        const response = await createSpecificationService(req.body);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create specifications in the database, productController.js file", errorDetails: error });
    }
}

// the function which creates the variant images
export async function createVariantImagesController(req, res) {
    try {
        const response = await createVariantImagesService(req.body.images);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create variant images, productController.js file", errorDetails: error });
    }
}

// the function which creates the product category
export async function createProductCategoryController(req, res) {
    try {
        const response = await createProductCategoryService(req.body);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create category in the database, productController.js file", errorDetails: error });
    }
}

// the function which creates the product category subCategory
export async function createProductSubCategoryController(req, res) {
    try {
        const response = await createProductSubCategoryService(req.body);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create product subCategory, productController.js file", errorDetails: error });
    }
}

// the function which creates the product brand
export async function createProductBrandController(req, res) {
    try {
        const response = await createProductBrandService(req.body);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create brand, productController.js file", errorDetails: error });
    }
}

// the function which creates the product collection
export async function createProductCollectionController(req, res) {
    try {
        const response = await createProductCollectionService(req.body);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create product collection, productController.js file", errorDetails: error });
    }
}

// the function which assigns the product to a collection
export async function assignProductToCollectionController(req, res) {
    try {
        const response = await assignProductToCollectionService(req.body.productId, req.body.collectionId);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to assign a product to a collection, productController.js file", errorDetails: error })
    }
}

// the function which creates the product supplier
export async function createProductSupplierController(req, res) {
    try {
        const response = await createProductSupplierService(req.body);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create product supplier, productController.js file", errorDetails: error })
    }
}

// the function which creates the product review
export async function createProductReviewController(req, res) {
    try {
        const response = await createReviewService(req.body);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error, failed to create product review, productController.js file" })
    }
}

