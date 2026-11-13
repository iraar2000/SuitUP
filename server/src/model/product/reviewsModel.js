import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";

// the class which managers the review table
export default class ReviewModel {
    constructor() { }

    // the function which creates the review
    async createReview(reviewData) {
        console.log(reviewData);
        const q = `INSERT INTO reviews(product_id, user_id, title, verified_purchase, rating, review) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to create a review, reviewModel.js file", reviewData);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] };
    }

    // the function which retrieves the review using prodId
    async retrieveReviewByProdId(prodId) {
        const q = `SELECT * FROM reviews WHERE product_id=$1;`;
        return await postgresQueryHelper(q, "Internal server error, failed to retrieve review by product id, reviewsModel.js file", [prodId]);
    }

    // the function which retrieves the review using userId
    async retrieveReviewByUserId(userId) {
        const q = `SELECT * FROM reviews WHERE user_id=$1;`;
        return await postgresQueryHelper(q, "Internal server error, failed to retrieve review by user id, reviewsModel.js file", [userId]);
    }

    // the function which retrieves all reviews
    async retrieveReviews(limit = null, offset = 0) {
        let q = `SELECT * FROM reviews`;

        const values = [];

        if (limit !== null) {
            values.push(limit);
            q += ` LIMIT $${values.length}`;

            if (offset > 0) {
                values.push(offset);
                q += ` OFFSET $${values.length}`;
            }
        }

        q += ";";

        return await postgresQueryHelper(q, "Internal server error, failed to retrieve reviews, reviewModel.js file", values);
    }

    // the function which retrieve the reviews by id 
    async retrieveReviewById(reviewId) {
        const q = `SELECT * FROM reviews WHERE id = $1;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to retrieve review, reviewsModel.js file", [reviewId]);

        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] };
    }

    // the function which is used to delete the review by id
    async deleteReview(reviewId) {
        const q = `DELETE FROM reviews WHERE id = $1 RETURNING *;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to delete review, reviewsModel.js file", [reviewId]);

        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] };
    }

    // the function which is used to retrieve the product rating
    async retrieveProductRating(productId) {
        const q = `SELECT COUNT(*) AS total_reviews, ROUND(AVG(rating), 1) AS average_rating FROM reviews WHERE product_id = $1;`;
        return await postgresQueryHelper(q, "Internal server error, failed to retrieve product rating, reviewsModel.js file", [productId]);
    }


}