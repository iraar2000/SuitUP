import { postgresQueryHelper } from "../../utils/postgresHelperFunctions.js";
import QueryCreator from "../../utils/queryCreator.js";

// the class which managers the review table
export default class ReviewModel {
    constructor() {
        this.queryCreator = new QueryCreator();
    }

    // the function which creates the review
    async createReview(reviewData) {
        const q = `INSERT INTO reviews(product_id, user_id, title, verified_purchase, rating, review) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`;
        const response = await postgresQueryHelper(q, "Internal server error, failed to create a review, reviewModel.js file", reviewData);
        if (response.status !== 200) return response;
        return { status: response.status, data: response.data[0] };
    }

    // the function which retrieves all reviews
    async retrieveReviews(conditions = {}, limit = null, offset = 0) {
        // the condition creator
        const condition = Object.keys(conditions).map((cond, index) => {
            if (cond === "userId") return `u.id=$${index + 3}`
            else if (cond === "prodId") return `r.product_id=$${index + 3}`
        })

        // the query creator
        const q = this.queryCreator.buildReviewRetrievalQuery({
            where: condition.length ? `WHERE ${condition.join(' AND ')}` : "",
            limit: `LIMIT $1`,
            offset: `OFFSET $2`
        });

        console.log(q, [limit, offset, ...Object.values(conditions)])

        return await postgresQueryHelper(q, "Internal server error, failed to retrieve reviews, reviewModel.js file", [limit, offset, ...Object.values(conditions)]);
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