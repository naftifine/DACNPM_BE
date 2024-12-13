const express = require('express');
const reviewController = require('./reviewController');

const router = express.Router();

router.get('/getReviewByProduct/:productid', reviewController.getReviewByProduct);
router.post('/addReviewInProduct', reviewController.addReviewInProduct);
router.put('/updateReviewContent/:reviewid', reviewController.updateReview);
router.delete('/deleteReview/:reviewid', reviewController.deleteReview);

module.exports = router;
