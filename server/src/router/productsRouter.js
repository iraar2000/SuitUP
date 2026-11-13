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
    retrieveProductByIdController,
    retrieveProductByOffsetController,
    retrieveVariantByIdController
} from '../controller/productController.js';

const ProductsRouter = express.Router()

// product
ProductsRouter.post('/create', createProductController);
ProductsRouter.get('/retrieve/all/:offset', retrieveProductByOffsetController);
ProductsRouter.get('/retrieve/:prodId', retrieveProductByIdController);

// variants
ProductsRouter.post('/variant/create/:prodId', createProductVariantsController);
ProductsRouter.post('/variant/images/create/:variantId', createVariantImagesController);
ProductsRouter.post('/variant/specification/create/:variantId', createVariantSpecificationController);
ProductsRouter.get('/variant/retrieve/:variantId', retrieveVariantByIdController);

// category
ProductsRouter.post('/category/create', createProductCategoryController);
ProductsRouter.post('/category/sub/create', createProductSubCategoryController);

// specification
ProductsRouter.post('/specification/create', createSpecificationController);

// brand
ProductsRouter.post('/brand/create', createProductBrandController);

// collection
ProductsRouter.post('/collection/create', createProductCollectionController);
ProductsRouter.post('/collection/assign', assignProductToCollectionController)

// supplier
ProductsRouter.post('/supplier/create', createProductSupplierController);

// review
ProductsRouter.post('/review/create', createProductReviewController);

export default ProductsRouter;