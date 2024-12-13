const reviewService = require('./reviewService');

exports.getReviewByProduct = async (req, res) => {
    const ProductID = req.params.productid
    try {
        const review = await reviewService.getReviewByProducts(ProductID);
        const message = {
            "success" : true,
            "message" : "Lấy dữ liệu của tất cả bình luận trong sản phẩm thành công",
            "data" : review
        }
        res.status(200).json(message);
    } catch (err) {
        const message = {
            "success" : false,
            "message" : "Lấy dữ liệu của tất cả bình luận không thành công",
            "data" : null
        }
        res.status(500).json(message);
    }
};

exports.addReviewInProduct = async (req, res) => {
    const data = req.body.data;
    try {
        const reviewID = await reviewService.addReviewInProduct(data);
        data.reviewID = reviewID;
        const message = {
            "success" : true,
            "message" : "Thêm bình luận thành công!",
            "data" : data
        }
        res.status(201).json(message);
    } catch (err) {
        const message = {
            "success" : false,
            "message" : "Lỗi khi thêm bình luận vào hệ thống!",
            "data" :  null
        }
        res.status(500).json(message);
    }
};
exports.updateReviewContent = async (req, res) => {
    const ReviewID = req.params.reviewid;
    const updateData = req.body.data;
    try {
        const updateReview = await reviewService.updateReviewContent(ReviewID, updateData);
        if(!updateReview) {
            const message = {
                "success" : false,
                "message" : "Lỗi không tìm thấy bình luận trong hệ thống!",
                "data" : null
            }
            return res.status(404).json(message);
        }
        const message = {
            "success" : true,
            "message" : "Cập nhật bình luận thành công!",
            "data" : updateData
        }
        res.status(200).json(message);
    } catch (err) {
        const message = {
            "success" : false,
            "message" : "Lỗi lấy dữ liệu từ hệ thống không thành công!",
            "data" : null
        }
        res.status(500).json(message);
    }
}
exports.deleteReview = async (req, res) => {
    const reviewID = req.params.reviewid;
    try {
        const deleteReview = await reviewService.deleteReview(reviewID);
        if(!deleteReview) {
            const message = {
                "success" : false,
                "message" : "Lỗi không tìm thấy bình luận trong hệ thống!",
                "data" : null
            }
            res.status(404).json(message);
        }
        const message = {
            "success" : true,
            "message" : "Xóa bình luận thành công!",
            "data" : null
        }
        res.status(200).json(message);
    } catch (err) {
        const message = {
            "success" : false,
            "message" : "Lỗi xóa bình luận không thành công!",
            "data" : null
        }
        res.status(500).json(message);
    }
};

