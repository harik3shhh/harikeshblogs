
const express = require("express");
const {requireSignIn, isAdmin} = require("../middlewares/auth-middleware")
const {createBlogController, getProductController, getSingleProduct, productPhotoController, deleteProductController, updateProductController, productFilterController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController} = require("../controllers/blog-controller");
const formidable = require("express-formidable");

const router = express.Router();

router.route("/create-blog", requireSignIn, isAdmin, formidable()).post(createBlogController);

router.route("/get-place").get(getProductController);

router.route("/get-place/:slug").get(getSingleProduct);

router.route("/place-photo/:pid").get(productPhotoController);


//delete product
router.delete("/delete-place/:pid", deleteProductController)

//update
router.route("/update-place/:pid", requireSignIn, isAdmin, formidable()).put(updateProductController);

// FILTER PRODUCT
router.post("/place-filters", productFilterController);

// PRODUCT COUNT
router.get("/place-count", productCountController);

// product per page
router.get("/place-list/:page", productListController);

// search product 
router.get("/search/:keyword", searchProductController);

// similar products
router.get("/related-place/:pid/:cid", relatedProductController);

// CATEGORY WISE PRODUCT 
router.get("/place-category/:slug", productCategoryController);

module.exports = router;
