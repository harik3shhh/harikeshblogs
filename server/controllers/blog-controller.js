const  slugify  = require("slugify");
const blogModel = require("../models/blog-model");
const fs = require("fs");
const categoryModel = require("../models/category-model");


const createBlogController = async(req, res) => {
    try {
        // const name = req.body;
        const { title,caption, description, category , author, publishDate } = req.fields;
        const { photo } = req.files;

        // console.log(`Harikesh: ${name}`);

        //validation
        switch(true){
            case !title:
                return res.status(500).send({error: "Name is required"});
                
            case !caption:
                return res.status(500).send({error: "Caption is required"});

            case !description:
                return res.status(500).send({error: "Description is required"});

            case !author:
                return res.status(500).send({error: "Category is required"});

            case !publishDate:
                return res.status(500).send({error: "Category is required"});
                

            case !photo && (!photo ||photo.size > 10000):
                return res.status(500).send({error: "Photo is required and should be less than 1 mb"});
        }

        const blogs = new blogModel({...req.fields, slug: slugify(title)});
        if(photo){
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
            message: "Error in creating product"
        });
    }
};

const getProductController = async(req, res) => {
    try {
        const products = await blogModel.find({}).populate("category").select("-photo").limit(12).sort({createdAt: -1});
        res.status(200).send({
            success: true,
            totalCount: products.length,
            message: "All Products",
            products
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

const getSingleProduct = async(req, res) => {
    try {
        const product = await blogModel.findOne({slug: req.params.slug}).select("-photo").populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product
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

const productPhotoController = async(req, res) => {
    try {
        const product = await blogModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set("Content-type", product.photo.contentType)
            return res.status(200).send(product.photo.data);
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


//DELETE PRODUCT
const deleteProductController = async(req, res) =>{
    try {
        await blogModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product deleted Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error
        });
    }
};

//UPDATE PRODUCT 
const updateProductController = async(req, res) => {
    try {
        // const name = req.body;
        const { name, description, price, category, quantity } = req.fields;
        const { photo } = req.files;

        // console.log(`Harikesh: ${name}`);

        //validation
        switch(true){
            case !name:
                return res.status(500).send({error: "Name is required"});

                case !description:
                return res.status(500).send({error: "Description is required"});

                case !price:
                return res.status(500).send({error: "Price is required"});

                case !category:
                return res.status(500).send({error: "Category is required"});

                case !quantity:
                return res.status(500).send({error: "Quantity is required"});

                case !photo && (!photo || photo.size > 100000):
                return res.status(500).send({error: "Photo is required and should be less than 1 mb"});
        }

        const products = await blogModel.findByIdAndUpdate(req.params.pid, {...req.fields, slug: slugify(name)}, {new: true});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Updating product"
        });
    }
};

// FITERS
const productFilterController = async(req, res) =>{
    try {
        const {checked, radio} = req.body;
        let args = {}
        if(checked.length > 0) args.category = checked
        if(radio.length) args.price = {$gte: radio[0], $lte:radio[1]};
        const products = await blogModel.find(args)
        res.status(200).send({
            success: true,
            products,
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

const productCountController = async(req, res) =>{
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
            message: "Error in Count product",
            error
        });
    }
}

// product list based  on page
const productListController = async(req, res)=>{
    try {
        const perPage = 8;
        const page = req.params.page ? req.params.page: 1
        const products = await blogModel.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createdAt: -1})

        res.status(200).send({
            success: true,
            products,
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

// SEARCH PRODUCT CONTROLLER
const searchProductController = async(req, res) => {
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

// SIMILAR PRODUCTS
const relatedProductController = async(req, res) =>{
    try {
        const {pid, cid} = req.params;
        const products = await blogModel.find({
            category: cid,
            _id:{ $ne: pid }
        }).select("-photo").limit(8).populate("category");

        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in related product",
            error
        });
    }
};

//GET PRODUCT BY CATEGORY
const productCategoryController = async(req, res) => {
    try {
        const category = await categoryModel.findOne({slug: req.params.slug});
        const products = await blogModel.find({category}).populate("category");
        res.status(200).send({
            success: true,
            category,
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting product",
            error
        });
    }
};


module.exports = {createBlogController, getProductController, getSingleProduct, productPhotoController, deleteProductController, updateProductController, productFilterController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController};