const  slugify  = require("slugify");
const blogModel = require("../models/blog-model");
const fs = require("fs");
const categoryModel = require("../models/category-model");
const bannerModel = require("../models/banner-model");

const { transliterate } = require('transliteration'); // Import transliteration library
const youtubeModel = require("../models/youtube-model");

const createBlogController = async (req, res) => {
    try {
        const { title, caption, description, category, author, publishDate } = req.fields;
        const { photo } = req.files;

        // validation checks here...

        // Transliterate the title (Hindi to Latin) and then slugify
        const transliteratedTitle = transliterate(title); // Converts Hindi to Latin characters
        const slug = slugify(transliteratedTitle, { lower: true, strict: true });

        const blogs = await new blogModel({ ...req.fields, slug });

        if (photo) {
            blogs.photo.data = fs.readFileSync(photo.path);
            blogs.photo.contentType = photo.type;
        }

        await blogs.save();
        res.status(201).send({
            success: true,
            message: "Blog saved successfully",
            blogs,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating blog",
        });
    }
};



const getBlogController = async(req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("category").select("-photo").limit(12).sort({createdAt: -1});
        res.status(200).send({
            success: true,
            totalCount: blogs.length,
            message: "All blogs fetched",
            blogs
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error: error.message
        });
    }
};

const getSingleBlog = async(req, res) => {
    try {
        const blog = await blogModel.findOne({slug: req.params.slug}).select("-photo").populate("category");
        res.status(200).send({
            success: true,
            message: "Single blog Fetched",
            blog
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting Single products",
            error: error.message
        })
    }
};

const blogPhotoController = async(req, res) => {
    try {
        const blog = await blogModel.findById(req.params.pid).select("photo");
        if(blog.photo.data){
            res.set("Content-type", blog.photo.contentType)
            return res.status(200).send(blog.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error
        });
    }
};


//DELETE BLOG
const deleteBlogController = async(req, res) =>{
    try {
        await blogModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Blog deleted Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting blog",
            error
        });
    }
};

//UPDATE Blogs 
const updateBlogController = async(req, res) => {
    try {
        // const name = req.body;
        const { title,caption, description, category, author, publishDate } = req.fields;
        const { photo } = req.files;

        // console.log(`Harikesh: ${name}`);

        //validation
        switch(true){
            case !title:
                return res.status(500).send({error: "Title is required"});

            case !caption:
                return res.status(500).send({error: "Caption is required"});

                case !description:
                return res.status(500).send({error: "Description is required"});

                case !author:
                return res.status(500).send({error: "Author is required"});

                case !category:
                return res.status(500).send({error: "Category is required"});

                case !publishDate:
                return res.status(500).send({error: "Publish Date is required"});

                // case !photo && (!photo || photo.size > 100000):
                // return res.status(500).send({error: "Photo is required and should be less than 1 mb"});
        }

        const blogs = await blogModel.findByIdAndUpdate(req.params.pid, {...req.fields, slug: slugify(title)}, {new: true});
        if(photo){
            blogs.photo.data = fs.readFileSync(photo.path);
            blogs.photo.contentType = photo.type;
        }

        await blogs.save();
        res.status(201).send({
            success: true,
            message: "Blog Updated successfully",
            blogs,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Updating blog"
        });
    }
};

// FITERS
const blogFilterController = async(req, res) =>{
    try {
        const {checked, radio} = req.body;
        let args = {}
        if(checked.length > 0) args.category = checked
        if(radio.length) args.price = {$gte: radio[0], $lte:radio[1]};
        const blogs = await blogModel.find(args)
        res.status(200).send({
            success: true,
            blogs,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while filtering products",
            error
        })
    }
}

const blogCountController = async(req, res) =>{
    try {
        const total = await blogModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in Count Blog",
            error
        });
    }
}

// blog list based  on page
const blogListController = async(req, res)=>{
    try {
        const perPage = 4;
        const page = req.params.page ? req.params.page: 1
        const blogs = await blogModel.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createdAt: -1})

        res.status(200).send({
            success: true,
            blogs,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in gettin per page",
            error
        })
    }
}

// SEARCH blog CONTROLLER
const searchBlogController = async(req, res) => {
    try {
        const {keyword} = req.params;
        const results = await blogModel.find({
            $or:[
                {name:{$regex: keyword, $options: "i"}},
                {description:{$regex: keyword, $options: "i"}}
            ]
    }).select("-photo");
    res.json(results);

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in search controller",
            error
        });
    }
};

// SIMILAR BLOGS
const relatedBlogController = async(req, res) =>{
    try {
        const {pid, cid} = req.params;
        const blogs = await blogModel.find({
            category: cid,
            _id:{ $ne: pid }
        }).select("-photo").limit(8).populate("category");

        res.status(200).send({
            success: true,
            blogs,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in related blogs",
            error
        });
    }
};

