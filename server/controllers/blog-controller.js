const slugify = require("slugify");
const blogModel = require("../models/blog-model"); 
const fs = require("fs");
const categoryModel = require("../models/category-model");

// Create Blog Controller
const createBlogController = async (req, res) => {
    try {
        const { title, des, category, content, tags } = req.fields;
        const { banner } = req.files;

        // Validation
        switch (true) {
            case !title:
                return res.status(500).send({ error: "Blog Title is required" });
            case !des:
                return res.status(500).send({ error: "Description is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !content || content.length === 0:
                return res.status(500).send({ error: "Blog content is required" });
            case !tags || tags.length === 0:
                return res.status(500).send({ error: "Tags are required" });
            case banner && banner.size > 1000000:
                return res.status(500).send({ error: "Banner image should be less than 1MB" });
        }

        const blog = new blogModel({
            ...req.fields,
            slug: slugify(title),
        });

        if (banner) {
            blog.banner = fs.readFileSync(banner.path);
        }

        await blog.save();
        res.status(201).send({
            success: true,
            message: "Blog created successfully",
            blog,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating blog",
        });
    }
};

// Get All Blogs Controller
const getBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("category").select("-banner").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalCount: blogs.length,
            message: "All Blogs Fetched",
            blogs,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting blogs",
            error: error.message,
        });
    }
};

// Get Single Blog Controller
const getSingleBlogController = async (req, res) => {
    try {
        const blog = await blogModel.findOne({ slug: req.params.slug }).select("-banner").populate("category");
        res.status(200).send({
            success: true,
            message: "Single Blog Fetched",
            blog,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting single blog",
            error: error.message,
        });
    }
};

// Get Blog Banner Controller
const blogBannerController = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.bid).select("banner");
        if (blog.banner) {
            res.set("Content-Type", blog.banner.contentType);
            return res.status(200).send(blog.banner.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting banner image",
            error,
        });
    }
};

// Delete Blog Controller
const deleteBlogController = async (req, res) => {
    try {
        await blogModel.findByIdAndDelete(req.params.bid).select("-banner");
        res.status(200).send({
            success: true,
            message: "Blog deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting blog",
            error,
        });
    }
};

// Update Blog Controller
const updateBlogController = async (req, res) => {
    try {
        const { title, des, category, content, tags } = req.fields;
        const { banner } = req.files;

        // Validation
        switch (true) {
            case !title:
                return res.status(500).send({ error: "Blog Title is required" });
            case !des:
                return res.status(500).send({ error: "Description is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !content || content.length === 0:
                return res.status(500).send({ error: "Blog content is required" });
            case !tags || tags.length === 0:
                return res.status(500).send({ error: "Tags are required" });
            case banner && banner.size > 1000000:
                return res.status(500).send({ error: "Banner image should be less than 1MB" });
        }

        const blog = await blogModel.findByIdAndUpdate(req.params.bid, { ...req.fields, slug: slugify(title) }, { new: true });
        if (banner) {
            blog.banner = fs.readFileSync(banner.path);
        }

        await blog.save();
        res.status(201).send({
            success: true,
            message: "Blog updated successfully",
            blog,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating blog",
        });
    }
};

// Search Blogs Controller
const searchBlogController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await blogModel.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { des: { $regex: keyword, $options: "i" } },
            ],
        }).select("-banner");
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in search controller",
            error,
        });
    }
};

// Related Blogs Controller
const relatedBlogController = async (req, res) => {
    try {
        const { bid, cid } = req.params;
        const blogs = await blogModel.find({
            category: cid,
            _id: { $ne: bid },
        }).select("-banner").limit(8).populate("category");

        res.status(200).send({
            success: true,
            blogs,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in related blogs",
            error,
        });
    }
};

// Get Blogs by Category Controller
const blogCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const blogs = await blogModel.find({ category }).populate("category");
        res.status(200).send({
            success: true,
            category,
            blogs,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting blogs",
            error,
        });
    }
};

module.exports = {
    createBlogController,
    getBlogController,
    getSingleBlogController,
    blogBannerController,
    deleteBlogController,
    updateBlogController,
    searchBlogController,
    relatedBlogController,
    blogCategoryController,
};
