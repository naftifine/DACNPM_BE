const reviewModel = require('./reviewModel');


exports.getReviewByProduct = async (ProductID) => {
    return await reviewModel.getReviewByProduct(ProductID);
};
exports.addReviewInProduct = async (data) => {
    return await reviewModel.addReviewInProduct(data);
};
exports.updateReview = async (reviewID, data) => {
    if(!reviewModel.checkReviewExists(reviewID)) {return null;}
    return await reviewModel.updateReview(reviewID, data);
} 
exports.deleteReview = async (reviewID) => {
    if(!reviewModel.checkReviewExists(reviewID)) {return null;}
    return await reviewModel.deleteReview(reviewID);
};

