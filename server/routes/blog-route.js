const express = require("express");
const {requireSignIn, isAdmin} = require("../middlewares/auth-middleware")
const {createBlogController, getBlogController, getSingleBlog, blogPhotoController, deleteBlogController, updateBlogController, blogFilterController, blogCountController, blogListController, searchBlogController, relatedBlogController, blogCategoryController, getSavedBlogsController, saveBlogController, createBannerController, createYoutubeVlogController, getYoutubeVlogController, youtubePhotoController, deleteBannerController, getBannerController, bannerPhotoController} = require("../controllers/blog-controller");
const formidable = require("express-formidable");

const router = express.Router();

router.route("/create-blog", requireSignIn, isAdmin, formidable()).post(createBlogController);

router.route("/get-blog").get(getBlogController);

router.route("/get-blog/:slug").get(getSingleBlog);

router.route("/blog-photo/:pid").get(blogPhotoController);


//delete blog
router.delete("/delete-blog/:pid", deleteBlogController)

//update
router.route("/update-blog/:pid", requireSignIn, isAdmin, formidable()).put(updateBlogController);

// FILTER blog
router.post("/blog-filters", blogFilterController);

// BLOG COUNT
router.get("/blog-count", blogCountController);

// blog per page
router.get("/blog-list/:page", blogListController);

// search blog 
router.get("/search/:keyword", searchBlogController);

// similar blog
router.get("/related-blog/:pid/:cid", relatedBlogController);

// CATEGORY WISE BLOG 
router.get("/blog-category/:slug", blogCategoryController);

// Save or unsave a blog
router.post("/save/:blogId", requireSignIn, saveBlogController);

// Get all saved blogs
router.get("/saved-blogs", requireSignIn, getSavedBlogsController);


//o route for banner......
router.route("/create-banner", requireSignIn, isAdmin, formidable()).post( createBannerController);
router.delete("/delete-banner/:pid", deleteBannerController);
router.route("/get-banner").get(getBannerController);
router.route("/banner-photo/:pid").get(bannerPhotoController);




//! route for youtube
router.route("/create-yt-vlog", requireSignIn, formidable()).post(createYoutubeVlogController);
router.route("/get-yt-vlog").get(getYoutubeVlogController);
router.route("/vlog-photo/:pid").get(youtubePhotoController);



module.exports = router;
