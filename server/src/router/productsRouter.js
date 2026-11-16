import express from 'express';
import {
    assignProductToCollectionController,
    createProductBrandController,
    createProductCategoryController,
    createProductCollectionController,
    createProductController,
    createProductReviewController,
    createProductSubCategoryController,
    createProductSupplierController,
    createProductVariantsController,
    createSpecificationController,
    createVariantImagesController,
    createVariantSpecificationController,
    retrieveProductBrandsController,
    retrieveProductByIdController,
    retrieveProductByOffsetController,
    retrieveProductCategoryController,
    retrieveProductCollectionsController,
    retrieveProductReviewsController,
    retrieveProductSubCategoryByCategIdController,
    retrieveProductSuppliersController,
    retrieveVariantByIdController,
    updateProductByIdContoller,
    updateProductVariantController,
    updateVariantImagesController,
    updateVariantSpecificationController
} from '../controller/productController.js';

const ProductsRouter = express.Router()

// product
ProductsRouter.post('/p', createProductController);
ProductsRouter.get('/p/:prodId', retrieveProductByIdController);
ProductsRouter.put('/p/:prodId', updateProductByIdContoller);
ProductsRouter.get('/all/:offset', retrieveProductByOffsetController);

// variants
ProductsRouter.post('/variant/:prodId', createProductVariantsController);
ProductsRouter.put('/variant/:prodId/:variantId', updateProductVariantController);
ProductsRouter.post('/variant/:variantId/images', createVariantImagesController);
ProductsRouter.put('/variant/:variantId/images', updateVariantImagesController);
ProductsRouter.post('/variant/:variantId/specification', createVariantSpecificationController);
ProductsRouter.put('/variant/:variantId/specification', updateVariantSpecificationController);

ProductsRouter.get('/variant/:variantId', retrieveVariantByIdController);

// category
ProductsRouter.post('/category', createProductCategoryController);
ProductsRouter.get('/category', retrieveProductCategoryController);
ProductsRouter.post('/subCategory/:categId', createProductSubCategoryController);
ProductsRouter.get('/subCategory/:categId', retrieveProductSubCategoryByCategIdController);

// specification
ProductsRouter.post('/specification', createSpecificationController);

// brand
ProductsRouter.post('/brand', createProductBrandController);
ProductsRouter.get('/brand', retrieveProductBrandsController);

// collection
ProductsRouter.post('/collection', createProductCollectionController);
ProductsRouter.get('/collection', retrieveProductCollectionsController);
ProductsRouter.post('/assignCollection', assignProductToCollectionController);

// supplier
ProductsRouter.post('/supplier', createProductSupplierController);
ProductsRouter.get('/supplier', retrieveProductSuppliersController);

// review
ProductsRouter.post('/review', createProductReviewController);
ProductsRouter.get('/review', retrieveProductReviewsController);

export default ProductsRouter;