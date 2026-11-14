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
    retrieveProductSubCategoryByCategIdController,
    retrieveProductSuppliersController,
    retrieveVariantByIdController
} from '../controller/productController.js';

const ProductsRouter = express.Router()

// product
ProductsRouter.post('/create', createProductController);
ProductsRouter.get('/retrieve/:offset', retrieveProductByOffsetController);
ProductsRouter.get('/retrieveByProductId/:prodId', retrieveProductByIdController);

// variants
ProductsRouter.post('/variant/create/:prodId', createProductVariantsController);
ProductsRouter.post('/variant/images/create/:variantId', createVariantImagesController);
ProductsRouter.post('/variant/specification/create/:variantId', createVariantSpecificationController);
ProductsRouter.get('/variant/retrieve/:variantId', retrieveVariantByIdController);

// category
ProductsRouter.post('/category/create', createProductCategoryController);
ProductsRouter.post('/category/sub/create', createProductSubCategoryController);
ProductsRouter.get('/category/retrieve', retrieveProductCategoryController);
ProductsRouter.get('/category/retrieveSubCateg/:categId', retrieveProductSubCategoryByCategIdController);

// specification
ProductsRouter.post('/specification/create', createSpecificationController);

// brand
ProductsRouter.post('/brand/create', createProductBrandController);
ProductsRouter.get('/brand/retrieve', retrieveProductBrandsController);

// collection
ProductsRouter.post('/collection/create', createProductCollectionController);
ProductsRouter.post('/collection/assign', assignProductToCollectionController)
ProductsRouter.get('/collection/retrieve', retrieveProductCollectionsController);

// supplier
ProductsRouter.post('/supplier/create', createProductSupplierController);
ProductsRouter.get('/supplier/retrieve', retrieveProductSuppliersController);

// review
ProductsRouter.post('/review/create', createProductReviewController);

export default ProductsRouter;