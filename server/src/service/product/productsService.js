import BrandModel from "../../model/product/brandModel.js";
import CategoryModel from "../../model/product/categoryModel.js";
import CollectionModel from "../../model/product/collectionModel.js";
import ProductCollectionModel from "../../model/product/productCollectionModel.js";
import ProductModel from "../../model/product/productsModel.js"
import subCategoryModel from "../../model/product/subCategoryModel.js";
import SupplierModel from "../../model/product/suppliersModel.js";
import { createVariantService } from "./variantsService.js";

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
            const varResp = await createVariantService({ productId: productResp.data.id, ...variants[i] });
            if (varResp.status !== 200) return varResp;
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