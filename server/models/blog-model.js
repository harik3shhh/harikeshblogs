const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    // blog_id: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    title: {
        type: String,
        required: true,
    },
    banner: {
        type: String, // URL for the blog's banner image
        // Uncomment if it's required for all blogs
        // required: true,
    },
    des: {
        type: String,
        maxlength: 200, // Description limited to 200 characters
        // required: true
    },
    content: {
        type: [String], // Assuming the content is an array of strings (paragraphs or sections)
        // If content is structured differently, adjust the type accordingly (e.g., an array of objects)
        // required: true,
    },
    tags: {
        type: [String], // Array of tags for categorizing the blog
        // required: true
    },
    activity: {
        total_reads: {
            type: Number,
            default: 0, // Initializes the total reads at zero
        },
        // You can add more fields to track additional activities like shares, comments, etc.
    },
}, {
    timestamps: true, // Adds `createdAt` and `updatedAt` timestamps automatically
});

module.exports = mongoose.model("Blog", blogSchema); // Capitalize 'Blog' for model name consistency
