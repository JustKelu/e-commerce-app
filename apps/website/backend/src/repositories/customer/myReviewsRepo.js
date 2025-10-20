const pool = require('../../utils/database');

const myReviewsRepo = async () => {
    const getReviews = async (productId) => {
        try {
            const query = `
            
            `;

            const result = await pool.query(query, productId);

            return result.rows;
        } catch (err) {
            console.log(err);
            throw err
        }
    }

    const newReview = async (productId, reviewData) => {
        try {
            const query = `
            
            `;

            const values = [
                productId,
                reviewData.userId,
                reviewData.title,
                reviewData.body,
                reviewData.grading,
            ];

            const result = await pool.query(query, values);

            return result ? "Recensione creata con successo" : "Errore nel creare la recensione";
        } catch (err) {
            console.log(err);
            throw err
        }
    }

    return {
        getReviews,
        newReview
    }
}

module.exports = myReviewsRepo();