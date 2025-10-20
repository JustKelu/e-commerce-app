const myReviewsService = require('../../services/customer/myReviewsService');

const getReviews = async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await myReviewsService.getReviews(productId);

        res.json(reviews);
    } catch (err) {
        next(err);
    }
}

const newReview = async (req, res) => {
    const productId = req.params.productId;
    const reviewData = {
        userId: req.body.userId,
        title: req.body.titleReview,
        body: req.body.bodyReview,
        grading: req.body.gradingReview,
    }
    const review = await myReviewsService.newReview(productId, reviewData);

    res.json(review);
}

module.exports = {
    getReviews,
    newReview
}