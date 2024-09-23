const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/auth-middleware");
const { 
    createBlogController, 
    getBlogController, 
    getSingleBlogController, 
    // blogPhotoController, 
    deleteBlogController, 
    updateBlogController, 
    // blogFilterController, 
    searchBlogController, 
    relatedBlogController, 
    blogCategoryController 
} = require("../controllers/blog-controller");
const formidable = require("express-formidable");

const router = express.Router();

// Route to create a blog (admin only)
router.route("/create-blog").post(requireSignIn, isAdmin, formidable(), createBlogController);

// Route to get all blogs
router.route("/get-blog").get(getBlogController);

// Route to get a single blog by slug
router.route("/get-blog/:slug").get(getSingleBlogController);

// Route to get the blog photo
// router.route("/blog-photo/:bid").get(blogPhotoController);

// Route to delete a blog by id (admin only)
router.route("/delete-blog/:bid").delete(requireSignIn, isAdmin, deleteBlogController);

// Route to update a blog by id (admin only)
router.route("/update-blog/:bid").put(requireSignIn, isAdmin, formidable(), updateBlogController);

// Route to filter blogs
// router.route("/blog-filters").post(blogFilterController);

// Route to search blogs
router.route("/search/:keyword").get(searchBlogController);

// Route to get related blogs
router.route("/related-blog/:bid/:cid").get(relatedBlogController);

// Route to get blogs by category
router.route("/blog-category/:slug").get(blogCategoryController);

module.exports = router;
