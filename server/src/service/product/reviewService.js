import ReviewModel from "../../model/product/reviewsModel.js";

const reviewModel = new ReviewModel();

// the function which creates the review
export async function createReviewService(reviewData) {
    try {
        return await reviewModel.createReview(reviewData);
    } catch (error) {
        return { status: 500, data: { error: "Internal server error, failed to create the review, reviewService.js file", errorDetails: error } };
    }
}