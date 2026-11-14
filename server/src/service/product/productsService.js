import { response } from "express";
import BrandModel from "../../model/product/brandModel.js";
import CategoryModel from "../../model/product/categoryModel.js";
import CollectionModel from "../../model/product/collectionModel.js";
import ProductCollectionModel from "../../model/product/productCollectionModel.js";
import ProductModel from "../../model/product/productsModel.js"
import subCategoryModel from "../../model/product/subCategoryModel.js";
import SupplierModel from "../../model/product/suppliersModel.js";
import variantsModel from "../../model/product/variantsModel.js";
import { createVariantService, retrieveVariantByProductIdService } from "./variantsService.js";
import ReviewModel from "../../model/product/reviewsModel.js";
import { retrieveReviewByProductIdService } from "./reviewService.js";

// service objects
const productModel = new ProductModel();
const categModel = new CategoryModel();
const subCategModel = new subCategoryModel();
const brandModel = new BrandModel();
const collectionModel = new CollectionModel();
const prodCollModel = new ProductCollectionModel();
const supplierModel = new SupplierModel();

// the service function which creates the product
export async function createProductService(productData) {
    try {
        // remove variants from the product data
        const variants = productData.variants
        delete productData.variants;

        // creating the products
        const productResp = await productModel.createProduct(Object.values(productData));
        if (productResp.status !== 200) return productResp;

        // creating the variants of the product
        for (let i = 0; i < variants.length; i++) {
            console.log(variants[i]);
            const varResp = await createVariantService({ productId: productResp.data.id, ...variants[i] });
            if (varResp.status !== 201) return varResp;
        }

        return { status: 200, data: "Created product successfully!" };

    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create product, productService.js file", errorDetails: error } }
    }
}

// the service function which creates the product category
export async function createProductCategoryService(categoryData) {
    try {
        return await categModel.createCategory(Object.values(categoryData));
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create the product category, productService.js file", errorDetails: error } };
    }
}

// the service function which creates the product subCategory
export async function createProductSubCategoryService(subCategoryData) {
    try {
        // see if the category exists
        const categ = await categModel.retrieveCategoryById(subCategoryData.categId);
        if (categ.status !== 200 || !categ.data) return { status: 404, data: { message: `Category not found with id: ${subCategoryData.categId}` } };

        // creating a subcategory if the category exists 
        return await subCategModel.createSubCategory(Object.values(subCategoryData));
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create the product sub category, productService.js file", errorDetails: error } };
    }
}

// the service function which creates the product brand
export async function createProductBrandService(brandData) {
    try {
        return await brandModel.createBrand(Object.values(brandData));
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create the product brnad, productService.js file", errorDetails: error } };
    }
}

// the service function which creates product collections
export async function createProductCollectionService(collectionData) {
    try {
        return await collectionModel.createCollection(Object.values(collectionData));
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create the product collection, productService.js file", errorDetails: error } };
    }
}

// the service function which assigns product to a collections
export async function assignProductToCollectionService(productId, collectionId) {
    try {
        // see if the collection exist
        const collResp = await collectionModel.retrieveCollectionById(collectionId);
        if (collResp.status !== 200) return collResp

        //  see if the product collection exist
        const prodCollResp = await prodCollModel.retrieveProductCollectionByProdIdCollId([productId, collectionId]);
        if (prodCollResp.status === 200 && prodCollResp.data) return { status: 400, data: { message: "Product collection already exists!" } }

        return await prodCollModel.createProductCollection([productId, collectionId]);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to assign the collection to a product, productService.js file", errorDetails: error } };
    }
}

// the service function which creates product suppliers
export async function createProductSupplierService(supplierData) {
    try {
        return await supplierModel.createSupplier(Object.values(supplierData));
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create the supplier in the database, productService.js file", errorDetails: error } };
    }
}

// the service function which retrieves product by id
export async function retrieveProductByIdService(productId) {
    try {
        // retrieve the product by id
        const prodResp = await productModel.retrieveProductById(productId);
        if (prodResp.status !== 200) return prodResp;

        // retrieve the product variants
        const varResp = await retrieveVariantByProductIdService(productId);
        if (varResp.status !== 200) return varResp;

        // retrieve the product reviews
        const reviewResp = await retrieveReviewByProductIdService(productId);
        if (reviewResp.status !== 200) return reviewResp;

        return {
            status: 200,
            data: {
                product: prodResp.data,
                variants: varResp.data,
                reviews: reviewResp.data
            }
        };
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve product by Id, productsService.js file" } };
    }
}

// the service function which retrieves product by offset
export async function retrieveProductByOffsetService(condition = {}, offset) {
    try {
        // creating the offset based on thelimit
        const limit = 10;
        const ofNumber = limit * (offset - 1)

        // retrieve the product by id
        const prodResp = await productModel.retrieveProductByOffset(condition, limit, ofNumber);
        return prodResp;

    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve the product by offset, productService.js file", errorDetails: error } };
    }
}

// the service function which retrieves the category
export async function retrieveCategoryService() {
    try {
        return await categModel.retrieveAllCategory();
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve categories, productService.js file", errorDetails: error } }
    }
}

// the service function which retrieves the product subCategory
export async function retrieveSubCategoryByCategIdService(categId) {
    try {
        return await subCategModel.retrieveSubCategoryByCategId(categId);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve subcategory by categoryId, productService.js file", errorDetails: error } };
    }
}

// the service function which retrieve the product brand
export async function retrieveBrandsService() {
    try {
        return await brandModel.retrieveBrands();
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve brands, productService.js file", errorDetails: error } };
    }
}

// the service function which retrieves the product collections
export async function retrieveCollectionsService() {
    try {
        return await collectionModel.retrieveCollections();
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve the collections, productService.js file", errorDetails: error } };
    }
}

// the service function which retrieves the products suppliers
export async function retrieveSuppliersService() {
    try {
        return await supplierModel.retrieveSuppliers();
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to retrieve the suppliers, productService.js file", errorDetails: error } };
    }
}