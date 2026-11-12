import express from 'express';
import { assignProductToCollectionController, createProductBrandController, createProductCategoryController, createProductCollectionController, createProductController, createProductReviewController, createProductSubCategoryController, createProductSupplierController, createProductVariantsController, createSpecificationController, createVariantImagesController, createVariantSpecificationController } from '../controller/productController.js';

const ProductsRouter = express.Router()

// product
ProductsRouter.post('/create', createProductController);

// variants
ProductsRouter.post('/variant/create', createProductVariantsController);
ProductsRouter.post('/variant/images/create', createVariantImagesController);
ProductsRouter.post('/variant/specification/create', createVariantSpecificationController);

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