//GET Blogs BY CATEGORY
const blogCategoryController = async(req, res) => {
    try {
        const category = await categoryModel.findOne({slug: req.params.slug});
        const blogs = await blogModel.find({category}).populate("category");
        res.status(200).send({
            success: true,
            category,
            blogs
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting blogs",
            error
        });
    }
};


// Save or Unsave blog for a user
const saveBlogController = async (req, res) => {
    try {
        const { blogId } = req.params;
        const user = await userModel.findById(req.user._id);

        // Check if the blog is already saved
        const isSaved = user.savedBlogs.includes(blogId);

        if (isSaved) {
            // Unsave the blog
            user.savedBlogs = user.savedBlogs.filter(id => id.toString() !== blogId);
            await user.save();
            return res.status(200).send({ success: true, message: "Blog unsaved" });
        } else {
            // Save the blog
            user.savedBlogs.push(blogId);
            await user.save();
            return res.status(200).send({ success: true, message: "Blog saved" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error saving the blog",
            error
        });
    }
};

// Get all saved blogs for a user
const getSavedBlogsController = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).populate("savedBlogs");
        res.status(200).send({
            success: true,
            savedBlogs: user.savedBlogs
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error fetching saved blogs",
            error
        });
    }
};


//O BANNER CONTROLLER
const createBannerController = async(req, res) =>{
    try {
        // const name = req.body;
        const { link} = req.fields;
        const { photo } = req.files;


        //validation
        switch(true){
            case !link:
                return res.status(500).send({error: "link is required"});

            case !photo && (!photo ||photo.size > 10000):
                return res.status(500).send({error: "Photo is required and should be less than 1 mb"});
        }

        const blogs = new bannerModel({...req.fields});
        if(photo){
            blogs.photo.data = fs.readFileSync(photo.path);
            blogs.photo.contentType = photo.type;
        }

        await blogs.save();
        res.status(201).send({
            success: true,
            message: "Banner saved successfully",
            blogs,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating Banner"
        });
    }
}


//o DELETE BANNER CONTROLLER
const deleteBannerController = async(req, res) =>{
    try {
        await bannerModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Banner deleted Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting banner",
            error
        });
    }
};

//O GET BANNER CONTROLLER
const getBannerController = async(req, res) =>{
    try {
        const banner = await bannerModel.find({})
        if(!banner){
            return res.status(404).send({
                success: false,
                message:"Cannot get banner"

            });

        }
        res.status(200).send({
            success: true,
            message: "fetched banner!",
            banner,
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Unable to get banner!",
            error,
        })
    }
};

const bannerPhotoController = async(req, res) => {
    try {
        const bannerPhoto = await bannerModel.findById(req.params.pid).select("photo");
        if(bannerPhoto.photo.data){
            res.set("Content-type", bannerPhoto.photo.contentType)
            return res.status(200).send(bannerPhoto.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error
        });
    }
};


//! YOUTUBE VLOG CONTROLLER
    const createYoutubeVlogController = async(req, res) =>{
        try {
            const {title, desc, link} = req.fields;
            const { photo } = req.files;


            //validation
            switch(true){
                case !title:
                    return res.status(500).send({error: "Youtube title is required"});

                case !link:
                    return res.status(500).send({error: "link is required"});

                case !desc:
                    return res.status(500).send({error: "Vlog Desc is required"});    

                case !photo && (!photo ||photo.size > 10000):
                    return res.status(500).send({error: "Photo is required and should be less than 1 mb"});
            }

            const blogs = new youtubeModel({...req.fields});
            if(photo){
                blogs.photo.data = fs.readFileSync(photo.path);
                blogs.photo.contentType = photo.type;
            }

            await blogs.save();
            res.status(201).send({
                success: true,
                message: "Youtube Vlog saved successfully",
                blogs,
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Something went wrong while create vlog",
                error,
            })
        }
    };


//! GET YOUTUBE VLOGS
const getYoutubeVlogController = async(req, res) =>{
    try {
        const vlog = await youtubeModel.find({}).select("-photo")
        if(!vlog){
            return res.status(404).send({
                success: false,
                message:"Cannot get vlog"

            });

        }
        res.status(200).send({
            success: true,
            message: "fetched vlogs!",
            vlog,
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Unable to get youtube vlog!",
            error,
        })
    }
};


const youtubePhotoController = async(req, res) => {
    try {
        const blog = await youtubeModel.findById(req.params.pid).select("photo");
        if(blog.photo.data){
            res.set("Content-type", blog.photo.contentType)
            return res.status(200).send(blog.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error
        });
    }
};


module.exports = {createBlogController, getBlogController, getSingleBlog, blogPhotoController, deleteBlogController, updateBlogController, blogFilterController, blogCountController, blogListController, searchBlogController, relatedBlogController, blogCategoryController, saveBlogController, getSavedBlogsController, createBannerController, createYoutubeVlogController, getYoutubeVlogController, youtubePhotoController, deleteBannerController, getBannerController, bannerPhotoController};