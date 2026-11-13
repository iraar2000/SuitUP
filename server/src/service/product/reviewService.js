import ProductModel from "../../model/product/productsModel.js";
import ReviewModel from "../../model/product/reviewsModel.js";
import UserModel from "../../model/user/userModel.js";

const reviewModel = new ReviewModel();
const productModel = new ProductModel();
const userModel = new UserModel()

// the function which creates the review
export async function createReviewService(reviewData) {
    try {
        // check if the product exists
        const prodResp = await productModel.retrieveProductById(reviewData.productId);
        if (prodResp.status !== 200) return prodResp;

        // check if the user exists
        const userResp = await userModel.retrieveUserById(reviewData.userId);
        if (userResp.status !== 200) return userResp;

        const response = await reviewModel.createReview(Object.values(reviewData));
        return response;
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create the review, reviewService.js file", errorDetails: error } };
    }
}