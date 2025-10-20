const myReviewsRepo = require('../../repositories/customer/myReviewsRepo');

const myReviewsService = () => {
    const getReviews = async (productId) => {
        try {
            const reviews = await myReviewsRepo.getReviews(productId);

            return reviews;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    const newReview = async (productId, reviewData) => {
        try {
            const review = await myReviewsRepo.newReview(productId, reviewData);
            
            return review;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    return {
        getReviews,
        newReview
    }
}

module.exports = myReviewsService();